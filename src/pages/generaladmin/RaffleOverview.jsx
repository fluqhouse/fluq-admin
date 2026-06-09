import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import { useAccountingRaffleOverview } from "../../hooks/queries/useAccountingQueries";
import { formatCurrency, formatNumber, formatDate } from "../../utils/format";
import { RefreshCw, AlertCircle, Gift, DollarSign, Calendar, Users, TrendingUp, ExternalLink } from "lucide-react";

const RaffleOverview = () => {
  const {
    data: overviewData,
    isLoading,
    error,
    refetch,
  } = useAccountingRaffleOverview();

  const data = overviewData?.data;

  if (error) {
    return (
      <Layout title="Raffle Overview">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 text-lg mb-4">
              {error.message || "Failed to load raffle overview"}
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
    <Layout title="Raffle Overview">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Raffle Operations Overview</h2>
              <p className="text-slate-300">
                Monitor and oversee all raffle events across the platform.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/rafflemanager/items"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Manage Items
              </Link>
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
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
              <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm">Active Raffles</p>
                    <p className="text-white text-2xl font-bold">
                      {data?.activeRaffles || 0}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm">Today's Entries</p>
                    <p className="text-white text-2xl font-bold">
                      {formatNumber(data?.todayEntries || 0)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Upcoming Draws</p>
                    <p className="text-white text-2xl font-bold">
                      {data?.upcomingDraws || 0}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 text-sm">Total Prize Value</p>
                    <p className="text-white text-2xl font-bold">
                      {formatCurrency(data?.totalPrizeValue || 0)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Revenue and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Revenue Summary</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-6"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-300">Total Revenue</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(data?.totalRevenue || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-300">This Week</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(data?.weeklyRevenue || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-300">This Month</span>
                  <span className="text-blue-400 font-semibold">
                    {formatCurrency(data?.monthlyRevenue || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">Total Tickets Sold</span>
                  <span className="text-purple-400 font-semibold">
                    {formatNumber(data?.totalTicketsSold || 0)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Active Raffle Events</h3>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-16"></div>
                ))}
              </div>
            ) : data?.activeItems?.length > 0 ? (
              <div className="space-y-3">
                {data.activeItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-slate-600 last:border-0"
                  >
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-slate-400 text-sm">
                        {item.description} - Ends {formatDate(item.endDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">
                        {formatNumber(item.entries)} entries
                      </p>
                      <p className="text-slate-400 text-sm">
                        {formatCurrency(item.prizeValue)} value
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No active raffle events
              </div>
            )}
          </div>
        </div>

        {/* Category Performance */}
        {data?.categoryStats?.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Category Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Active Items
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Revenue
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Tickets Sold
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Avg. Prize Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.categoryStats.map((category, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">{category.name}</td>
                      <td className="px-4 py-3 text-slate-300">{category.activeItems}</td>
                      <td className="px-4 py-3 text-green-400">
                        {formatCurrency(category.revenue)}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {formatNumber(category.ticketsSold)}
                      </td>
                      <td className="px-4 py-3 text-purple-400">
                        {formatCurrency(category.avgPrizeValue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Winners */}
        {data?.recentWinners?.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Winners</h3>
            <div className="space-y-3">
              {data.recentWinners.map((winner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 px-4 bg-slate-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                      <Gift className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{winner.itemTitle}</p>
                      <p className="text-slate-400 text-sm">
                        Won by {winner.winnerName} on {formatDate(winner.drawDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">
                      {formatCurrency(winner.prizeValue)}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        winner.claimed
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {winner.claimed ? "Claimed" : "Pending Claim"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RaffleOverview;
