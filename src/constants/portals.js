/**
 * ==========================================================================
 * PORTAL CONSTANTS
 * ==========================================================================
 * Portal card definitions for the home page.
 * Add new portals here to display them on the landing page.
 */

import { ROLES } from './roles';

/**
 * Portal card configurations
 * Each portal represents an admin section accessible from the home page
 */
export const PORTALS = [
  {
    id: 'generaladmin',
    title: 'General Admin',
    description: 'Oversee lotto, raffle, and logistics operations with comprehensive management tools.',
    role: ROLES.GENERAL_ADMIN,
    icon: 'dashboard',
  },
  {
    id: 'lottomanager',
    title: 'Lotto Manager',
    description: 'Manage lottery games, draws, transactions, and player analytics.',
    role: ROLES.LOTTO_MANAGER,
    icon: 'lotto',
  },
  {
    id: 'rafflemanager',
    title: 'Raffle Manager',
    description: 'Handle raffle events, prize management, and participant tracking.',
    role: ROLES.RAFFLE_MANAGER,
    icon: 'raffle',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Manage inventory, shipments, delivery tracking, and prize fulfillment.',
    role: ROLES.LOGISTICS,
    icon: 'logistics',
  },
  {
    id: 'marketingadmin',
    title: 'Marketing Admin',
    description: 'Access marketing analytics, user insights, revenue metrics, and trend analysis.',
    role: ROLES.MARKETING_ADMIN,
    icon: 'marketing',
  },
  {
    id: 'supportadmin',
    title: 'Support Admin',
    description: 'Manage customer support conversations and chat with users in real-time.',
    role: ROLES.SUPPORT_ADMIN,
    icon: 'support',
  },
];

/**
 * Get portals accessible by a specific role
 * Superadmin can access all portals, others only their own
 * @param {string} userRole - User's actual role
 * @returns {Array} Accessible portals
 */
export const getAccessiblePortals = (userRole) => {
  // Superadmin sees all portals
  if (userRole === ROLES.SUPERADMIN) {
    return PORTALS;
  }

  // Other roles only see their matching portal
  return PORTALS.filter(portal => portal.role === userRole);
};

/**
 * Check if user can access a specific portal
 * @param {string} userRole - User's role
 * @param {string} portalRole - Portal's required role
 * @returns {boolean}
 */
export const canAccessPortal = (userRole, portalRole) => {
  if (userRole === ROLES.SUPERADMIN) return true;
  return userRole === portalRole;
};
