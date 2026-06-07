import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useLottoAnalytics } from "../../hooks/queries/useLottoQueries";
import { formatCurrency, formatNumber } from "../../utils/format";

const Analytics = () => {
  const [period, setPeriod] = useState("30d");
  const { data: response, isLoading } = useLottoAnalytics({ period });
  const analytics = response?.data?.analytics || {
    totalSales: 0,
    totalPlayers: 0,
    winRate: 0,
    avgBet: 0,
    topGames: [],
  };

  return (
    <Layout title="Lotto Analytics">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Lotto Analytics
              </h2>
              <p className="text-slate-300">
                Monitor performance and analyze lotto game statistics.
              </p>
            </div>
            <div className="flex gap-4">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 outline-none"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
                Export Data
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Total Sales</p>
                  <p className="text-white text-2xl font-bold">
                    {formatCurrency(analytics.totalSales)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Total Players</p>
                  <p className="text-white text-2xl font-bold">
                    {formatNumber(analytics.totalPlayers)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">Win Rate</p>
                  <p className="text-white text-2xl font-bold">
                    {analytics.winRate}%
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Avg. Bet</p>
                  <p className="text-white text-2xl font-bold">
                    {formatCurrency(analytics.avgBet)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Sales Trend
              </h3>
              <div className="h-64 flex items-center justify-center text-slate-400">
                <p>Chart component would go here</p>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Top Performing Games
              </h3>
              <div className="space-y-3">
                {isLoading ? (
                  <p className="text-slate-400">Loading games...</p>
                ) : analytics.topGames.length > 0 ? (
                  analytics.topGames.map((game, index) => (
                    <div
                      key={game.id || index}
                      className="flex justify-between items-center p-3 bg-slate-600/50 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium">{game.title}</p>
                        <p className="text-slate-300 text-sm">
                          {game.playersCount} players
                        </p>
                      </div>
                      <div className="text-green-400 font-semibold">
                        {formatCurrency(game.revenue)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 py-4 text-center">
                    No game data available for this period.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
