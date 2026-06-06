/**
 * ==========================================================================
 * NAVIGATION & ROUTING CONFIGURATION
 * ==========================================================================
 *
 * Route and navigation configuration for all admin roles.
 * Role constants are imported from constants folder for scalability.
 */

import React from "react";
import {
  Home,
  BarChart3,
  FileText,
  Settings,
  Gamepad2,
  Gift,
  CreditCard,
  Building2,
  Package,
  Truck,
  MapPin,
  ClipboardCheck,
  CheckSquare,
  UserPlus,
  ScrollText,
  Users,
  TrendingUp,
  DollarSign,
  LineChart,
} from "lucide-react";

// Import role constants
import {
  ROLES,
  ROLE_DISPLAY_NAMES as ROLE_NAMES,
  NAVIGATION_ROLES,
} from "../constants";

// ==========================================================================
// PAGE COMPONENT IMPORTS
// ==========================================================================

// Lazy load components to avoid circular dependencies
const GeneralAdminDashboard = React.lazy(
  () => import("../pages/dashboard/GeneralAdminDashboard"),
);

const LogisticsDashboard = React.lazy(
  () => import("../pages/dashboard/LogisticsDashboard"),
);

// General Admin Pages
const LottoOverview = React.lazy(
  () => import("../pages/generaladmin/LottoOverview"),
);
const RaffleOverview = React.lazy(
  () => import("../pages/generaladmin/RaffleOverview"),
);
const LogisticsOverview = React.lazy(
  () => import("../pages/generaladmin/LogisticsOverview"),
);
const GeneralAnalytics = React.lazy(
  () => import("../pages/generaladmin/Analytics"),
);
const GeneralReports = React.lazy(
  () => import("../pages/generaladmin/Reports"),
);
const GeneralSettings = React.lazy(
  () => import("../pages/generaladmin/Settings"),
);

// Wallet Admin Pages
const WalletList = React.lazy(() => import("../pages/generaladmin/WalletList"));
const WalletTransactions = React.lazy(
  () => import("../pages/generaladmin/WalletTransactions"),
);

// Admin Management Pages
const AdminManagement = React.lazy(
  () => import("../pages/generaladmin/AdminManagement"),
);

// Audit Logs Page (Superadmin only)
const AuditLogs = React.lazy(
  () => import("../pages/generaladmin/AuditLogs"),
);

// User Management Page
const UserManagement = React.lazy(
  () => import("../pages/generaladmin/UserManagement"),
);

// Marketing Admin Pages
const MarketingDashboard = React.lazy(
  () => import("../pages/marketing/MarketingDashboard"),
);
const UserAnalytics = React.lazy(
  () => import("../pages/marketing/UserAnalytics"),
);
const RevenueAnalytics = React.lazy(
  () => import("../pages/marketing/RevenueAnalytics"),
);
const TrendAnalysis = React.lazy(
  () => import("../pages/marketing/TrendAnalysis"),
);
const MarketingSettings = React.lazy(
  () => import("../pages/marketing/MarketingSettings"),
);

// Lotto Manager Pages
const LottoGames = React.lazy(() => import("../pages/lottomanager/Games"));
const GameDetails = React.lazy(
  () => import("../pages/lottomanager/GameDetails"),
);
const DrawResults = React.lazy(
  () => import("../pages/lottomanager/DrawResults"),
);
const LottoTransactions = React.lazy(
  () => import("../pages/lottomanager/Transactions"),
);
const LottoAnalytics = React.lazy(
  () => import("../pages/lottomanager/Analytics"),
);
const LottoReports = React.lazy(() => import("../pages/lottomanager/Reports"));
const LottoSettings = React.lazy(
  () => import("../pages/lottomanager/Settings"),
);

// Raffle Manager Pages
const RaffleItems = React.lazy(
  () => import("../pages/rafflemanager/RaffleItems"),
);
const RaffleItemDetails = React.lazy(
  () => import("../pages/rafflemanager/RaffleItemDetails"),
);
const LocalGovernmentStats = React.lazy(
  () => import("../pages/rafflemanager/LocalGovernmentStats"),
);
const RaffleCategories = React.lazy(
  () => import("../pages/rafflemanager/RaffleCategories"),
);
const RaffleStatistics = React.lazy(
  () => import("../pages/rafflemanager/RaffleStatistics"),
);
const RaffleTransactions = React.lazy(
  () => import("../pages/rafflemanager/Transactions"),
);
const RaffleAnalytics = React.lazy(
  () => import("../pages/rafflemanager/Analytics"),
);
const RaffleReports = React.lazy(
  () => import("../pages/rafflemanager/Reports"),
);
const RaffleSettings = React.lazy(
  () => import("../pages/rafflemanager/Settings"),
);

// Logistics Pages
const Inventory = React.lazy(() => import("../pages/logistics/Inventory"));
const Shipments = React.lazy(() => import("../pages/logistics/Shipments"));
const Tracking = React.lazy(() => import("../pages/logistics/Tracking"));
const LogisticsReports = React.lazy(() => import("../pages/logistics/Reports"));
const LogisticsSettings = React.lazy(
  () => import("../pages/logistics/Settings"),
);

// ✅ NEW: Claims Management Pages
const ClaimsManagement = React.lazy(
  () => import("../pages/logistics/ClaimsManagement"),
);
const VerifyClaim = React.lazy(() => import("../pages/logistics/VerifyClaim"));
const ClaimDetail = React.lazy(() => import("../pages/logistics/ClaimDetail"));

// ==========================================================================
// NAVIGATION ICONS
// ==========================================================================

export const NAVIGATION_ICONS = {
  // Core Navigation Icons
  dashboard: <Home className="w-5 h-5" />,

  // Analytics & Reports
  analytics: <BarChart3 className="w-5 h-5" />,
  reports: <FileText className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,

  // Gaming & Entertainment
  lotto: <Gamepad2 className="w-5 h-5" />,
  raffle: <Gift className="w-5 h-5" />,

  // Financial
  transactions: <CreditCard className="w-5 h-5" />,
  wallet: <CreditCard className="w-5 h-5" />,
  walletList: <CheckSquare className="w-5 h-5" />,

  // Logistics & Operations
  logistics: <Building2 className="w-5 h-5" />,
  inventory: <Package className="w-5 h-5" />,
  shipments: <Truck className="w-5 h-5" />,
  tracking: <MapPin className="w-5 h-5" />,

  // ✅ NEW: Claims Management Icons
  claims: <ClipboardCheck className="w-5 h-5" />,
  verifyClaim: <CheckSquare className="w-5 h-5" />,

  // Geographic & Location
  lga: <MapPin className="w-5 h-5" />,

  // Admin Management
  adminManagement: <UserPlus className="w-5 h-5" />,

  // Audit Logs
  auditLogs: <ScrollText className="w-5 h-5" />,

  // User Management
  userManagement: <Users className="w-5 h-5" />,

  // Marketing
  marketingDashboard: <TrendingUp className="w-5 h-5" />,
  userAnalytics: <Users className="w-5 h-5" />,
  revenueAnalytics: <DollarSign className="w-5 h-5" />,
  trendAnalysis: <LineChart className="w-5 h-5" />,
};

// ==========================================================================
// ROLE-BASED NAVIGATION CONFIGURATION
// ==========================================================================

/**
 * Navigation configuration for each role
 * Each role has its own set of accessible routes
 * Routes are automatically converted to sidebar items and React Router routes
 */
export const ROLE_NAVIGATION = {
  // =======================================================================
  // GENERAL ADMIN - Overview of all operations
  // =======================================================================
  generaladmin: [
    {
      path: "/generaladmin/dashboard",
      text: "Dashboard",
      icon: "dashboard",
      component: GeneralAdminDashboard,
      isDashboard: true,
    },
    {
      path: "/generaladmin/lotto",
      text: "Lotto Overview",
      icon: "lotto",
      component: LottoOverview,
    },
    {
      path: "/generaladmin/raffle",
      text: "Raffle Overview",
      icon: "raffle",
      component: RaffleOverview,
    },
    {
      path: "/generaladmin/logistics",
      text: "Logistics Overview",
      icon: "logistics",
      component: LogisticsOverview,
    },
    // ✅ NEW: Wallet Management

    {
      path: "/generaladmin/wallets/all",
      text: "All Wallets",
      icon: "walletList",
      component: WalletList,
    },
    {
      path: "/generaladmin/wallets/transactions",
      text: "Wallet Transactions",
      icon: "transactions",
      component: WalletTransactions,
    },
    {
      path: "/generaladmin/analytics",
      text: "Analytics",
      icon: "analytics",
      component: GeneralAnalytics,
    },
    {
      path: "/generaladmin/reports",
      text: "Reports",
      icon: "reports",
      component: GeneralReports,
    },
    {
      path: "/generaladmin/admin-management",
      text: "Admin Management",
      icon: "adminManagement",
      component: AdminManagement,
    },
    {
      path: "/generaladmin/user-management",
      text: "User Management",
      icon: "userManagement",
      component: UserManagement,
    },
    {
      path: "/generaladmin/audit-logs",
      text: "Audit Logs",
      icon: "auditLogs",
      component: AuditLogs,
    },
    {
      path: "/generaladmin/settings",
      text: "Settings",
      icon: "settings",
      component: GeneralSettings,
    },
  ],

  // =======================================================================
  // LOTTO MANAGER - Lottery game management
  // =======================================================================
  lottomanager: [
    {
      path: "/lottomanager/games/:gameId",
      text: "Game Details",
      icon: "lotto",
      component: GameDetails,
      hideFromSidebar: true,
    },
    {
      path: "/lottomanager/games/:gameId/results",
      text: "Draw Results",
      icon: "lotto",
      component: DrawResults,
      hideFromSidebar: true,
    },
    {
      path: "/lottomanager/games",
      text: "Lotto Games",
      icon: "lotto",
      component: LottoGames,
      isDashboard: true,
    },
    {
      path: "/lottomanager/transactions",
      text: "Transactions",
      icon: "transactions",
      component: LottoTransactions,
    },
    {
      path: "/lottomanager/analytics",
      text: "Analytics",
      icon: "analytics",
      component: LottoAnalytics,
    },
    {
      path: "/lottomanager/reports",
      text: "Reports",
      icon: "reports",
      component: LottoReports,
    },
    {
      path: "/lottomanager/settings",
      text: "Settings",
      icon: "settings",
      component: LottoSettings,
    },
  ],

  // =======================================================================
  // RAFFLE MANAGER - Raffle event management
  // =======================================================================
  rafflemanager: [
    {
      path: "/rafflemanager/statistics",
      text: "Items Statistics",
      icon: "analytics",
      component: RaffleStatistics,
    },
    {
      path: "/rafflemanager/items/:id",
      text: "Item Details",
      icon: "raffle",
      component: RaffleItemDetails,
      hideFromSidebar: true,
    },
    {
      path: "/rafflemanager/items",
      text: "Raffle Items",
      icon: "raffle",
      component: RaffleItems,
      isDashboard: true,
    },
    {
      path: "/rafflemanager/categories",
      text: "Categories",
      icon: "settings",
      component: RaffleCategories,
    },
    {
      path: "/rafflemanager/transactions",
      text: "Transactions",
      icon: "transactions",
      component: RaffleTransactions,
    },
    {
      path: "/rafflemanager/analytics",
      text: "Analytics",
      icon: "analytics",
      component: RaffleAnalytics,
    },
    // ✅ NEW: LGA Analytics - Now visible in sidebar
    {
      path: "/rafflemanager/analytics/local-government",
      text: "LGA Analytics",
      icon: "lga",
      component: LocalGovernmentStats,
    },
    {
      path: "/rafflemanager/reports",
      text: "Reports",
      icon: "reports",
      component: RaffleReports,
    },
    {
      path: "/rafflemanager/settings",
      text: "Settings",
      icon: "settings",
      component: RaffleSettings,
    },
  ],

  // =======================================================================
  // LOGISTICS - Supply chain, fulfillment, and claims management
  // =======================================================================
  logistics: [
    {
      path: "/logistics/dashboard",
      text: "Dashboard",
      icon: "dashboard",
      component: LogisticsDashboard,
      isDashboard: true,
    },
    // ✅ NEW: Claims Management Section
    {
      path: "/logistics/claims/:claimId",
      text: "Claim Detail",
      icon: "claims",
      component: ClaimDetail,
      hideFromSidebar: true, // Hidden - accessed via claims list
    },
    {
      path: "/logistics/claims",
      text: "Claims Management",
      icon: "claims",
      component: ClaimsManagement,
    },
    {
      path: "/logistics/verify-claim",
      text: "Verify Claim",
      icon: "verifyClaim",
      component: VerifyClaim,
    },
    // Existing Logistics Pages
    {
      path: "/logistics/inventory",
      text: "Inventory",
      icon: "inventory",
      component: Inventory,
    },
    {
      path: "/logistics/shipments",
      text: "Shipments",
      icon: "shipments",
      component: Shipments,
    },
    {
      path: "/logistics/tracking",
      text: "Tracking",
      icon: "tracking",
      component: Tracking,
    },
    {
      path: "/logistics/reports",
      text: "Reports",
      icon: "reports",
      component: LogisticsReports,
    },
    {
      path: "/logistics/settings",
      text: "Settings",
      icon: "settings",
      component: LogisticsSettings,
    },
  ],

  // =======================================================================
  // MARKETING ADMIN - Marketing analytics and insights
  // =======================================================================
  marketingadmin: [
    {
      path: "/marketing/dashboard",
      text: "Dashboard",
      icon: "marketingDashboard",
      component: MarketingDashboard,
      isDashboard: true,
    },
    {
      path: "/marketing/users",
      text: "User Analytics",
      icon: "userAnalytics",
      component: UserAnalytics,
    },
    {
      path: "/marketing/revenue",
      text: "Revenue Analytics",
      icon: "revenueAnalytics",
      component: RevenueAnalytics,
    },
    {
      path: "/marketing/trends",
      text: "Trend Analysis",
      icon: "trendAnalysis",
      component: TrendAnalysis,
    },
    {
      path: "/marketing/settings",
      text: "Settings",
      icon: "settings",
      component: MarketingSettings,
    },
  ],

  // =======================================================================
  // SUPER ADMIN - Access to all role dashboards and operations
  // =======================================================================
  superadmin: [
    {
      path: "/generaladmin/dashboard",
      text: "General Admin Dashboard",
      icon: "dashboard",
      component: GeneralAdminDashboard,
      isDashboard: true,
    },
    {
      path: "/generaladmin/lotto",
      text: "Lotto Overview",
      icon: "lotto",
      component: LottoOverview,
    },
    {
      path: "/generaladmin/raffle",
      text: "Raffle Overview",
      icon: "raffle",
      component: RaffleOverview,
    },
    {
      path: "/generaladmin/logistics",
      text: "Logistics Overview",
      icon: "logistics",
      component: LogisticsOverview,
    },
    // ✅ NEW: Wallet Management

    {
      path: "/generaladmin/wallets/all",
      text: "All Wallets",
      icon: "walletList",
      component: WalletList,
    },
    {
      path: "/generaladmin/wallets/transactions",
      text: "Wallet Transactions",
      icon: "transactions",
      component: WalletTransactions,
    },

    {
      path: "/lottomanager/games/:gameId",
      text: "Game Details",
      icon: "lotto",
      component: GameDetails,
      hideFromSidebar: true,
    },
    {
      path: "/lottomanager/games",
      text: "Lotto Games",
      icon: "lotto",
      component: LottoGames,
      isDashboard: true,
    },
    {
      path: "/lottomanager/transactions",
      text: "Lotto Transactions",
      icon: "transactions",
      component: LottoTransactions,
    },
    // Raffle Manager routes for superadmin
    {
      path: "/rafflemanager/statistics",
      text: "Raffle Statistics",
      icon: "analytics",
      component: RaffleStatistics,
    },
    {
      path: "/rafflemanager/items/:id",
      text: "Item Details",
      icon: "raffle",
      component: RaffleItemDetails,
      hideFromSidebar: true,
    },
    {
      path: "/rafflemanager/items",
      text: "Raffle Items",
      icon: "raffle",
      component: RaffleItems,
    },
    {
      path: "/rafflemanager/categories",
      text: "Raffle Categories",
      icon: "settings",
      component: RaffleCategories,
    },
    {
      path: "/rafflemanager/transactions",
      text: "Raffle Transactions",
      icon: "transactions",
      component: RaffleTransactions,
    },
    {
      path: "/rafflemanager/analytics",
      text: "Raffle Analytics",
      icon: "analytics",
      component: RaffleAnalytics,
    },
    // ✅ NEW: LGA Analytics for superadmin - Now visible in sidebar
    {
      path: "/rafflemanager/analytics/local-government",
      text: "Raffle LGA Analytics",
      icon: "lga",
      component: LocalGovernmentStats,
    },
    // ✅ NEW: Logistics with Claims Management for superadmin
    {
      path: "/logistics/dashboard",
      text: "Logistics Dashboard",
      icon: "dashboard",
      component: LogisticsDashboard,
    },
    {
      path: "/logistics/claims/:claimId",
      text: "Claim Detail",
      icon: "claims",
      component: ClaimDetail,
      hideFromSidebar: true,
    },
    {
      path: "/logistics/claims",
      text: "Claims Management",
      icon: "claims",
      component: ClaimsManagement,
    },
    {
      path: "/logistics/verify-claim",
      text: "Verify Claim",
      icon: "verifyClaim",
      component: VerifyClaim,
    },
    {
      path: "/logistics/inventory",
      text: "Inventory Management",
      icon: "inventory",
      component: Inventory,
    },
    {
      path: "/logistics/shipments",
      text: "Shipments",
      icon: "shipments",
      component: Shipments,
    },
    {
      path: "/generaladmin/analytics",
      text: "System Analytics",
      icon: "analytics",
      component: GeneralAnalytics,
    },
    {
      path: "/generaladmin/reports",
      text: "System Reports",
      icon: "reports",
      component: GeneralReports,
    },
    {
      path: "/generaladmin/admin-management",
      text: "Admin Management",
      icon: "adminManagement",
      component: AdminManagement,
    },
    {
      path: "/generaladmin/user-management",
      text: "User Management",
      icon: "userManagement",
      component: UserManagement,
    },
    {
      path: "/generaladmin/audit-logs",
      text: "Audit Logs",
      icon: "auditLogs",
      component: AuditLogs,
    },
    // Marketing Analytics for superadmin
    {
      path: "/marketing/dashboard",
      text: "Marketing Dashboard",
      icon: "marketingDashboard",
      component: MarketingDashboard,
    },
    {
      path: "/marketing/users",
      text: "User Analytics",
      icon: "userAnalytics",
      component: UserAnalytics,
    },
    {
      path: "/marketing/revenue",
      text: "Revenue Analytics",
      icon: "revenueAnalytics",
      component: RevenueAnalytics,
    },
    {
      path: "/marketing/trends",
      text: "Trend Analysis",
      icon: "trendAnalysis",
      component: TrendAnalysis,
    },
    {
      path: "/generaladmin/settings",
      text: "System Settings",
      icon: "settings",
      component: GeneralSettings,
    },
  ],
};

// ==========================================================================
// ROLE CONFIGURATION (Re-exported from constants for backward compatibility)
// ==========================================================================

/**
 * Role display names for UI
 * Re-exported from constants folder
 */
export { ROLE_DISPLAY_NAMES } from "../constants";

/**
 * All available roles for navigation
 * Uses NAVIGATION_ROLES from constants
 */
export const AVAILABLE_ROLES = NAVIGATION_ROLES;

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

/**
 * Get navigation items for a specific role
 * Converts route config to sidebar format
 * @param {string} role - User role
 * @returns {Array} Navigation items for sidebar
 */
export const getNavigationItems = (role) => {
  const routes = ROLE_NAVIGATION[role] || [];

  return routes
    .filter((route) => !route.hideFromSidebar)
    .map((route) => ({
      href: route.path,
      text: route.text,
      icon: NAVIGATION_ICONS[route.icon] || NAVIGATION_ICONS.dashboard,
      active: route.isDashboard || false,
    }));
};

/**
 * Get all routes for a specific role
 * @param {string} role - User role
 * @returns {Array} Route configurations
 */
export const getRoleRoutes = (role) => {
  return ROLE_NAVIGATION[role] || [];
};

/**
 * Get all routes for all roles (for React Router setup)
 * @returns {Array} All route configurations
 */
export const getAllRoutes = () => {
  const allRoutes = [];

  AVAILABLE_ROLES.forEach((role) => {
    const routes = getRoleRoutes(role);
    allRoutes.push(...routes);
  });

  return allRoutes;
};

/**
 * Get role display name
 * @param {string} role - User role
 * @returns {string} Display name
 */
export const getRoleDisplayName = (role) => {
  return ROLE_NAMES[role] || role;
};

/**
 * Check if user has access to a specific role
 * Superadmin has access to all roles, others only to their own section
 * @param {string} userRole - User's actual role
 * @param {string} targetRole - Role trying to access
 * @returns {boolean} Access granted
 */
export const hasRoleAccess = (userRole, targetRole) => {
  // Superadmin has access to all roles
  if (userRole === ROLES.SUPERADMIN) {
    return true;
  }

  // Each role can only access their own dashboard
  return userRole === targetRole;
};

/**
 * Get dashboard route for a role
 * @param {string} role - User role
 * @returns {string|null} Dashboard path
 */
export const getDashboardRoute = (role) => {
  const routes = getRoleRoutes(role);
  const dashboard = routes.find((route) => route.isDashboard);
  return dashboard ? dashboard.path : null;
};
