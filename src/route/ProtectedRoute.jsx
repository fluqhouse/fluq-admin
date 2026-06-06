    // 📁 src/auth/ProtectedRoute.jsx
    import React from "react";
    import { Navigate } from "react-router-dom";
    import useAuth from "../hooks/useAuth";

    const ProtectedRoute = ({ allowedRoles, children }) => {
      const { user, isAuthenticated, loading } = useAuth();

      if (loading) return <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">Loading...</div>;

      if (!isAuthenticated) return <Navigate to="/" replace />;

      // Use the current role the user is operating as (chosen during login)
      const userActualRole = user?.actualRole || user?.role;
      const userCurrentRole = user?.currentRole || userActualRole;

      // Superadmin has access to everything
      if (userActualRole === "superadmin") return children;

      // Check if the user's current role OR their actual role has access to this route
      // This handles both chosen role access and post-refresh access
      if (!allowedRoles.includes(userCurrentRole) && !allowedRoles.includes(userActualRole)) {
        return <Navigate to="/access-denied" replace />;
      }

      return children;
    };

    export default ProtectedRoute;
