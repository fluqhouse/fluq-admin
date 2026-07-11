// 📁 src/auth/AuthProvider.jsx
import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  clearAuth,
  refreshAccessToken,
  setAccessToken,
  getAccessToken,
} from "../services/api/axios";
import {
  getUserFromToken,
  isTokenExpired,
  getTokenExpirationTime,
} from "../utils/jwt";
import { loginApi, logoutApi } from "../services/api/auth";
import { AuthContext } from "../context/AuthContext";
import { hasRoleAccess } from "../utils/hasRoleAccess";
import { getDashboardRoute } from "../config/navigationConfig.jsx";
import toast from "react-hot-toast";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshTimerRef = useRef(null);

  const navigate = useNavigate();

  // Set up automatic token refresh
  const setupTokenRefresh = useCallback((token) => {
    // Clear any existing timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }

    if (!token) return;

    const timeUntilRefresh = getTokenExpirationTime(token) - 5 * 60; // Refresh 5 minutes before expiry

    if (timeUntilRefresh > 0) {
      const newTimer = setTimeout(async () => {
        try {
          console.log("Auto-refreshing token...");
          const tokenData = await refreshAccessToken();
          const userData = getUserFromToken(tokenData.accessToken);

          setUser((prev) => ({ ...prev, ...userData }));
          setupTokenRefresh(tokenData.accessToken); // Setup next refresh
        } catch (error) {
          console.error("Auto-refresh failed:", error);
          // Let the axios interceptor handle the logout
        }
      }, timeUntilRefresh * 1000);

      refreshTimerRef.current = newTimer;
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🔄 Initializing auth state...");

      // Check what's in sessionStorage at the start
      const initialSession = sessionStorage.getItem('userSession');
      const initialRole = sessionStorage.getItem('currentRole');
      console.log("🔍 Initial sessionStorage check:");
      console.log("   - userSession:", initialSession ? "Present" : "Missing");
      console.log("   - currentRole:", initialRole ? `"${initialRole}"` : "Missing");

      try {
        // Check if we have a token in memory first
        const existingToken = getAccessToken();
        console.log("🔑 Existing token in memory:", existingToken ? "Found" : "Not found");

        if (existingToken && !isTokenExpired(existingToken)) {
          console.log("✅ Using existing valid token");
          // Use existing valid token and restore session from sessionStorage
          const storedSession = sessionStorage.getItem('userSession');
          const storedUserData = storedSession ? JSON.parse(storedSession) : null;
          console.log("💾 Stored session data:", storedUserData ? "Found" : "Not found");

          if (storedUserData) {
            console.log("🔄 Restoring user from session storage");
            setUser(storedUserData);
          } else {
            // Fallback to token data if no stored session
            console.log("🔄 Fallback: Getting user from token");
            const userData = getUserFromToken(existingToken);
            setUser({
              ...userData,
              actualRole: userData.role,
            });
          }
          setIsAuthenticated(true);
          setError(null);
          setupTokenRefresh(existingToken);
        } else {
          // Skip refresh attempt if on auth pages (no session expected)
          const authPaths = ['/login', '/auth', '/', '/register'];
          const currentPath = window.location.pathname;

          if (authPaths.includes(currentPath)) {
            console.log("📍 On auth page with no token - skipping refresh");
            setLoading(false);
            return;
          }

          console.log("🔄 Token expired or not found, attempting refresh...");
          // Try to refresh from cookie
          const tokenData = await refreshAccessToken();
          console.log("✅ Refresh token successful");
          console.log("🔍 TokenData received:", tokenData);
          console.log("🔍 New access token:", tokenData.accessToken ? "Present" : "Missing");
          setAccessToken(tokenData.accessToken);

          // Try to restore full session context from sessionStorage
          const storedSession = sessionStorage.getItem('userSession');
          const storedRole = sessionStorage.getItem('currentRole');
          const storedUserData = storedSession ? JSON.parse(storedSession) : null;

          console.log("💾 Detailed sessionStorage check after refresh:");
          console.log("   - sessionStorage.userSession:", storedSession ? "EXISTS" : "NULL");
          console.log("   - sessionStorage.currentRole:", storedRole ? `"${storedRole}"` : "NULL");
          console.log("   - parsed userData:", storedUserData ? storedUserData : "NULL");

          // Check all sessionStorage keys for debugging
          console.log("🗂️ All sessionStorage keys:", Object.keys(sessionStorage));
          console.log("📊 SessionStorage length:", sessionStorage.length);

          if (storedUserData) {
            console.log("🔄 Merging stored session with fresh token data");
            // Update the stored session with fresh token data if needed
            const userData = getUserFromToken(tokenData.accessToken);
            console.log("🔍 Token decoded userData:", userData);

            let restoredUser;
            if (userData) {
              // Merge fresh token data with stored session
              restoredUser = {
                ...storedUserData,
                ...userData, // Merge any updated data from fresh token
                actualRole: userData.role,
                currentRole: storedUserData.currentRole, // Keep the chosen role
              };
            } else {
              // If token decode fails, just use stored session data
              console.log("⚠️ Token decode failed, using stored session only");
              restoredUser = storedUserData;
            }

            console.log("👤 Restored user:", restoredUser);
            setUser(restoredUser);

            // Re-save the updated session data
            sessionStorage.setItem('userSession', JSON.stringify(restoredUser));
          } else {
            console.log("🔄 No session data, using basic token data");
            // Since we have no stored session, we'll create a basic user session
            // but we cannot determine the currentRole, so user will need to choose role again
            const userData = getUserFromToken(tokenData.accessToken);
            const basicUser = {
              ...userData,
              actualRole: userData.role,
              // Note: currentRole will be undefined, so user needs to reselect
            };
            console.log("👤 Basic user (no currentRole):", basicUser);
            setUser(basicUser);

            // // For superadmin users, we can set a default currentRole
            // if (userData.role === 'superadmin') {
            //   console.log("🔧 Setting default role for superadmin");
            //   basicUser.currentRole = 'generaladmin'; // Default dashboard for superadmin
            //   setUser(basicUser);
            //   sessionStorage.setItem('userSession', JSON.stringify(basicUser));
            // }
          }

          setError(null);
          setIsAuthenticated(true);
          setupTokenRefresh(tokenData.accessToken);
        }
        console.log("✅ Auth initialization successful");
      } catch (error) {
        console.error("❌ Auth initialization failed:", error);
        console.error("❌ Error details:", error.message);
        console.error("❌ Error stack:", error.stack);

        // DON'T clear sessionStorage on error - keep it for debugging
        console.log("⚠️ Preserving sessionStorage for debugging");
        console.log("   - userSession still exists:", !!sessionStorage.getItem('userSession'));
        console.log("   - currentRole still exists:", !!sessionStorage.getItem('currentRole'));

        clearAuth();
        // Temporarily commented out to preserve session data for debugging
        // sessionStorage.removeItem('currentRole');
        // sessionStorage.removeItem('userSession');
        setIsAuthenticated(false);
        setUser(null);
        setError(null);
      } finally {
        setLoading(false);
        console.log("🏁 Auth initialization completed");
      }
    };

    initializeAuth();

    // Cleanup timer on unmount
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [setupTokenRefresh]);

  // login() now accepts chosenRole from login page
  const login = useCallback(
    async (credentials, chosenRole) => {
      try {
        console.log(credentials);
        const loginResult = await loginApi(credentials);

        // Get user data from API response or decode from token
        const loggedInUser =
          loginResult.user || getUserFromToken(loginResult.accessToken);

        // Check if user has access to the chosen role
        if (!hasRoleAccess(loggedInUser.role, chosenRole)) {
          toast.error(
            `Access denied: Your role (${loggedInUser.role}) cannot access ${chosenRole} dashboard`
          );
          clearAuth();
          setIsAuthenticated(false);
          setUser(null);
          throw new Error(
            `Access denied: cannot access ${chosenRole} with role ${loggedInUser.role}`
          );
        }

        // Store session info in sessionStorage for page reload persistence
        const userSessionData = {
          ...loggedInUser,
          currentRole: chosenRole,
          actualRole: loggedInUser.role,
        };

        console.log("💾 Storing session data:", userSessionData);
        sessionStorage.setItem('currentRole', chosenRole);
        sessionStorage.setItem('userSession', JSON.stringify(userSessionData));

        // Immediate verification that it was saved
        console.log("✅ Verification - stored data:");
        console.log("   - currentRole:", sessionStorage.getItem('currentRole'));
        console.log("   - userSession exists:", !!sessionStorage.getItem('userSession'));

        setUser({
          ...loggedInUser,
          currentRole: chosenRole,
          actualRole: loggedInUser.role,
        });

        setIsAuthenticated(true);
        setError(null);

        // Setup token refresh for the new session
        setupTokenRefresh(loginResult.accessToken);

        toast.success(`Login successful - accessing ${chosenRole} dashboard`);

        // Navigate to the chosen role's dashboard using dynamic route
        const dashboardPath = getDashboardRoute(chosenRole);
        if (dashboardPath) {
          navigate(dashboardPath);
        } else {
          // Default fallback to home
          navigate("/");
        }
      } catch (err) {
        console.error("Login failed:", err);
        setError(err.message || "Login failed");
        clearAuth();
        setIsAuthenticated(false);
        setUser(null);
        throw err;
      }
    },
    [navigate, setupTokenRefresh]
  );

  const logout = useCallback(async () => {
    try {
      await logoutApi();
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout API call failed:", err);
      // Don't show error toast for logout failures, just log it
    } finally {
      // Clear refresh timer
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }

      clearAuth();
      sessionStorage.removeItem('currentRole');
      sessionStorage.removeItem('userSession');
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
      navigate("/");
    }
  }, [navigate]);

  // Add role switching function for superadmins
  const switchRole = useCallback(
    (newRole) => {
      if (!user || !hasRoleAccess(user.actualRole, newRole)) {
        toast.error(`Access denied for ${newRole}`);
        return;
      }

      // Update session storage when switching roles
      sessionStorage.setItem('currentRole', newRole);
      const updatedUser = {
        ...user,
        currentRole: newRole,
      };
      sessionStorage.setItem('userSession', JSON.stringify(updatedUser));

      setUser(updatedUser);

      // Navigate to the new role's interface using dynamic route
      const dashboardPath = getDashboardRoute(newRole);
      if (dashboardPath) {
        navigate(dashboardPath);
      }

      toast.success(`Switched to ${newRole} interface`);
    },
    [user, navigate]
  );

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
      switchRole,
      loading,
      error,
    }),
    [isAuthenticated, user, login, logout, switchRole, loading, error]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
