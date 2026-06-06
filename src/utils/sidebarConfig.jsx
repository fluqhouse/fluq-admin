/**
 * LEGACY SIDEBAR CONFIGURATION
 *
 * This file has been replaced by /src/config/navigationConfig.js
 * These functions are maintained for backward compatibility
 * but will redirect to the new centralized configuration.
 *
 * NEW NAVIGATION SYSTEM:
 * - All navigation items are defined in /src/config/navigationConfig.js
 * - Routes and sidebar items are generated from the same source
 * - Easy to add new items by updating one file
 * - No more synchronization issues between routes and sidebar
 */

import {
  getNavigationItems,
  getRoleDisplayName as getDisplayName
} from '../config/navigationConfig.jsx';

/**
 * Get sidebar items for a role
 * @deprecated Use getNavigationItems from navigationConfig.js
 * @param {string} role - User role
 * @returns {Array} Navigation items
 */
export const getSidebarItems = (role) => {
  console.warn(
    'getSidebarItems from sidebarConfig.jsx is deprecated. ' +
    'Use getNavigationItems from config/navigationConfig.js instead.'
  );
  return getNavigationItems(role);
};

/**
 * Get role display name
 * @deprecated Use getRoleDisplayName from navigationConfig.js
 * @param {string} role - User role
 * @returns {string} Display name
 */
export const getRoleDisplayName = (role) => {
  console.warn(
    'getRoleDisplayName from sidebarConfig.jsx is deprecated. ' +
    'Use getRoleDisplayName from config/navigationConfig.js instead.'
  );
  return getDisplayName(role);
};