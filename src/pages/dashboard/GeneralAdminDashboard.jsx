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
                    <p className="text-blue-300 text-sm">Gross Revenue</p>
                    <p className="text-white text-2xl font-bold">
                      {formatCurrency(data?.overall?.summary?.gross_revenue || 0)}
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
                    <p className="text-purple-300 text-sm">Net Revenue</p>
                    <p className="text-white text-2xl font-bold">
                      {formatCurrency(data?.overall?.summary?.net_revenue || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm">Lotto Revenue</p>
                    <p className="text-white text-2xl font-bold">
                      {formatCurrency(data?.lotto?.summary?.gross_revenue || 0)}
                    </p>
                    <p className="text-green-400 text-xs">
                      {data?.comparison?.lotto_contribution?.percentage || 0}%
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
                      {formatCurrency(data?.raffle?.summary?.gross_revenue || 0)}
                    </p>
                    <p className="text-orange-400 text-xs">
                      {data?.comparison?.raffle_contribution?.percentage || 0}%
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
                  <span className="text-slate-300">Total Games</span>
                  <span className="text-white font-semibold">
                    {data?.lotto?.summary?.total_games || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Gross Revenue</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(data?.lotto?.summary?.gross_revenue || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Tickets Purchased</span>
                  <span className="text-blue-400 font-semibold">
                    {formatNumber(data?.lotto?.tickets?.total_purchased || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Unique Players</span>
                  <span className="text-purple-400 font-semibold">
                    {formatNumber(data?.lotto?.players?.unique_players || 0)}
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
                  <span className="text-slate-300">Total Items</span>
                  <span className="text-white font-semibold">
                    {data?.raffle?.summary?.total_items || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Gross Revenue</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(data?.raffle?.summary?.gross_revenue || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Tickets Booked</span>
                  <span className="text-blue-400 font-semibold">
                    {formatNumber(data?.raffle?.tickets?.total_booked || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Unique Players</span>
                  <span className="text-purple-400 font-semibold">
                    {formatNumber(data?.raffle?.players?.unique_players || 0)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Transaction Summary */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Transaction Summary</h3>
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
                  <span className="text-slate-300">Game Plays</span>
                  <span className="text-blue-400 font-semibold">
                    {data?.overall?.transactions?.game_plays || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Game Wins</span>
                  <span className="text-green-400 font-semibold">
                    {data?.overall?.transactions?.game_wins || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Total Payouts</span>
                  <span className="text-yellow-400 font-semibold">
                    {formatCurrency(data?.overall?.summary?.total_payouts || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Profit Margin</span>
                  <span className="text-purple-400 font-semibold">
                    {data?.overall?.summary?.profit_margin || 0}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Game Status Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lotto Status */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Lotto Games by Status</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-12"></div>
                ))}
              </div>
            ) : data?.lotto?.games_by_status ? (
              <div className="space-y-2">
                {Object.entries(data.lotto.games_by_status).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'open' ? 'bg-green-400' :
                        status === 'closed' ? 'bg-slate-400' :
                        status === 'active' ? 'bg-blue-400' :
                        'bg-yellow-400'
                      }`}></div>
                      <span className="text-white font-medium capitalize">{status}</span>
                    </div>
                    <span className="text-slate-300 font-semibold">{count} games</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-400">No game status data</div>
            )}
          </div>

          {/* Raffle Status */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Raffle Items by Status</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-12"></div>
                ))}
              </div>
            ) : data?.raffle?.items_by_status ? (
              <div className="space-y-2">
                {Object.entries(data.raffle.items_by_status).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'open' ? 'bg-green-400' :
                        status === 'closed' ? 'bg-slate-400' :
                        status === 'pending' ? 'bg-yellow-400' :
                        'bg-blue-400'
                      }`}></div>
                      <span className="text-white font-medium capitalize">{status}</span>
                    </div>
                    <span className="text-slate-300 font-semibold">{count} items</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-400">No item status data</div>
            )}
          </div>
        </div>

        {/* Revenue by Game Type */}
        {data?.overall?.by_game_type && data.overall.by_game_type.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Revenue by Game Type</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.overall.by_game_type.map((item) => (
                <div key={item.game_type} className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {item.game_type === 'lotto' ? (
                        <Gamepad2 className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Gift className="w-5 h-5 text-purple-400" />
                      )}
                      <span className="text-white font-medium capitalize">{item.game_type}</span>
                    </div>
                    <span className="text-slate-400 text-sm">{item.transaction_count} transactions</span>
                  </div>
                  <p className="text-2xl font-bold text-green-400">
                    {formatCurrency(item.revenue)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GeneralAdminDashboard;
