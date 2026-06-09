import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useAccountingDashboard } from "../../hooks/queries/useAccountingQueries";
import { formatCurrency, formatNumber } from "../../utils/format";
import { RefreshCw, AlertCircle, Gamepad2, Gift, ClipboardCheck, TrendingUp, DollarSign, Users } from "lucide-react";

const GeneralAdminDashboard = () => {
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
  } = useAccountingDashboard();

  const data = dashboardData?.data;

  if (error) {
    return (
      <Layout title="General Admin Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 text-lg mb-4">
              {error.message || "Failed to load dashboard"}
            </p>
            <button
              onClick={() => refetch()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="General Admin Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">General Admin Overview</h2>
              <p className="text-slate-300">
                Oversee lotto, raffle, and claims operations from your admin panel.
              </p>
            </div>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-slate-700/30 rounded-lg h-24"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Total Revenue</p>
                    <p className="text-white text-2xl font-bold">
                      {formatCurrency(data?.totalRevenue || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm">Active Users</p>
                    <p className="text-white text-2xl font-bold">
                      {formatNumber(data?.activeUsers || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm">Lotto Revenue</p>
                    <p className="text-white text-2xl font-bold">
                      {formatCurrency(data?.lottoRevenue || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 text-sm">Raffle Revenue</p>
                    <p className="text-white text-2xl font-bold">
                      {formatCurrency(data?.raffleRevenue || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Operations Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lotto Operations */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Lotto Operations</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-6"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Active Games</span>
                  <span className="text-white font-semibold">
                    {data?.lotto?.activeGames || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Today's Sales</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(data?.lotto?.todaySales || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Pending Draws</span>
                  <span className="text-yellow-400 font-semibold">
                    {data?.lotto?.pendingDraws || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Total Tickets</span>
                  <span className="text-blue-400 font-semibold">
                    {formatNumber(data?.lotto?.totalTickets || 0)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Raffle Operations */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Raffle Operations</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-6"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Active Items</span>
                  <span className="text-white font-semibold">
                    {data?.raffle?.activeItems || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Today's Entries</span>
                  <span className="text-green-400 font-semibold">
                    {formatNumber(data?.raffle?.todayEntries || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Upcoming Draws</span>
                  <span className="text-blue-400 font-semibold">
                    {data?.raffle?.upcomingDraws || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Total Tickets</span>
                  <span className="text-purple-400 font-semibold">
                    {formatNumber(data?.raffle?.totalTickets || 0)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Claims Status */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Claims Status</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-6"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Pending Verification</span>
                  <span className="text-yellow-400 font-semibold">
                    {data?.claims?.pendingVerification || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Awaiting Pickup</span>
                  <span className="text-blue-400 font-semibold">
                    {data?.claims?.awaitingPickup || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Completed Today</span>
                  <span className="text-green-400 font-semibold">
                    {data?.claims?.completedToday || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Total Claimed</span>
                  <span className="text-white font-semibold">
                    {formatNumber(data?.claims?.totalClaimed || 0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Growth Metrics */}
        {data?.growth && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Growth Metrics</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Revenue Growth</p>
                <p className={`text-xl font-bold ${data.growth.revenue >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {data.growth.revenue >= 0 ? "+" : ""}{data.growth.revenue?.toFixed(1)}%
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-slate-400 text-sm">User Growth</p>
                <p className={`text-xl font-bold ${data.growth.users >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {data.growth.users >= 0 ? "+" : ""}{data.growth.users?.toFixed(1)}%
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Lotto Growth</p>
                <p className={`text-xl font-bold ${data.growth.lotto >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {data.growth.lotto >= 0 ? "+" : ""}{data.growth.lotto?.toFixed(1)}%
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Raffle Growth</p>
                <p className={`text-xl font-bold ${data.growth.raffle >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {data.growth.raffle >= 0 ? "+" : ""}{data.growth.raffle?.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GeneralAdminDashboard;
