import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useRaffleAnalytics } from "../../hooks/queries/useRaffleQueries";

const Analytics = () => {
  const [dateFilter, setDateFilter] = useState("all");

  const { data, isLoading } = useRaffleAnalytics({ dateFilter });
  const analytics = data?.data?.analytics || {};

  const {
    totalRevenue = 0,
    totalTicketsSold = 0,
    totalPlayers = 0,
    totalItems = 0,
    totalWinners = 0,
    participationRate = 0,
    topItems = [],
  } = analytics;

  return (
    <Layout title="Raffle Analytics">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Raffle Analytics
              </h2>
              <p className="text-slate-300">
                Monitor performance and analyze raffle event statistics.
              </p>
            </div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-32 text-slate-400">
              Loading analytics...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-300 text-sm">Total Revenue</p>
                      <p className="text-white text-2xl font-bold">
                        ₦{totalRevenue.toLocaleString()}
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
                      <p className="text-green-300 text-sm">
                        Participation Rate
                      </p>
                      <p className="text-white text-2xl font-bold">
                        {participationRate}%
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
                      <p className="text-yellow-300 text-sm">Tickets Sold</p>
                      <p className="text-white text-2xl font-bold">
                        {totalTicketsSold.toLocaleString()}
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
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-300 text-sm">Unique Players</p>
                      <p className="text-white text-2xl font-bold">
                        {totalPlayers.toLocaleString()}
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
                    Top Performing Raffles
                  </h3>
                  {topItems.length === 0 ? (
                    <p className="text-slate-400 text-sm">No data available</p>
                  ) : (
                    <div className="space-y-3">
                      {topItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-3 bg-slate-600/50 rounded-lg"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {item.title}
                            </p>
                            <p className="text-slate-300 text-sm">
                              {item.ticketsSold.toLocaleString()} tickets sold
                            </p>
                          </div>
                          <div className="text-green-400 font-semibold">
                            ₦{item.revenue.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Summary Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-600/50 rounded-lg">
                      <p className="text-white font-medium">
                        Total Raffle Events
                      </p>
                      <div className="text-blue-400 font-semibold">
                        {totalItems}
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-600/50 rounded-lg">
                      <p className="text-white font-medium">Total Winners</p>
                      <div className="text-green-400 font-semibold">
                        {totalWinners}
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-600/50 rounded-lg">
                      <p className="text-white font-medium">Total Players</p>
                      <div className="text-purple-400 font-semibold">
                        {totalPlayers.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-600/50 rounded-lg">
                      <p className="text-white font-medium">Total Revenue</p>
                      <div className="text-yellow-400 font-semibold">
                        ₦{totalRevenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
