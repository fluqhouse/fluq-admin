import React from "react";
import { useNavigate } from "react-router-dom";

// Reusable Card Component
export const PortalCard = ({ title, description, role }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate with query parameter using the role prop
    navigate(`/login?role=${encodeURIComponent(role || title)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 border border-gray-700 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-750 hover:border-gray-600 hover:scale-105 hover:shadow-lg hover:shadow-gray-900/20 group"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};
