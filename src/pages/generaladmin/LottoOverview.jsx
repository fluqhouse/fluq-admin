import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import { useAccountingLottoOverview } from "../../hooks/queries/useAccountingQueries";
import { formatCurrency, formatNumber, formatDate } from "../../utils/format";
import { RefreshCw, AlertCircle, Gamepad2, DollarSign, Clock, Users, TrendingUp, ExternalLink } from "lucide-react";

const LottoOverview = () => {
  const {
    data: overviewData,
    isLoading,
    error,
    refetch,
  } = useAccountingLottoOverview();

  const data = overviewData?.data;

  if (error) {
    return (
      <Layout title="Lotto Overview">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 text-lg mb-4">
              {error.message || "Failed to load lotto overview"}
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
    <Layout title="Lotto Overview">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Lotto Operations Overview</h2>
              <p className="text-slate-300">
                Monitor and oversee all lotto operations across the platform.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/lottomanager/games"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Manage Games
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
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Total Games</p>
                    <p className="text-white text-2xl font-bold">
                      {data?.summary?.total_games || 0}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm">Tickets Purchased</p>
                    <p className="text-white text-2xl font-bold">
                      {formatNumber(data?.tickets?.total_purchased || 0)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-300 text-sm">Unique Players</p>
                    <p className="text-white text-2xl font-bold">
                      {formatNumber(data?.players?.unique_players || 0)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm">Total Winners</p>
                    <p className="text-white text-2xl font-bold">
                      {formatNumber(data?.players?.total_winners || 0)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Revenue Summary */}
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
                  <span className="text-slate-300">Gross Revenue</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(data?.summary?.gross_revenue || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-300">Total Payouts</span>
                  <span className="text-yellow-400 font-semibold">
                    {formatCurrency(data?.summary?.total_payouts || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-300">Net Revenue</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(data?.summary?.net_revenue || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">Profit Margin</span>
                  <span className="text-blue-400 font-semibold">
                    {data?.summary?.profit_margin || 0}%
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Games by Status</h3>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-16"></div>
                ))}
              </div>
            ) : data?.games_by_status ? (
              <div className="space-y-3">
                {Object.entries(data.games_by_status).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between py-3 px-4 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'open' ? 'bg-green-400' :
                        status === 'closed' ? 'bg-slate-400' :
                        status === 'pending' ? 'bg-yellow-400' :
                        status === 'active' ? 'bg-blue-400' :
                        'bg-purple-400'
                      }`}></div>
                      <span className="text-white font-medium capitalize">{status}</span>
                    </div>
                    <span className="text-slate-300 font-semibold">{count} games</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No status data available
              </div>
            )}
          </div>
        </div>

        {/* Game Performance */}
        {data?.topGames?.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Performing Games</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Game
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Revenue
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Tickets Sold
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Players
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.topGames.map((game, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">{game.title}</td>
                      <td className="px-4 py-3 text-green-400">
                        {formatCurrency(game.revenue)}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {formatNumber(game.ticketsSold)}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {formatNumber(game.players)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            game.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : game.status === "scheduled"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-slate-500/20 text-slate-400"
                          }`}
                        >
                          {game.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LottoOverview;
