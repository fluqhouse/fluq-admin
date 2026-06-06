import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import COLORS from "../../../../utils/colors";

const ICON_COLORS = COLORS; // Use first 10 colors for icons

export const IconDistributionChart = ({ iconData }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Icon Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={iconData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {iconData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ICON_COLORS[index % ICON_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
