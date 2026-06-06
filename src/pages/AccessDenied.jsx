import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
          <div className="w-20 h-20 bg-red-600/20 border border-red-500/30 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.598 0L4.216 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-slate-300 mb-6">
            You don't have permission to access this role. Please contact your administrator if you believe this is an error.
          </p>

          <div className="space-y-3">
            <Link
              to="/"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-blue-500/30 rounded-md text-sm font-medium text-blue-300 bg-blue-600/20 hover:bg-blue-600/30 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Back Home
            </Link>

            {/* <Link
              to="/login"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-slate-600 rounded-md text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Try Different Role
            </Link> */}
          </div>
        </div>

        <p className="text-slate-400 text-sm">
          Need help? Contact support at <span className="text-blue-400">support@fluqhouse.com</span>
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;