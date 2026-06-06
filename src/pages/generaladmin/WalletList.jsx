import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import useAuth from "../../hooks/useAuth";
import {
  useWalletStatistics,
  useAllWallets,
  useFreezeWallet,
  useUnfreezeWallet,
  useManualCredit,
  useManualDebit,
} from "../../hooks/queries/useWalletQueries";
import {
  Search,
  Filter,
  MoreVertical,
  Lock,
  Unlock,
  PlusCircle,
  MinusCircle,
  AlertCircle,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
// We might not have these ui components exported perfectly in the same path,
// so I'm using generic tailwind approaches for modals.

const WalletList = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "superadmin";

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: statsData,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useWalletStatistics();
  const stats = statsData?.data;

  const {
    data: walletsData,
    isLoading: loading,
    error: queryError,
    refetch: refetchWallets,
  } = useAllWallets({
    page,
    limit: 10,
    ...(searchQuery && { search: searchQuery }),
    ...(statusFilter !== "all" && { status: statusFilter }),
  });

  const wallets = walletsData?.data?.wallets || [];
  const totalPages = walletsData?.data?.pagination?.totalPages || 1;
  const error = queryError?.message || null;

  const freezeMutation = useFreezeWallet();
  const unfreezeMutation = useUnfreezeWallet();
  const creditMutation = useManualCredit();
  const debitMutation = useManualDebit();

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'freeze', 'unfreeze', 'credit', 'debit'
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [actionData, setActionData] = useState({ amount: "", description: "" });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(searchTerm);
  };

  const openModal = (type, wallet) => {
    setActiveModal(type);
    setSelectedWallet(wallet);
    setActionData({ amount: "", description: "" });
  };

  const closeModal = () => {
    const isPending =
      freezeMutation.isPending ||
      unfreezeMutation.isPending ||
      creditMutation.isPending ||
      debitMutation.isPending;
    if (!isPending) {
      setActiveModal(null);
      setSelectedWallet(null);
    }
  };

  const handleActionSubmit = async (e) => {
    e.preventDefault();

    const mutationOptions = {
      onSuccess: () => {
        closeModal();
      },
    };

    if (activeModal === "freeze") {
      freezeMutation.mutate(
        {
          walletId: selectedWallet.id,
          data: { reason: actionData.description },
        },
        mutationOptions,
      );
    } else if (activeModal === "unfreeze") {
      unfreezeMutation.mutate(
        {
          walletId: selectedWallet.id,
          data: { reason: actionData.description },
        },
        mutationOptions,
      );
    } else if (activeModal === "credit") {
      creditMutation.mutate(
        {
          walletId: selectedWallet.id,
          data: {
            amount: parseFloat(actionData.amount),
            description: actionData.description,
          },
        },
        mutationOptions,
      );
    } else if (activeModal === "debit") {
      debitMutation.mutate(
        {
          walletId: selectedWallet.id,
          data: {
            amount: parseFloat(actionData.amount),
            description: actionData.description,
          },
        },
        mutationOptions,
      );
    }
  };

  return (
    <Layout title="Wallet Management">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">User Wallets</h2>
              <p className="text-slate-400">
                View and manage all customer wallets in the system.
              </p>
            </div>
            <button
              onClick={() => {
                fetchWallets();
                fetchStats();
              }}
              disabled={loading || statsLoading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading || statsLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {statsLoading && !stats ? (
              [1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 h-32"
                ></div>
              ))
            ) : stats ? (
              <>
                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Wallet className="w-16 h-16 text-blue-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-blue-400" />
                      </div>
                      <p className="text-slate-400 font-medium">
                        System Total Balance
                      </p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {typeof stats.total_platform_balance === "number"
                        ? `₦${stats.total_platform_balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : "₦0.00"}
                    </h3>
                  </div>
                </div>

                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CreditCard className="w-16 h-16 text-purple-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-purple-400" />
                      </div>
                      <p className="text-slate-400 font-medium">
                        Total Wallets
                      </p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {stats.total_wallets?.toLocaleString() || 0}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {stats.active_wallets || 0} active •{" "}
                      {stats.frozen_wallets || 0} frozen
                    </p>
                  </div>
                </div>

                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 relative overflow-hidden group hover:border-green-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ArrowUpRight className="w-16 h-16 text-green-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-slate-400 font-medium">
                        Today's Deposits
                      </p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {typeof stats.today_deposits === "number"
                        ? `₦${stats.today_deposits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : "₦0.00"}
                    </h3>
                  </div>
                </div>

                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ArrowDownRight className="w-16 h-16 text-red-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                      </div>
                      <p className="text-slate-400 font-medium">
                        Today's Withdrawals
                      </p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {typeof stats.today_withdrawals === "number"
                        ? `₦${stats.today_withdrawals.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : "₦0.00"}
                    </h3>
                  </div>
                </div>

                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <AlertCircle className="w-16 h-16 text-yellow-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                      </div>
                      <p className="text-slate-400 font-medium">
                        Pending Withdrawals
                      </p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {stats.pending_withdrawals || 0}
                    </h3>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or user ID..."
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
                <option value="active">Active</option>
                <option value="frozen">Frozen</option>
              </select>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto bg-slate-900/50 rounded-lg border border-slate-700/50">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400 border-b border-slate-700/50">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Balance</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-slate-400"
                    >
                      Loading wallets...
                    </td>
                  </tr>
                ) : wallets.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-slate-400"
                    >
                      No wallets found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  wallets.map((wallet) => (
                    <tr
                      key={wallet.id}
                      className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
                            {wallet.user?.first_name?.[0] || "?"}
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {wallet.user?.first_name} {wallet.user?.last_name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {wallet.user?.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">
                        ₦
                        {parseFloat(wallet.balance).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            wallet.is_active
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {wallet.is_active ? "ACTIVE" : "FROZEN"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                        {new Date(wallet.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isSuperAdmin && (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openModal("credit", wallet)}
                              title="Manual Credit"
                              className="p-1.5 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                            >
                              <PlusCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openModal("debit", wallet)}
                              title="Manual Debit"
                              className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            >
                              <MinusCircle className="w-5 h-5" />
                            </button>
                            {wallet.is_active ? (
                              <button
                                onClick={() => openModal("freeze", wallet)}
                                title="Freeze Wallet"
                                className="p-1.5 text-orange-400 hover:bg-orange-400/10 rounded-lg transition-colors"
                              >
                                <Unlock className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => openModal("unfreeze", wallet)}
                                title="Unfreeze Wallet"
                                className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                              >
                                <Lock className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        )}
                        {!isSuperAdmin && (
                          <span className="text-xs text-slate-500 border border-slate-700 rounded px-2 py-1">
                            View Only
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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

      {/* Action Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-xl max-w-md w-full border border-slate-700 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 capitalize">
              {activeModal.replace("-", " ")} Wallet
            </h3>

            {selectedWallet && (
              <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400">User</p>
                <p className="text-white font-medium">
                  {selectedWallet.user?.first_name}{" "}
                  {selectedWallet.user?.last_name}
                </p>
                <p className="text-sm text-slate-400 mt-2">Current Balance</p>
                <p className="text-xl font-bold text-white">
                  ₦
                  {parseFloat(selectedWallet.balance).toLocaleString(
                    undefined,
                    { minimumFractionDigits: 2 },
                  )}
                </p>
              </div>
            )}

            {/* Toasts handle errors and successes now, so we removed the inline alert messages */}

            <form onSubmit={handleActionSubmit} className="space-y-4">
              {["credit", "debit"].includes(activeModal) && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Amount (₦)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={actionData.amount}
                    onChange={(e) =>
                      setActionData({ ...actionData, amount: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Enter amount"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  {["freeze", "unfreeze"].includes(activeModal)
                    ? "Reason for " + activeModal
                    : "Description / Narration"}
                </label>
                <textarea
                  required
                  value={actionData.description}
                  onChange={(e) =>
                    setActionData({
                      ...actionData,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none min-h-[100px]"
                  placeholder={`Enter reason/description...`}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={
                    freezeMutation.isPending ||
                    unfreezeMutation.isPending ||
                    creditMutation.isPending ||
                    debitMutation.isPending
                  }
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    freezeMutation.isPending ||
                    unfreezeMutation.isPending ||
                    creditMutation.isPending ||
                    debitMutation.isPending
                  }
                  className={`px-4 py-2 rounded-lg text-white transition-colors flex items-center justify-center min-w-[100px] ${
                    activeModal === "credit" || activeModal === "unfreeze"
                      ? "bg-blue-600 hover:bg-blue-500"
                      : activeModal === "freeze"
                        ? "bg-orange-600 hover:bg-orange-500"
                        : "bg-red-600 hover:bg-red-500"
                  } disabled:opacity-50`}
                >
                  {freezeMutation.isPending ||
                  unfreezeMutation.isPending ||
                  creditMutation.isPending ||
                  debitMutation.isPending
                    ? "Processing..."
                    : `Confirm ${activeModal.charAt(0).toUpperCase() + activeModal.slice(1)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default WalletList;
