import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useAllWalletTransactions } from "../../hooks/queries/useWalletQueries";
import {
  Search,
  Filter,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const WalletTransactions = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const {
    data: transactionsData,
    isLoading: loading,
    error: queryError,
    refetch: fetchTransactions,
  } = useAllWalletTransactions({
    page,
    limit: 15,
    ...(searchQuery && { search: searchQuery }),
    ...(statusFilter !== "all" && { status: statusFilter }),
    ...(typeFilter !== "all" && { type: typeFilter }),
  });

  const transactions = transactionsData?.data?.transactions || [];
  const totalPages = transactionsData?.data?.pagination?.totalPages || 1;
  const error = queryError?.message || null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(searchTerm);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400";
      case "failed":
        return "bg-red-500/10 text-red-400";
      case "cancelled":
        return "bg-slate-500/10 text-slate-400";
      default:
        return "bg-slate-500/10 text-slate-400";
    }
  };

  const getTypeIcon = (type) => {
    const isCredit =
      [
        "funding",
        "refund",
        "commission",
        "bonus",
        "game_win",
        "manual_credit",
      ].includes(type) || type?.includes("credit");
    return isCredit ? (
      <ArrowUpRight className="w-4 h-4 text-green-400" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-red-400" />
    );
  };

  return (
    <Layout title="Wallet Transactions">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Wallet Transactions
              </h2>
              <p className="text-slate-400">
                Global overview of all wallet activities.
              </p>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by reference, narration, or user info..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </form>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="funding">Funding</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="game_play">Game Play</option>
                <option value="game_win">Game Win</option>
                <option value="manual_credit">Manual Credit</option>
                <option value="manual_debit">Manual Debit</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="overflow-x-auto bg-slate-900/50 rounded-lg border border-slate-700/50">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400 border-b border-slate-700/50">
                <tr>
                  <th className="px-6 py-4">Transaction</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Balance After</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-slate-400"
                    >
                      Loading transactions...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-slate-400"
                    >
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                            {getTypeIcon(tx.type)}
                          </div>
                          <div>
                            <div
                              className="font-medium text-white max-w-[200px] truncate"
                              title={tx.narration || tx.description}
                            >
                              {tx.narration ||
                                tx.description ||
                                tx.type.replace("_", " ").toUpperCase()}
                            </div>
                            <div className="text-xs text-slate-400 font-mono">
                              {tx.reference ||
                                tx.transaction_id.substring(0, 10) + "..."}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-white font-medium">
                          {tx.user?.first_name} {tx.user?.last_name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {tx.user?.email || "No email"}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">
                        <div className="flex items-center gap-1">
                          {getTypeIcon(tx.type)}₦
                          {parseFloat(tx.amount).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-300">
                        ₦
                        {parseFloat(tx.balance_after || 0).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2 },
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}
                        >
                          {tx.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">
                        {new Date(tx.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-slate-400">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-50 hover:bg-slate-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-50 hover:bg-slate-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WalletTransactions;
