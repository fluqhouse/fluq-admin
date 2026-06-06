import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const StatusBreakdownChart = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.status,
    value: Number(item.count),
  }));

  // Colors mapped to each status
  const STATUS_COLORS = {
    open: "#0088FE",       // Blue -> Open
    active: "#00C49F",     // Teal -> Active/In Progress
    draft: "#FFBB28",      // Yellow -> Draft
    closed: "#FF8042",     // Orange -> Closed
    archived: "#A28EFF",   // Purple -> Archived / Other
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Status Breakdown
      </h3>
      
      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={STATUS_COLORS[entry.name.toLowerCase()] || "#CCCCCC"}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Color Legend */}
      <div className="mt-4 flex flex-wrap gap-4">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            ></span>
            <span className="text-white capitalize">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
