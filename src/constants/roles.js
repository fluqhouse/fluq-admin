/**
 * ==========================================================================
 * ROLE CONSTANTS
 * ==========================================================================
 * Centralized role definitions for the admin portal.
 * Add new roles here and they will be available throughout the application.
 */

/**
 * All available admin roles in the system
 * These map to backend role values
 */
export const ROLES = {
  SUPERADMIN: 'superadmin',
  GENERAL_ADMIN: 'generaladmin',
  ADMIN: 'admin',
  LOTTO_MANAGER: 'lottomanager',
  RAFFLE_MANAGER: 'rafflemanager',
  LOGISTICS: 'logistics',
  MARKETING_ADMIN: 'marketingadmin',
  LOTTO_ADMIN: 'lottoadmin',
  RAFFLE_ADMIN: 'raffleadmin',
  LOGISTICS_ADMIN: 'logisticsadmin',
  FINANCE_ADMIN: 'financeadmin',
  SUPPORT_ADMIN: 'supportadmin',
  ACCOUNTING_ADMIN: 'accountingadmin',
};

/**
 * Role display names for UI
 */
export const ROLE_DISPLAY_NAMES = {
  [ROLES.SUPERADMIN]: 'Super Admin',
  [ROLES.GENERAL_ADMIN]: 'General Admin',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.LOTTO_MANAGER]: 'Lotto Manager',
  [ROLES.RAFFLE_MANAGER]: 'Raffle Manager',
  [ROLES.LOGISTICS]: 'Logistics',
  [ROLES.MARKETING_ADMIN]: 'Marketing Admin',
  [ROLES.LOTTO_ADMIN]: 'Lotto Admin',
  [ROLES.RAFFLE_ADMIN]: 'Raffle Admin',
  [ROLES.LOGISTICS_ADMIN]: 'Logistics Admin',
  [ROLES.FINANCE_ADMIN]: 'Finance Admin',
  [ROLES.SUPPORT_ADMIN]: 'Support Admin',
  [ROLES.ACCOUNTING_ADMIN]: 'Accounting Admin',
};

/**
 * Roles that have portal access (shown on home page)
 * Order matters - this is the display order
 */
export const PORTAL_ROLES = [
  ROLES.GENERAL_ADMIN,
  ROLES.LOTTO_MANAGER,
  ROLES.RAFFLE_MANAGER,
  ROLES.LOGISTICS,
  ROLES.MARKETING_ADMIN,
];

/**
 * All navigation roles (roles with their own navigation/dashboard)
 */
export const NAVIGATION_ROLES = [
  ROLES.GENERAL_ADMIN,
  ROLES.LOTTO_MANAGER,
  ROLES.RAFFLE_MANAGER,
  ROLES.LOGISTICS,
  ROLES.MARKETING_ADMIN,
  ROLES.SUPERADMIN,
];

/**
 * Backend admin roles (for admin creation)
 */
export const ADMIN_CREATION_ROLES = [
  ROLES.SUPERADMIN,
  ROLES.ADMIN,
  ROLES.LOTTO_ADMIN,
  ROLES.RAFFLE_ADMIN,
  ROLES.LOGISTICS_ADMIN,
  ROLES.FINANCE_ADMIN,
  ROLES.SUPPORT_ADMIN,
  ROLES.ACCOUNTING_ADMIN,
  ROLES.MARKETING_ADMIN,
];

/**
 * Admin roles with labels and descriptions for UI (admin creation form)
 */
export const ADMIN_ROLES_CONFIG = [
  { value: ROLES.SUPERADMIN, label: 'Super Admin', description: 'Full system access' },
  { value: ROLES.ADMIN, label: 'Admin', description: 'General admin access' },
  { value: ROLES.LOTTO_ADMIN, label: 'Lotto Admin', description: 'Manage lotto games' },
  { value: ROLES.RAFFLE_ADMIN, label: 'Raffle Admin', description: 'Manage raffle items' },
  { value: ROLES.LOGISTICS_ADMIN, label: 'Logistics Admin', description: 'Manage logistics' },
  { value: ROLES.FINANCE_ADMIN, label: 'Finance Admin', description: 'Manage finances' },
  { value: ROLES.SUPPORT_ADMIN, label: 'Support Admin', description: 'Customer support' },
  { value: ROLES.ACCOUNTING_ADMIN, label: 'Accounting Admin', description: 'Manage accounting' },
  { value: ROLES.MARKETING_ADMIN, label: 'Marketing Admin', description: 'Marketing analytics' },
];

/**
 * All user roles for filtering (includes 'user' role)
 */
export const USER_ROLES_CONFIG = [
  { value: 'user', label: 'User' },
  { value: ROLES.ADMIN, label: 'Admin' },
  { value: ROLES.SUPERADMIN, label: 'Super Admin' },
  { value: ROLES.LOTTO_ADMIN, label: 'Lotto Admin' },
  { value: ROLES.RAFFLE_ADMIN, label: 'Raffle Admin' },
  { value: ROLES.LOGISTICS_ADMIN, label: 'Logistics Admin' },
  { value: ROLES.FINANCE_ADMIN, label: 'Finance Admin' },
  { value: ROLES.SUPPORT_ADMIN, label: 'Support Admin' },
  { value: ROLES.ACCOUNTING_ADMIN, label: 'Accounting Admin' },
  { value: ROLES.MARKETING_ADMIN, label: 'Marketing Admin' },
];

/**
 * Check if a role is a superadmin
 * @param {string} role - Role to check
 * @returns {boolean}
 */
export const isSuperAdmin = (role) => role === ROLES.SUPERADMIN;

/**
 * Check if a role has access to all portals
 * @param {string} role - Role to check
 * @returns {boolean}
 */
export const hasAllPortalAccess = (role) => isSuperAdmin(role);

/**
 * Get display name for a role
 * @param {string} role - Role key
 * @returns {string} Display name
 */
export const getRoleDisplayName = (role) => {
  return ROLE_DISPLAY_NAMES[role] || role;
};
