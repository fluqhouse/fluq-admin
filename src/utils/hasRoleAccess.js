/**
 * ROLE ACCESS CONTROL
 *
 * This utility manages role-based access control for the application.
 * Superadmin has full access to all role sections.
 * Other roles can only access their own section.
 */

import { NAVIGATION_ROLES, ROLES } from '../constants';

/**
 * Check if user has access to a specific role/section
 * Superadmin can access all sections, others only their own
 *
 * @param {string} userRole - The user's actual role
 * @param {string} chosenRole - The role/section they're trying to access
 * @returns {boolean} Whether access is granted
 */
export const hasRoleAccess = (userRole, chosenRole) => {
  // Superadmin has access to ALL roles (no validation needed)
  if (userRole === ROLES.SUPERADMIN) {
    return true;
  }

  // Validate that both roles exist in our system
  if (!NAVIGATION_ROLES.includes(userRole) || !NAVIGATION_ROLES.includes(chosenRole)) {
    return false;
  }

  // Each role can only access their own section
  return userRole === chosenRole;
};

/**
 * Get all roles that a user can access
 * Superadmin can access all roles, others only their own
 *
 * @param {string} userRole - The user's role
 * @returns {Array<string>} Array of accessible roles
 */
export const getAllowedRoles = (userRole) => {
  // Validate role exists
  if (!NAVIGATION_ROLES.includes(userRole)) {
    return [];
  }

  // Superadmin can access all roles
  if (userRole === ROLES.SUPERADMIN) {
    return NAVIGATION_ROLES.filter(role => role !== ROLES.SUPERADMIN);
  }

  // Each role can only access its own dashboard
  return [userRole];
};

/**
 * Check if a role is valid in the system
 *
 * @param {string} role - Role to validate
 * @returns {boolean} Whether the role is valid
 */
export const isValidRole = (role) => {
  return NAVIGATION_ROLES.includes(role);
};

/**
 * Get the default dashboard path for a role
 *
 * @param {string} role - User role
 * @returns {string|null} Dashboard path or null if invalid role
 */
export const getDefaultDashboard = (role) => {
  if (!isValidRole(role)) {
    return null;
  }

  // Superadmin defaults to general admin dashboard
  if (role === ROLES.SUPERADMIN) {
    return '/generaladmin/dashboard';
  }

  return `/${role}/dashboard`;
};
