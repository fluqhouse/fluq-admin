import React, { useState, useEffect } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useExecutiveDashboard,
  useUserAcquisitionMetrics,
  useRevenueAnalytics,
  useEngagementMetrics,
} from "../../hooks/queries/useMarketingQueries";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  RefreshCw,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PERIOD_OPTIONS = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "1y", label: "Last Year" },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

const StatCard = ({ title, value, change, icon: Icon, color, loading }) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>
      <h3 className="text-slate-400 text-sm mb-1">{title}</h3>
      {loading ? (
        <div className="h-8 bg-slate-700/50 rounded animate-pulse" />
      ) : (
        <p className="text-2xl font-bold text-white">{value}</p>
      )}
    </div>
  );
};

const ChartCard = ({ title, children, loading }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    {loading ? (
      <div className="h-64 bg-slate-700/30 rounded animate-pulse flex items-center justify-center">
        <span className="text-slate-500">Loading chart...</span>
      </div>
    ) : (
      children
    )}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
        <p className="text-slate-300 text-sm mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MarketingDashboard = () => {
  const [period, setPeriod] = useState("30d");

  const { data: dashboardRes, isLoading: dashboardLoading, error: dashboardError, refetch: refetchDashboard } = useExecutiveDashboard({ period });
  const { data: usersRes, isLoading: usersLoading, error: usersError, refetch: refetchUsers } = useUserAcquisitionMetrics({ period });
  const { data: revenueRes, isLoading: revenueLoading, error: revenueError, refetch: refetchRevenue } = useRevenueAnalytics({ period });
  const { data: engagementRes, isLoading: engagementLoading, error: engagementError, refetch: refetchEngagement } = useEngagementMetrics({ period });

  const loading = dashboardLoading || usersLoading || revenueLoading || engagementLoading;
  const queryError = dashboardError || usersError || revenueError || engagementError;
  const error = queryError ? (queryError.error?.message || queryError.message || "Failed to fetch data") : null;

  const fetchData = () => {
    refetchDashboard();
    refetchUsers();
    refetchRevenue();
    refetchEngagement();
  };

  const dashboardData = dashboardRes?.data;
  const userMetrics = usersRes?.data;
  const revenueMetrics = revenueRes?.data;
  const engagementMetrics = engagementRes?.data;



  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  const formatCurrency = (num) => {
    if (num === undefined || num === null) return "₦0";
    return "₦" + formatNumber(num);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const kpi = dashboardData?.executiveSummary?.kpi || {};
  const performance = dashboardData?.executiveSummary?.performance || {};
  const userCharts = userMetrics?.userMetrics?.charts || {};
  const revenueCharts = revenueMetrics?.revenueMetrics?.charts || {};
  const engagementCharts = engagementMetrics?.engagementMetrics?.charts || {};

  return (
    <Layout title="Marketing Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Marketing Analytics</h1>
            <p className="text-slate-400">Overview of key marketing metrics and KPIs</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={formatNumber(kpi.totalUsers)}
            change={kpi.userGrowthRate}
            icon={Users}
            color="bg-blue-500"
            loading={loading}
          />
          <StatCard
            title="New Users"
            value={formatNumber(kpi.newUsers)}
            icon={Users}
            color="bg-green-500"
            loading={loading}
          />
          <StatCard
            title="Active Users"
            value={formatNumber(kpi.activeUsers)}
            icon={Activity}
            color="bg-purple-500"
            loading={loading}
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(kpi.totalRevenue)}
            icon={DollarSign}
            color="bg-yellow-500"
            loading={loading}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Registration Trend */}
          <ChartCard title="User Registration Trend" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userCharts.registrationTrend || []}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="New Users"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Revenue Trend */}
          <ChartCard title="Revenue Trend" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueCharts.dailyRevenue || []}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `₦${formatNumber(v)}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Status Pie */}
          <ChartCard title="User Status" loading={loading}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userCharts.userStatus || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {(userCharts.userStatus || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Registration Methods */}
          <ChartCard title="Registration Methods" loading={loading}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userCharts.registrationMethods || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {(userCharts.registrationMethods || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Feature Usage */}
          <ChartCard title="Feature Usage" loading={loading}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={engagementCharts.featureComparison || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94A3B8" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="usage" name="Usage Count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="users" name="Unique Users" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Conversion Rate</h3>
            {loading ? (
              <div className="h-16 bg-slate-700/50 rounded animate-pulse" />
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-white">
                  {(performance.conversionRate || 0).toFixed(1)}%
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            )}
            <p className="text-slate-400 text-sm mt-2">Registration to purchase</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Retention Rate</h3>
            {loading ? (
              <div className="h-16 bg-slate-700/50 rounded animate-pulse" />
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-white">
                  {(performance.retentionRate || 0).toFixed(1)}%
                </div>
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
            )}
            <p className="text-slate-400 text-sm mt-2">Users returning within 30 days</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Avg. Lifetime Value</h3>
            {loading ? (
              <div className="h-16 bg-slate-700/50 rounded animate-pulse" />
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-white">
                  {formatCurrency(performance.avgLTV)}
                </div>
                <DollarSign className="w-8 h-8 text-yellow-400" />
              </div>
            )}
            <p className="text-slate-400 text-sm mt-2">Average customer LTV</p>
          </div>
        </div>

        {/* Daily Active Users Chart */}
        <ChartCard title="Daily Active Users" loading={loading}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementCharts.dailyActiveUsers || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tickFormatter={formatDate} stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                name="Active Users"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Layout>
  );
};

export default MarketingDashboard;
