import React from "react";

export const FilterInputs = ({
  selectedItemId,
  setSelectedItemId,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedLGA,
  setSelectedLGA,
  hasActiveFilters,
  handleClearFilters,
  isDetailView,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {/* Item Filter */}
      <input
        type="text"
        value={selectedItemId}
        onChange={(e) => setSelectedItemId(e.target.value)}
        placeholder="Filter by Item ID"
        className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {/* Country Filter */}
      <input
        type="text"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        placeholder="Filter by Country"
        className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {/* State Filter */}
      <input
        type="text"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        placeholder="Filter by State"
        className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {/* LGA Filter */}
      <input
        type="text"
        value={selectedLGA}
        onChange={(e) => setSelectedLGA(e.target.value)}
        placeholder="Filter by LGA"
        className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isDetailView}
      />

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 text-red-400 text-sm rounded-lg transition-colors"
        >
          ✕ Clear Filters
        </button>
      )}
    </div>
  );
};
