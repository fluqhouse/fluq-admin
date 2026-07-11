// 📁 src/components/dashboard/Navbar.jsx
import React from 'react';
import { getRoleDisplayName } from '../../../config/navigationConfig.jsx';

const Navbar = ({ user, title, onToggleSidebar, isSidebarExpanded }) => {
  const roleDisplayName = user?.currentRole ? getRoleDisplayName(user.currentRole) : 'Guest';

  return (
    <nav className="h-16 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 flex-shrink-0">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
          {/* Menu Button for mobile only */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 lg:hidden"
            aria-label={isSidebarExpanded ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSidebarExpanded ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <h1 className="text-base lg:text-xl font-semibold text-white truncate">
            {title || `${roleDisplayName} Portal`}
          </h1>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Role Badge */}
          {user?.currentRole && (
            <div className="hidden sm:flex px-2 lg:px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full">
              <span className="text-blue-300 text-xs font-medium">{roleDisplayName}</span>
            </div>
          )}

          {/* User Profile */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-medium text-sm">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </span>
              )}
            </div>
            <span className="text-slate-300 text-sm hidden md:block max-w-32 lg:max-w-none truncate">
              {user?.email || 'Guest'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;