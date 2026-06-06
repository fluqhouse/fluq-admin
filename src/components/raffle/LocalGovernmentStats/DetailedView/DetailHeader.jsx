import React from "react";

export const DetailHeader = ({ lgaName, lgaData }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
      <h2 className="text-2xl font-bold text-white mb-2">{lgaName}</h2>
      <p className="text-slate-400">
        {lgaData.state && `${lgaData.state}, `}
        {lgaData.country}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <p className="text-sm text-blue-300">Total Tickets</p>
          <p className="text-2xl font-bold text-white mt-1">
            {lgaData.total_tickets}
          </p>
        </div>
        <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
          <p className="text-sm text-green-300">Total Users</p>
          <p className="text-2xl font-bold text-white mt-1">
            {lgaData.total_users}
          </p>
        </div>
        <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
          <p className="text-sm text-purple-300">Total Items</p>
          <p className="text-2xl font-bold text-white mt-1">
            {lgaData.total_items}
          </p>
        </div>
      </div>
    </div>
  );
};
