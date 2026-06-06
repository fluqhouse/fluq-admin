// 📁 src/components/dashboard/Layout.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reuseables/Navbar";
import Sidebar from "../reuseables/Sidebar";
import useAuth from "../../../hooks/useAuth";
import { getSidebarItems } from "../../../utils/sidebarConfig.jsx";

const Layout = ({ children, title }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navItems = user?.currentRole ? getSidebarItems(user.currentRole) : [];
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      // On mobile, collapse sidebar by default
      if (!desktop) {
        setIsSidebarExpanded(false);
      }
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Sidebar - now uses relative positioning within flex container */}
      <Sidebar
        navItems={navItems}
        isAuthenticated={isAuthenticated}
        logout={logout}
        isExpanded={isSidebarExpanded}
        onToggle={toggleSidebar}
        isDesktop={isDesktop}
      />

      {/* Main content area - flexes to fill remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          user={user}
          title={title}
          onToggleSidebar={toggleSidebar}
          isSidebarExpanded={isSidebarExpanded}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-slate-950/50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;