// 📁 src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import roleRoutes from "./route/RoleRoutes";
import PublicRoute from "./route/PublicRoute";
import useAuth from "./hooks/useAuth";
import { getDashboardRoute } from "./config/navigationConfig.jsx";

const DashboardRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.currentRole || user?.role;
  const dashboardPath = getDashboardRoute(userRole);

  return <Navigate to={dashboardPath || "/"} replace />;
};

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Landing Page Route */}
      <Route path="/landing" element={<LandingPage />} />

      {/* Public Route for Login */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Dashboard Route - redirect to role-specific dashboard */}
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* Role-Based Routes */}
      {roleRoutes}

      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
