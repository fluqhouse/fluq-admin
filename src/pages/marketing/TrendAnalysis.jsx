import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useTrendAnalysis } from "../../hooks/queries/useMarketingQueries";
import { formatCurrency, formatCurrencyCompact, formatNumber } from "../../utils/format";
import { TrendingUp, RefreshCw, AlertCircle, Calendar, Users, DollarSign, Target, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
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
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
        <p className="text-slate-300 text-sm mb-1">{label || ''}</p>
        {payload.map((entry, index) => {
          const value = entry.value;
          let displayValue = value;
          if (typeof value === 'number' && !isNaN(value)) {
            displayValue = entry.name?.toLowerCase().includes('revenue')
              ? formatCurrency(value)
              : formatNumber(value);
          }
          return (
            <p key={index} style={{ color: entry.color || '#fff' }} className="text-sm font-medium">
              {entry.name || 'Value'}: {displayValue}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const PredictiveCard = ({ title, value, icon: Icon, color, trend, loading }) => {
  const trendValue = typeof trend === 'number' ? trend : parseFloat(trend) || 0;
  const showTrend = trend !== undefined && trend !== null && !isNaN(trendValue);

  return (
    <div className="p-5 bg-slate-700/30 rounded-xl border border-slate-600/50">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {Icon && <Icon className="w-5 h-5 text-white" />}
        </div>
        {showTrend && (
          <span className={`text-xs font-medium ${trendValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trendValue >= 0 ? '+' : ''}{trendValue.toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-slate-400 text-sm mb-1">{title}</p>
      {loading ? (
        <div className="h-8 bg-slate-600/50 rounded animate-pulse" />
      ) : (
        <p className="text-2xl font-bold text-white">{value}</p>
      )}
    </div>
  );
};

const TrendAnalysis = () => {
  const [period, setPeriod] = useState("30d");

  const { data: responseData, isLoading: loading, error: queryError, refetch: fetchData } = useTrendAnalysis({ period });

  const data = responseData?.data;
  const error = queryError ? (queryError.error?.message || queryError.message || "Failed to fetch data") : null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const trendData = data?.trendData || {};
  const predictive = data?.predictiveMetrics || {};
  const charts = trendData?.charts || {};

  // Transform data for charts
  const userGrowthData = charts.userGrowth || trendData.dailyUsers?.map(d => ({
    date: d.date,
    users: parseInt(d.count) || 0
  })) || [];

  const revenueGrowthData = charts.revenueGrowth || trendData.dailyRevenue?.map(d => ({
    date: d.date,
    revenue: parseFloat(d.revenue) || 0
  })) || [];

  // Lotto trends
  const lottoTrendData = trendData.lottoTrends?.map(d => ({
    date: d.date,
    tickets: parseInt(d.tickets) || 0,
    revenue: parseFloat(d.revenue) || 0
  })) || [];

  // Raffle trends
  const raffleTrendData = trendData.raffleTrends?.map(d => ({
    date: d.date,
    tickets: parseInt(d.tickets) || 0,
    revenue: parseFloat(d.revenue) || 0
  })) || [];

  // Weekly user trends
  const weeklyUserData = trendData.weeklyUserTrends?.map(d => ({
    week: `Week ${d.week}`,
    users: parseInt(d.users) || 0
  })) || [];

  // Monthly revenue trends
  const monthlyRevenueData = trendData.monthlyRevenueTrends?.map(d => ({
    month: d.month,
    revenue: parseFloat(d.revenue) || 0
  })) || [];

  return (
    <Layout title="Trend Analysis">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Trend Analysis</h1>
              <p className="text-slate-400">Historical trends and predictive insights</p>
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

        {/* Predictive Metrics */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Predictive Metrics</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <PredictiveCard
              title="User Growth Rate"
              value={`${(predictive.userGrowthRate || 0).toFixed(1)}%`}
              icon={Users}
              color="bg-green-500"
              trend={predictive.userGrowthRate}
              loading={loading}
            />
            <PredictiveCard
              title="Revenue Growth Rate"
              value={`${(predictive.revenueGrowthRate || 0).toFixed(1)}%`}
              icon={TrendingUp}
              color="bg-blue-500"
              trend={predictive.revenueGrowthRate}
              loading={loading}
            />
            <PredictiveCard
              title="Projected Users (30d)"
              value={formatNumber(predictive.projectedUsers30Days)}
              icon={Target}
              color="bg-purple-500"
              loading={loading}
            />
            <PredictiveCard
              title="Projected Revenue (30d)"
              value={formatCurrencyCompact(predictive.projectedRevenue30Days)}
              icon={DollarSign}
              color="bg-yellow-500"
              loading={loading}
            />
          </div>
        </div>

        {/* User Growth Trend Chart */}
        <ChartCard title="User Registration Trend" loading={loading}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorUserGrowth" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#colorUserGrowth)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue Trend Chart */}
        <ChartCard title="Revenue Trend" loading={loading}>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueGrowthData}>
              <defs>
                <linearGradient id="colorRevGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tickFormatter={formatDate} stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => formatCurrencyCompact(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorRevGrowth)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Lotto & Raffle Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lotto Trends */}
          <ChartCard title="Lotto Sales Trend" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={lottoTrendData}>
                <defs>
                  <linearGradient id="colorLottoRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="#94A3B8" fontSize={12} />
                <YAxis yAxisId="left" stroke="#3B82F6" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#8B5CF6" fontSize={12} tickFormatter={(v) => formatCurrencyCompact(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="tickets" name="Tickets Sold" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorLottoRev)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Raffle Trends */}
          <ChartCard title="Raffle Sales Trend" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={raffleTrendData}>
                <defs>
                  <linearGradient id="colorRaffleRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" tickFormatter={formatDate} stroke="#94A3B8" fontSize={12} />
                <YAxis yAxisId="left" stroke="#10B981" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#EC4899" fontSize={12} tickFormatter={(v) => formatCurrencyCompact(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="tickets" name="Tickets Booked" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#EC4899"
                  fillOpacity={1}
                  fill="url(#colorRaffleRev)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Weekly & Monthly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly User Trends */}
          {weeklyUserData.length > 0 && (
            <ChartCard title="Weekly User Acquisition" loading={loading}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyUserData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="users" name="New Users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Monthly Revenue Trends */}
          {monthlyRevenueData.length > 0 && (
            <ChartCard title="Monthly Revenue" loading={loading}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => formatCurrencyCompact(v)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </div>

        {/* Comparison Line Chart */}
        {userGrowthData.length > 0 && (
          <ChartCard title="User vs Revenue Growth Comparison" loading={loading}>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={userGrowthData.map((item, index) => ({
                ...item,
                revenue: revenueGrowthData[index]?.revenue || 0
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#94A3B8"
                  fontSize={12}
                />
                <YAxis yAxisId="left" stroke="#3B82F6" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#10B981" fontSize={12} tickFormatter={(v) => formatCurrencyCompact(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="users"
                  name="New Users"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

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

export default TrendAnalysis;
