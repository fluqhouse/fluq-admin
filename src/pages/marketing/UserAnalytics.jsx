import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useUserAcquisitionMetrics } from "../../hooks/queries/useMarketingQueries";
import { Users, RefreshCw, AlertCircle, Calendar, TrendingUp, UserCheck, UserX } from "lucide-react";
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

const ChartCard = ({ title, children, loading, className = "" }) => (
  <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 ${className}`}>
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

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="p-4 bg-slate-700/30 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <p className="text-slate-400 text-sm">{title}</p>
    </div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    {subtext && <p className="text-slate-500 text-xs mt-1">{subtext}</p>}
  </div>
);

const UserAnalytics = () => {
  const [period, setPeriod] = useState("30d");

  const { data: responseData, isLoading: loading, error: queryError, refetch: fetchData } = useUserAcquisitionMetrics({ period });

  const data = responseData?.data;
  const error = queryError ? (queryError.error?.message || queryError.message || "Failed to fetch data") : null;

  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    return num.toLocaleString();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const metrics = data?.userMetrics || {};
  const charts = metrics?.charts || {};

  return (
    <Layout title="User Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">User Analytics</h1>
              <p className="text-slate-400">User acquisition and retention metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            >
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        {/* Acquisition Metrics */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Acquisition Overview</h3>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-700/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard
                title="Total Users"
                value={formatNumber(metrics.acquisition?.totalUsers)}
                icon={Users}
                color="text-white"
              />
              <StatCard
                title="New Users"
                value={formatNumber(metrics.acquisition?.newUsers)}
                icon={TrendingUp}
                color="text-green-400"
                subtext={`${metrics.acquisition?.growthRate || 0}% growth`}
              />
              <StatCard
                title="Active Users"
                value={formatNumber(metrics.acquisition?.activeUsers)}
                icon={UserCheck}
                color="text-blue-400"
              />
              <StatCard
                title="Inactive Users"
                value={formatNumber(metrics.acquisition?.inactiveUsers || 0)}
                icon={UserX}
                color="text-red-400"
              />
              <StatCard
                title="Growth Rate"
                value={`${metrics.acquisition?.growthRate || 0}%`}
                icon={TrendingUp}
                color="text-purple-400"
              />
            </div>
          )}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Registration Trend */}
          <ChartCard title="User Registration Trend" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={charts.registrationTrend || []}>
                <defs>
                  <linearGradient id="colorUserReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="New Users"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorUserReg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* User Status Distribution */}
          <ChartCard title="User Status Distribution" loading={loading}>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={charts.userStatus || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={{ stroke: "#94A3B8" }}
                  >
                    {(charts.userStatus || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registration Methods */}
          <ChartCard title="Registration Methods" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={charts.registrationMethods || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={{ stroke: "#94A3B8" }}
                >
                  {(charts.registrationMethods || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Role Distribution */}
          <ChartCard title="Role Distribution" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={charts.roleDistribution || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94A3B8" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Users" fill="#8B5CF6" radius={[0, 4, 4, 0]}>
                  {(charts.roleDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Retention & LTV Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Retention Metrics */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Retention Metrics</h3>
            {loading ? (
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-slate-700/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <p className="text-slate-400 text-sm mb-2">Retention Rate</p>
                  <p className="text-4xl font-bold text-green-400">
                    {(metrics.retention?.retention_rate || 0).toFixed(1)}%
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <p className="text-slate-400 text-sm mb-2">Retained Users</p>
                  <p className="text-4xl font-bold text-blue-400">
                    {formatNumber(metrics.retention?.retained_users)}
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <p className="text-slate-400 text-sm mb-2">Total Base</p>
                  <p className="text-4xl font-bold text-white">
                    {formatNumber(metrics.retention?.total_users)}
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <p className="text-slate-400 text-sm mb-2">Churn Rate</p>
                  <p className="text-4xl font-bold text-red-400">
                    {(100 - (metrics.retention?.retention_rate || 0)).toFixed(1)}%
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Lifetime Value */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Lifetime Value</h3>
            {loading ? (
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-slate-700/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <p className="text-slate-400 text-sm mb-2">Average LTV</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    ₦{formatNumber(parseFloat(metrics.lifetimeValue?.avg_ltv || 0).toFixed(0))}
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <p className="text-slate-400 text-sm mb-2">Max LTV</p>
                  <p className="text-3xl font-bold text-green-400">
                    ₦{formatNumber(parseFloat(metrics.lifetimeValue?.max_ltv || 0).toFixed(0))}
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <p className="text-slate-400 text-sm mb-2">Min LTV</p>
                  <p className="text-3xl font-bold text-slate-400">
                    ₦{formatNumber(parseFloat(metrics.lifetimeValue?.min_ltv || 0).toFixed(0))}
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <p className="text-slate-400 text-sm mb-2">LTV Range</p>
                  <p className="text-3xl font-bold text-purple-400">
                    ₦{formatNumber((parseFloat(metrics.lifetimeValue?.max_ltv || 0) - parseFloat(metrics.lifetimeValue?.min_ltv || 0)).toFixed(0))}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date Range Info */}
        {data?.dateRange && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>
              Data from {new Date(data.dateRange.start).toLocaleDateString()} to {new Date(data.dateRange.end).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserAnalytics;
