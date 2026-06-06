import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  DefaultTooltipContent,
  Bar,
} from "recharts";  

export const CategoryBreakdownChart = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.category_name,
    count: Number(item.count),
  }));

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Category Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" tick={{ fill: "#cbd5e1" }} />
          <YAxis tick={{ fill: "#cbd5e1" }} />
          <DefaultTooltipContent />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
