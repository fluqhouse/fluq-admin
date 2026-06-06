import React from "react";

export const ActiveFilters = ({
  selectedItemId,
  selectedCountry,
  selectedState,
  selectedLGA,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-700/50">
      <span className="text-xs text-slate-400">Active Filters:</span>
      {selectedItemId && (
        <span className="px-2 py-1 bg-blue-600/20 border border-blue-600/30 text-blue-400 text-xs rounded">
          Item ID: {selectedItemId}
        </span>
      )}
      {selectedCountry && (
        <span className="px-2 py-1 bg-green-600/20 border border-green-600/30 text-green-400 text-xs rounded">
          Country: {selectedCountry}
        </span>
      )}
      {selectedState && (
        <span className="px-2 py-1 bg-purple-600/20 border border-purple-600/30 text-purple-400 text-xs rounded">
          State: {selectedState}
        </span>
      )}
      {selectedLGA && (
        <span className="px-2 py-1 bg-orange-600/20 border border-orange-600/30 text-orange-400 text-xs rounded">
          LGA: {selectedLGA}
        </span>
      )}
    </div>
  );
};
