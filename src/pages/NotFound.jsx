// 📁 src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getDashboardRoute } from "../config/navigationConfig";

const NotFound = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20">
            <span className="text-3xl font-bold text-white">404</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Available</h1>
          <p className="text-slate-300 text-lg mb-2">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <p className="text-slate-400 text-sm">
            The page may have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {isAuthenticated && user ? (
            <button
              onClick={() => {
                const userRole = user.currentRole || user.role;
                const dashboardPath = getDashboardRoute(userRole);
                navigate(dashboardPath || '/');
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Go to Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Go to Home
            </button>
          )}

          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 border-2 border-slate-600 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 hover:border-slate-500 transition-all duration-200"
          >
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm mb-4">Need help? Try these links:</p>
          <div className="flex justify-center space-x-4">
            {!isAuthenticated ? (
              <button
                onClick={() => navigate('/login')}
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                Admin Login
              </button>
            ) : (
              <span className="text-slate-400 text-sm">
                Logged in as {user?.email || 'User'} ({user?.currentRole || user?.role})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
