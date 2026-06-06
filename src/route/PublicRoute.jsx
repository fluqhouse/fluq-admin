  // 📁 src/route/PublicRoute.jsx
  import React from "react";
  import useAuth from "../hooks/useAuth";

  const PublicRoute = ({ children }) => {
    const { loading } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    // Always render the public component (like login page or home page)
    // Allow users to choose roles and re-login without automatic redirects
    return children;
  };

  export default PublicRoute;
