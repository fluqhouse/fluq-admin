import React from "react";

const PageHeader = ({ title, description, children }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 truncate">
          {title}
        </h2>
        {description && (
          <p className="text-slate-300 text-sm sm:text-base line-clamp-2">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0 w-full sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;