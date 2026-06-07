import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useRevenueAnalytics } from "../../hooks/queries/useMarketingQueries";
import { formatCurrency, formatCurrencyCompact, formatNumber } from "../../utils/format";
import { DollarSign, RefreshCw, AlertCircle, Calendar, TrendingUp, CreditCard } from "lucide-react";
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
  ComposedChart,
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
            {entry.name}: {typeof entry.value === 'number'
              ? entry.name.toLowerCase().includes('revenue')
                ? formatCurrency(entry.value)
                : formatNumber(entry.value)
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueAnalytics = () => {
  const [period, setPeriod] = useState("30d");

  const { data: responseData, isLoading: loading, error: queryError, refetch: fetchData } = useRevenueAnalytics({ period });

  const data = responseData?.data;
  const error = queryError ? (queryError.error?.message || queryError.message || "Failed to fetch data") : null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const metrics = data?.revenueMetrics || {};
  const charts = metrics?.charts || {};

  return (
    <Layout title="Revenue Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Revenue Analytics</h1>
              <p className="text-slate-400">Revenue breakdown and transaction metrics</p>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-slate-400 text-sm">Total Revenue</span>
            </div>
            {loading ? (
              <div className="h-8 bg-slate-700/50 rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-green-400">{formatCurrencyCompact(metrics.summary?.totalRevenue)}</p>
            )}
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-slate-400 text-sm">Transactions</span>
            </div>
            {loading ? (
              <div className="h-8 bg-slate-700/50 rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-blue-400">{formatNumber(metrics.summary?.totalTransactions)}</p>
            )}
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-slate-400 text-sm">Avg. Transaction</span>
            </div>
            {loading ? (
              <div className="h-8 bg-slate-700/50 rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-yellow-400">{formatCurrencyCompact(metrics.summary?.avgTransactionValue)}</p>
            )}
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-slate-400 text-sm">Avg. Daily</span>
            </div>
            {loading ? (
              <div className="h-8 bg-slate-700/50 rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-purple-400">
                {formatCurrencyCompact((charts.dailyRevenue?.reduce((sum, d) => sum + (d.revenue || 0), 0) || 0) / (charts.dailyRevenue?.length || 1))}
              </p>
            )}
          </div>
        </div>

        {/* Revenue Trend Chart */}
        <ChartCard title="Revenue Trend" loading={loading}>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={charts.dailyRevenue || []}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" tickFormatter={formatDate} stroke="#94A3B8" fontSize={12} />
              <YAxis yAxisId="left" stroke="#10B981" fontSize={12} tickFormatter={formatCurrencyCompact} />
              <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorRev)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="transactions"
                name="Transactions"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Type */}
          <ChartCard title="Revenue by Type" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={charts.revenueByType || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                  labelLine={{ stroke: "#94A3B8" }}
                >
                  {(charts.revenueByType || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Lotto Sales by Status */}
          <ChartCard title="Lotto Sales by Payment Status" loading={loading}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={charts.lottoSalesByStatus || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name="Tickets" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                  {(charts.lottoSalesByStatus || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === 'paid' ? '#10B981' :
                        entry.name === 'unpaid' ? '#F59E0B' :
                        entry.name === 'failed' ? '#EF4444' : '#8B5CF6'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Revenue by Product */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue by Product</h3>
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-700/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm mb-2">Lotto Revenue</p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrencyCompact(metrics.lottoSales?.reduce((sum, l) => sum + parseFloat(l.totalSales || 0), 0))}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <p className="text-blue-400 text-sm mt-2">
                  {formatNumber(metrics.lottoSales?.reduce((sum, l) => sum + parseInt(l.totalTickets || 0), 0))} tickets sold
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm mb-2">Raffle Revenue</p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrencyCompact(charts.revenueComparison?.find(r => r.name === 'Raffle')?.value || 0)}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                <p className="text-purple-400 text-sm mt-2">
                  {formatNumber(metrics.raffleSales?.totalRaffleTickets || 0)} tickets booked
                </p>
              </div>
            </div>
          )}
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

export default RevenueAnalytics;
