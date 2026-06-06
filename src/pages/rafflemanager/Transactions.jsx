import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useRaffleTransactions } from "../../hooks/queries/useRaffleQueries";

const statusStyles = {
  Completed: "bg-green-600/20 text-green-400",
  Processing: "bg-yellow-600/20 text-yellow-400",
  Failed: "bg-red-600/20 text-red-400",
  Cancelled: "bg-slate-600/20 text-slate-400",
};

const Transactions = () => {
  const [dateFilter, setDateFilter] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useRaffleTransactions({ dateFilter, page });
  const summary = data?.data?.summary || {
    todaySales: 0,
    ticketsSold: 0,
    pendingPayouts: 0,
    commission: 0,
  };
  const transactions = data?.data?.transactions || [];
  const pagination = data?.data?.pagination || { total: 0, totalPages: 1 };

  return (
    <Layout title="Raffle Transactions">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Raffle Transactions
              </h2>
              <p className="text-slate-300">
                Monitor all raffle ticket purchases and prize payouts.
              </p>
            </div>
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Today's Sales</p>
                  <p className="text-white text-2xl font-bold">
                    ₦{summary.todaySales.toLocaleString()}
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
                  <p className="text-green-300 text-sm">Tickets Sold</p>
                  <p className="text-white text-2xl font-bold">
                    {summary.ticketsSold.toLocaleString()}
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
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">Pending Payouts</p>
                  <p className="text-white text-2xl font-bold">
                    ₦{summary.pendingPayouts.toLocaleString()}
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Commission</p>
                  <p className="text-white text-2xl font-bold">
                    ₦{summary.commission.toLocaleString()}
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

          {/* Transactions Table */}
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Recent Transactions
              <span className="text-slate-400 text-sm font-normal ml-2">
                ({pagination.total} total)
              </span>
            </h3>
            {isLoading ? (
              <div className="flex items-center justify-center h-32 text-slate-400">
                Loading transactions...
              </div>
            ) : transactions.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-slate-400">
                No transactions found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-slate-300 font-medium py-3 px-4">
                        Transaction ID
                      </th>
                      <th className="text-slate-300 font-medium py-3 px-4">
                        Type
                      </th>
                      <th className="text-slate-300 font-medium py-3 px-4">
                        Player
                      </th>
                      <th className="text-slate-300 font-medium py-3 px-4">
                        Amount
                      </th>
                      <th className="text-slate-300 font-medium py-3 px-4">
                        Date
                      </th>
                      <th className="text-slate-300 font-medium py-3 px-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr
                        key={txn.id}
                        className="border-b border-slate-600/50 hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="py-3 px-4 text-slate-300 font-mono text-sm">
                          {txn.transactionId || `TXN-${txn.id}`}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${txn.typeLabel === "Purchase" ? "bg-blue-600/20 text-blue-400" : "bg-green-600/20 text-green-400"}`}
                          >
                            {txn.typeLabel}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-white text-sm">{txn.user?.name}</p>
                          <p className="text-slate-400 text-xs">
                            {txn.user?.email}
                          </p>
                        </td>
                        <td
                          className={`py-3 px-4 font-semibold ${txn.typeLabel === "Purchase" ? "text-green-400" : "text-red-400"}`}
                        >
                          {txn.displayAmount}
                        </td>
                        <td className="py-3 px-4 text-slate-300 text-sm">
                          {new Date(txn.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${statusStyles[txn.statusLabel] || "bg-slate-600/20 text-slate-400"}`}
                          >
                            {txn.statusLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <p className="text-slate-400 text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 bg-slate-600 hover:bg-slate-500 disabled:opacity-40 text-white text-sm rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(pagination.totalPages, p + 1))
                    }
                    disabled={page === pagination.totalPages}
                    className="px-3 py-1 bg-slate-600 hover:bg-slate-500 disabled:opacity-40 text-white text-sm rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
