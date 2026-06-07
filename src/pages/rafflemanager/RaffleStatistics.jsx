import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useGlobalStatistics,
  useCategories,
} from "../../hooks/queries/useRaffleQueries";
import { formatCurrency, formatNumber } from "../../utils/format";
import { StatusBreakdownChart } from "../../components/raffle/charts/StatusBreakdownChart";
import { CategoryBreakdownChart } from "../../components/raffle/charts/CategoryBreakdownChart";

const RaffleStatistics = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    period: "30d",
    category: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const {
    data: statsData,
    isLoading,
    error,
    refetch,
  } = useGlobalStatistics(filters);

  const { data: categoriesData } = useCategories();

  const stats = statsData?.data;
  const categories = categoriesData?.data || [];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (error) {
    return (
      <Layout title="Raffle Statistics">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">
              Error loading statistics
            </div>
            <button
              onClick={() => refetch()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Raffle Statistics">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Raffle Item Statistics
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Overview of all raffle activities
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate("/rafflemanager/categories")}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg"
              >
                Manage Categories
              </button>
              <button
                onClick={() => navigate("/rafflemanager/items")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg"
              >
                View Items
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Period Filter */}
            <div>
              <label className="text-xs text-slate-400 mb-2 block">
                Time Period
              </label>
              <select
                value={filters.period}
                onChange={(e) => handleFilterChange("period", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs text-slate-400 mb-2 block">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-xs text-slate-400 mb-2 block">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm"
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="text-xs text-slate-400 mb-2 block">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate || ""}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="text-xs text-slate-400 mb-2 block">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate || ""}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-slate-300">Loading statistics...</span>
          </div>
        ) : (
          <>
            {/* Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <p className="text-xs text-slate-400 mb-1">Total Items</p>
                <p className="text-2xl font-bold text-white">
                  {stats?.overview?.totalItems || 0}
                </p>
              </div>
              <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-4">
                <p className="text-xs text-green-300 mb-1">Active Items</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats?.overview?.activeItems || 0}
                </p>
              </div>
              <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-4">
                <p className="text-xs text-blue-300 mb-1">Completed</p>
                <p className="text-2xl font-bold text-blue-400">
                  {stats?.overview?.completedItems || 0}
                </p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-1">Draft</p>
                <p className="text-2xl font-bold text-white">
                  {stats?.overview?.draftItems || 0}
                </p>
              </div>
            </div>

            {/* Ticket Statistics */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Ticket Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-1">Total Tickets</p>
                  <p className="text-2xl font-bold text-white">
                    {formatNumber(stats?.ticketStatistics?.totalTickets || 0)}
                  </p>
                </div>
                <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                  <p className="text-xs text-green-300 mb-1">Booked</p>
                  <p className="text-2xl font-bold text-green-400">
                    {formatNumber(stats?.ticketStatistics?.bookedTickets || 0)}
                  </p>
                </div>
                <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                  <p className="text-xs text-blue-300 mb-1">Available</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {formatNumber(stats?.ticketStatistics?.availableTickets || 0)}
                  </p>
                </div>
                <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
                  <p className="text-xs text-purple-300 mb-1">Booking Rate</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {Number(stats?.ticketStatistics?.bookingRate || 0).toFixed(
                      1,
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Revenue Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-1">
                    Total Ticket Value
                  </p>
                  <p className="text-xl font-bold text-white">
                    {formatCurrency(
                      stats?.revenueStatistics?.totalTicketValue || 0,
                    )}
                  </p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-1">
                    Average Ticket Price
                  </p>
                  <p className="text-xl font-bold text-white">
                    {formatCurrency(
                      stats?.revenueStatistics?.averageTicketPrice || 0,
                    )}
                  </p>
                </div>
                <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                  <p className="text-xs text-green-300 mb-1">
                    Highest Ticket Price
                  </p>
                  <p className="text-xl font-bold text-green-400">
                    {formatCurrency(
                      stats?.revenueStatistics?.highestTicketPrice || 0,
                    )}
                  </p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-1">
                    Lowest Ticket Price
                  </p>
                  <p className="text-xl font-bold text-white">
                    {formatCurrency(
                      stats?.revenueStatistics?.lowestTicketPrice || 0,
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Breakdown */}
            {stats?.statusBreakdown?.length > 0 && (
              <StatusBreakdownChart data={stats.statusBreakdown} />
            )}

            {/* Category Breakdown */}
            {stats?.categoryBreakdown?.length > 0 && (
              <CategoryBreakdownChart data={stats.categoryBreakdown} />
            )}

            {/* Recent Activity */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Recent Activity (Last 30 Days)
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                  <p className="text-xs text-slate-400 mb-1">Items Created</p>
                  <p className="text-3xl font-bold text-white">
                    {stats?.recentActivity?.last30Days?.itemsCreated || 0}
                  </p>
                </div>

                <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                  <p className="text-xs text-slate-400 mb-1">Tickets Booked</p>
                  <p className="text-3xl font-bold text-white">
                    {stats?.recentActivity?.last30Days?.ticketsBooked || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Generated Timestamp */}
            <div className="text-center text-xs text-slate-500 mt-4">
              Generated at:{" "}
              {new Date(stats?.generatedAt).toLocaleString("en-NG", {
                hour12: true,
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default RaffleStatistics;
