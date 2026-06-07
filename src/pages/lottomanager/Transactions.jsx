import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useLottoTransactions,
  useLottoTransactionDetail,
} from "../../hooks/queries/useLottoQueries";
import { formatCurrency, formatDate, formatNumber } from "../../utils/format";

// ─── Helpers ───────────────────────────────────────────────────────────────────
const TYPE_CFG = {
  Purchase: { cls: "bg-green-600/20 text-green-400", icon: "↑" },
  Payout: { cls: "bg-blue-600/20 text-blue-400", icon: "↓" },
  Refund: { cls: "bg-orange-600/20 text-orange-400", icon: "↺" },
};

const STATUS_CFG = {
  Completed: "bg-green-600/20 text-green-400",
  Processing: "bg-yellow-600/20 text-yellow-400",
  Failed: "bg-red-600/20 text-red-400",
  Cancelled: "bg-gray-600/20 text-gray-400",
};

const TypeBadge = ({ label }) => {
  const cfg = TYPE_CFG[label] || {
    cls: "bg-slate-600/20 text-slate-400",
    icon: "•",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${cfg.cls}`}>
      {cfg.icon} {label}
    </span>
  );
};

const StatusBadge = ({ label }) => (
  <span
    className={`px-2 py-1 text-xs rounded-full font-medium ${STATUS_CFG[label] || "bg-slate-600/20 text-slate-400"}`}
  >
    {label}
  </span>
);

// ─── Transaction Detail Modal ─────────────────────────────────────────────────
const TransactionDetailModal = ({ transactionId, onClose }) => {
  const { data, isLoading } = useLottoTransactionDetail(transactionId);
  const txn = data?.data?.transaction;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800/80 border-b border-slate-700 px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold">Transaction Details</h3>
            {txn && (
              <p className="text-slate-400 text-xs font-mono mt-0.5">
                {txn.transactionId}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-24">
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500" />
              <span className="ml-2 text-slate-400 text-sm">Loading...</span>
            </div>
          ) : txn ? (
            <>
              {/* Amount + type */}
              <div className="text-center py-4 border-b border-slate-700">
                <p
                  className={`text-3xl font-bold ${txn.type === "game_play" ? "text-green-400" : "text-red-400"}`}
                >
                  {txn.displayAmount}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <TypeBadge label={txn.typeLabel} />
                  <StatusBadge label={txn.statusLabel} />
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "User", value: txn.user?.name },
                  { label: "Email", value: txn.user?.email },
                  { label: "Game", value: txn.game?.title || "—" },
                  { label: "Fee", value: formatCurrency(txn.fee) },
                  {
                    label: "Balance Before",
                    value: formatCurrency(txn.balanceBefore),
                  },
                  {
                    label: "Balance After",
                    value: formatCurrency(txn.balanceAfter),
                  },
                  { label: "Method", value: txn.paymentMethod || "—" },
                  {
                    label: "Date",
                    value: txn.createdAt
                      ? formatDate(txn.createdAt)
                      : "—",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-slate-400 text-xs">{label}</p>
                    <p className="text-white text-sm font-medium mt-0.5 break-all">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {txn.narration && (
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-slate-400 text-xs">Narration</p>
                  <p className="text-white text-sm mt-0.5">{txn.narration}</p>
                </div>
              )}

              {txn.ticket && (
                <div className="bg-indigo-600/10 border border-indigo-600/20 rounded-lg p-3">
                  <p className="text-indigo-300 text-xs font-semibold mb-2">
                    🎟 Ticket Info
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-slate-400 text-xs">Ticket ID</p>
                      <p className="text-white font-mono text-xs">
                        {txn.ticket.ticketId}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Status</p>
                      <p className="text-white">{txn.ticket.status}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Amount</p>
                      <p className="text-white">
                        {formatCurrency(txn.ticket.totalAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Winnings</p>
                      <p className="text-green-400 font-semibold">
                        {formatCurrency(txn.ticket.winnings)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-slate-400 text-center py-8">
              Transaction not found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Summary Card ─────────────────────────────────────────────────────────────
const SummaryCard = ({ label, value, colorClass, iconPath }) => (
  <div className={`border rounded-lg p-4 ${colorClass}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{label}</p>
        <p className="text-white text-2xl font-bold mt-1">{value}</p>
      </div>
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
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
            d={iconPath}
          />
        </svg>
      </div>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const Transactions = () => {
  const [page, setPage] = useState(1);
  const [typeFilter, setType] = useState("");
  const [statusFilter, setStatus] = useState("");
  const [dateFilter, setDate] = useState("today");
  const [selectedTxnId, setSelectedTxnId] = useState(null);

  const { data, isLoading, error, refetch } = useLottoTransactions({
    page,
    limit: 20,
    type: typeFilter || undefined,
    status: statusFilter || undefined,
    dateFilter: dateFilter || undefined,
  });

  const summary = data?.data?.summary || {};
  const transactions = data?.data?.transactions || [];
  const pagination = data?.data?.pagination || {};

  // ── Export CSV ───────────────────────────────────────────────────────────────
  const handleExport = () => {
    if (!transactions.length) return;
    const headers = [
      "Transaction ID",
      "Type",
      "User",
      "Email",
      "Game",
      "Amount",
      "Fee",
      "Status",
      "Date",
    ];
    const rows = transactions.map((t) => [
      t.transactionId,
      t.typeLabel,
      t.user?.name,
      t.user?.email,
      t.game?.title,
      t.displayAmount,
      t.fee,
      t.statusLabel,
      formatDate(t.createdAt),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${v ?? ""}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lotto-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout title="Transactions">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          {/* ── Header ── */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Lotto Transactions
              </h2>
              <p className="text-slate-300">
                Monitor all lotto-related financial transactions and payouts.
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={!transactions.length}
              className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Export Report
            </button>
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <SummaryCard
              label="Today's Revenue"
              value={
                isLoading ? "…" : formatCurrency(summary.todayRevenue ?? 0)
              }
              colorClass="bg-green-600/20 border-green-500/30"
              iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
            <SummaryCard
              label="Pending Payouts"
              value={
                isLoading ? "…" : formatCurrency(summary.pendingPayouts ?? 0)
              }
              colorClass="bg-blue-600/20 border-blue-500/30"
              iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <SummaryCard
              label="Total Transactions"
              value={
                isLoading
                  ? "…"
                  : formatNumber(summary.totalTransactions ?? 0)
              }
              colorClass="bg-purple-600/20 border-purple-500/30"
              iconPath="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
            <SummaryCard
              label="Processing Fees"
              value={
                isLoading ? "…" : formatCurrency(summary.processingFees ?? 0)
              }
              colorClass="bg-orange-600/20 border-orange-500/30"
              iconPath="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </div>

          {/* ── Recent Transactions table ── */}
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-white">
                Recent Transactions
              </h3>
              <div className="flex flex-wrap gap-2">
                {/* Type filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => {
                    setType(e.target.value);
                    setPage(1);
                  }}
                  className="bg-slate-600 text-white px-3 py-1 rounded border border-slate-500 text-sm"
                >
                  <option value="">All Types</option>
                  <option value="game_play">Ticket Purchase</option>
                  <option value="game_win">Prize Payout</option>
                  <option value="refund">Refund</option>
                </select>
                {/* Date filter */}
                <select
                  value={dateFilter}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setPage(1);
                  }}
                  className="bg-slate-600 text-white px-3 py-1 rounded border border-slate-500 text-sm"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="">All Time</option>
                </select>
                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className="bg-slate-600 text-white px-3 py-1 rounded border border-slate-500 text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Processing</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => refetch()}
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-slate-300 text-sm rounded border border-slate-500 transition-colors"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-3 mb-3">
                <p className="text-red-400 text-sm">
                  Failed to load transactions. Please try again.
                </p>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="flex items-center justify-center h-28">
                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500" />
                <span className="ml-2 text-slate-400 text-sm">
                  Loading transactions…
                </span>
              </div>
            )}

            {/* Table */}
            {!isLoading && transactions.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-600">
                      {[
                        "Transaction ID",
                        "Type",
                        "User",
                        "Game",
                        "Amount",
                        "Status",
                        "Date",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-slate-300 font-medium py-3 px-4 text-sm whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr
                        key={txn.id}
                        className="border-b border-slate-600/60 hover:bg-slate-700/20 transition-colors"
                      >
                        <td className="py-3 px-4 text-blue-400 font-mono text-sm whitespace-nowrap">
                          {txn.transactionId}
                        </td>
                        <td className="py-3 px-4">
                          <TypeBadge label={txn.typeLabel} />
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-white font-medium text-sm">
                              {txn.user?.name}
                            </p>
                            <p className="text-slate-400 text-xs">
                              {txn.user?.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300 text-sm">
                          {txn.game?.title || "—"}
                        </td>
                        <td
                          className={`py-3 px-4 font-semibold text-sm ${txn.type === "game_play" ? "text-green-400" : "text-red-400"}`}
                        >
                          {txn.displayAmount}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge label={txn.statusLabel} />
                        </td>
                        <td className="py-3 px-4 text-slate-300 text-sm whitespace-nowrap">
                          {formatDate(txn.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setSelectedTxnId(txn.transactionId)}
                            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && transactions.length === 0 && !error && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-slate-400 font-medium">
                  No transactions found
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  Try changing the filters above.
                </p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-600">
                <p className="text-sm text-slate-400">
                  {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}–
                  {Math.min(
                    pagination.currentPage * pagination.itemsPerPage,
                    pagination.totalItems,
                  )}{" "}
                  of {pagination.totalItems} transactions
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={!pagination.hasPreviousPage}
                    className="px-3 py-1.5 bg-slate-600 text-white rounded-lg disabled:opacity-40 hover:bg-slate-500 transition-colors text-sm"
                  >
                    ← Prev
                  </button>
                  <span className="px-3 py-1.5 text-slate-400 text-sm">
                    {pagination.currentPage} / {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-3 py-1.5 bg-slate-600 text-white rounded-lg disabled:opacity-40 hover:bg-slate-500 transition-colors text-sm"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTxnId && (
        <TransactionDetailModal
          transactionId={selectedTxnId}
          onClose={() => setSelectedTxnId(null)}
        />
      )}
    </Layout>
  );
};

export default Transactions;
