// 📁 src/components/dashboard/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarNavigation = ({ navItems, isExpanded }) => {
  const location = useLocation();

  return (
    <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto">
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={index}
            to={item.href}
            className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
              isActive
                ? "text-white bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            } ${isExpanded ? 'space-x-3' : 'justify-center'}`}
            title={!isExpanded ? item.text : undefined}
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            {isExpanded && (
              <span className="truncate transition-opacity duration-200">
                {item.text}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

const SidebarFooter = ({ isAuthenticated, logout, isExpanded }) => {
  return (
    <div className="p-2 border-t border-slate-700/50">
      {isAuthenticated && (
        <button
          onClick={logout}
          className={`w-full flex items-center px-3 py-3 text-slate-300 bg-slate-700/50 rounded-lg transition-all duration-200 hover:text-white hover:bg-red-600/20 hover:border-red-500/30 border border-transparent ${
            isExpanded ? 'space-x-2' : 'justify-center'
          }`}
          title={!isExpanded ? 'Logout' : undefined}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {isExpanded && (
            <span className="transition-opacity duration-200">
              Logout
            </span>
          )}
        </button>
      )}
    </div>
  );
};

const Sidebar = ({ navItems, isAuthenticated, logout, isExpanded, onToggle, isDesktop }) => {
  if (!isDesktop && !isExpanded) {
    return null; // On mobile, don't render sidebar when collapsed
  }

  return (
    <>
      {/* Mobile Overlay */}
      {!isDesktop && isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50 flex flex-col
        transition-all duration-300 ease-in-out
        ${isDesktop ?
          (isExpanded ? 'w-64' : 'w-16') :
          'fixed left-0 top-0 h-screen w-64 z-50'
        }
      `}>

        {/* Header with toggle button */}
        <div className="flex items-center justify-between h-16 border-b border-slate-700/50 px-4">
          <div className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center w-full'}`}>
            <img
              src="/LOGO.jpg"
              alt="Fluq House Logo"
              className="w-10 h-10 object-contain flex-shrink-0"
            />
            {isExpanded && (
              <div className="transition-opacity duration-200">
                <h2 className="text-white font-bold text-lg">FLUQ HOUSE</h2>
              </div>
            )}
          </div>

          {/* Toggle button - only show on desktop or when expanded on mobile */}
          {(isDesktop || isExpanded) && (
            <button
              onClick={onToggle}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? '' : 'rotate-180'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        <SidebarNavigation
          navItems={navItems || []}
          isExpanded={isExpanded}
        />

        <SidebarFooter
          isAuthenticated={isAuthenticated}
          logout={logout}
          isExpanded={isExpanded}
        />
      </aside>
    </>
  );
};

export default Sidebar;