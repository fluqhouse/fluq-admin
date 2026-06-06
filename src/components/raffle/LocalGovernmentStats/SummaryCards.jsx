import React from "react";

export const SummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-600/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-blue-300">Total Tickets</p>
          <span className="text-2xl">🎫</span>
        </div>
        <p className="text-3xl font-bold text-white">
          {summary.total_tickets || 0}
        </p>
        <p className="text-xs text-blue-300 mt-1">
          {summary.item_filter || "All Items"}
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-600/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-green-300">Unique Users</p>
          <span className="text-2xl">👥</span>
        </div>
        <p className="text-3xl font-bold text-white">
          {summary.total_users || 0}
        </p>
        <p className="text-xs text-green-300 mt-1">Participants</p>
      </div>

      <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-600/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-purple-300">Local Governments</p>
          <span className="text-2xl">📍</span>
        </div>
        <p className="text-3xl font-bold text-white">
          {summary.total_local_governments || 0}
        </p>
        <p className="text-xs text-purple-300 mt-1">
          {summary.lga_filter || "All Regions"}
        </p>
      </div>

      <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-600/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-orange-300">Unique Items</p>
          <span className="text-2xl">🏆</span>
        </div>
        <p className="text-3xl font-bold text-white">
          {summary.total_items || 0}
        </p>
        <p className="text-xs text-orange-300 mt-1">Raffle Items</p>
      </div>
    </div>
  );
};
