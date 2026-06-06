import React from "react";

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload.fullData;
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
        <p className="text-white font-semibold mb-2">{data.local_government}</p>
        {data.state && (
          <p className="text-slate-400 text-xs mb-2">
            {data.state}, {data.country}
          </p>
        )}
        <div className="space-y-1">
          <p className="text-sm text-blue-400">
            Tickets: <span className="font-semibold">{data.total_tickets}</span>
          </p>
          <p className="text-sm text-green-400">
            Users: <span className="font-semibold">{data.total_users}</span>
          </p>
          <p className="text-sm text-purple-400">
            Items: <span className="font-semibold">{data.total_items}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};
