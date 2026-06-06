// 📁 src/auth/utils.js
import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token) => {
  if (!token) {
    console.log("🚫 getUserFromToken: No token provided");
    return null;
  }

  try {
    console.log("🔍 Decoding token:", token.substring(0, 20) + "...");
    const decoded = jwtDecode(token);
    console.log("✅ Token decoded successfully:", decoded);
    return decoded; // returns { id, email, role, iat, exp, ... }
  } catch (error) {
    console.error("❌ Invalid token decode error:", error);
    console.error("❌ Token that failed:", token);
    return null;
  }
};

/**
 * Check if JWT token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - true if expired, false if valid
 */
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

/**
 * Get time remaining before token expires (in seconds)
 * @param {string} token - JWT token
 * @returns {number} - seconds until expiration, 0 if expired/invalid
 */
export const getTokenExpirationTime = (token) => {
  if (!token) return 0;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const timeRemaining = decoded.exp - currentTime;
    return Math.max(0, timeRemaining);
  } catch (error) {
    console.error("Error getting token expiration time:", error);
    return 0;
  }
};

/**
 * Check if token needs refresh (within 5 minutes of expiry)
 * @param {string} token - JWT token
 * @returns {boolean} - true if should refresh, false otherwise
 */
export const shouldRefreshToken = (token) => {
  const timeRemaining = getTokenExpirationTime(token);
  const fiveMinutes = 5 * 60; // 5 minutes in seconds
  return timeRemaining > 0 && timeRemaining < fiveMinutes;
};
