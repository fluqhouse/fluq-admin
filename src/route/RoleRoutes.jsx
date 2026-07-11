// 📁 src/route/RoleRoutes.jsx
import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { getAllRoutes } from "../config/navigationConfig.jsx";
import { ROLES } from "../constants";
import AccessDenied from "../pages/AccessDenied";

// Get all routes dynamically from navigationConfig
const allRoutes = getAllRoutes();

// Create role routes dynamically
const roleRoutes = [
  // Dynamic routes from navigationConfig
  ...allRoutes.map((route) => {
    // Determine allowed roles for each route based on path
    let allowedRoles = [ROLES.SUPERADMIN]; // superadmin always has access

    if (route.path.startsWith("/generaladmin")) {
      allowedRoles.push(ROLES.GENERAL_ADMIN, ROLES.ADMIN);
    } else if (route.path.startsWith("/lottomanager")) {
      allowedRoles.push(ROLES.LOTTO_MANAGER);
    } else if (route.path.startsWith("/rafflemanager")) {
      allowedRoles.push(ROLES.RAFFLE_MANAGER);
    } else if (route.path.startsWith("/logistics")) {
      allowedRoles.push(ROLES.LOGISTICS);
    } else if (route.path.startsWith("/marketing")) {
      allowedRoles.push(ROLES.MARKETING_ADMIN);
    } else if (route.path.startsWith("/support")) {
      allowedRoles.push(ROLES.SUPPORT_ADMIN);
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <ProtectedRoute allowedRoles={allowedRoles}>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">Loading...</div>}>
              <route.component />
            </Suspense>
          </ProtectedRoute>
        }
      />
    );
  }),

  // Access Denied Route
  <Route
    key="access-denied"
    path="/access-denied"
    element={<AccessDenied />}
  />,

  // Legacy routes for backward compatibility
  <Route
    key="unauthorized"
    path="/unauthorized"
    element={<AccessDenied />}
  />,
];

export default roleRoutes;
