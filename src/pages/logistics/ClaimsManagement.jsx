import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import { useItems } from "../../hooks/queries/useRaffleQueries";
import { useItemClaims } from "../../hooks/queries/useLogisticsQueries";
import { formatDate } from "../../utils/format";

const ClaimsManagement = () => {
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  // Get closed/completed raffle items
  const { data: itemsData, isLoading: itemsLoading } = useItems({
    status: "closed",
    limit: 100,
  });

  // Get claims for selected item
  const {
    data: claimsData,
    isLoading: claimsLoading,
    refetch: refetchClaims,
  } = useItemClaims(selectedItemId, statusFilter, {
    enabled: !!selectedItemId,
  });

  const items = itemsData?.data || [];
  const claims = claimsData?.data?.claims || [];

  const getStatusColor = (status) => {
    const colors = {
      pending_verification:
        "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
      verified: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      approved: "bg-green-600/20 text-green-400 border-green-600/30",
      claimed: "bg-purple-600/20 text-purple-400 border-purple-600/30",
      expired: "bg-red-600/20 text-red-400 border-red-600/30",
    };
    return colors[status] || colors.pending_verification;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending_verification: "Pending Verification",
      verified: "Verified",
      approved: "Approved",
      claimed: "Claimed",
      expired: "Expired",
    };
    return labels[status] || status;
  };

  // Calculate statistics
  const stats = {
    total: claims.length,
    pending: claims.filter((c) => c.status === "pending_verification").length,
    verified: claims.filter((c) => c.status === "verified").length,
    approved: claims.filter((c) => c.status === "approved").length,
    claimed: claims.filter((c) => c.status === "claimed").length,
  };

  return (
    <Layout title="Claims Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Claims Management
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Manage winner claims and item pickups
              </p>
            </div>
            <button
              onClick={() => navigate("/logistics/verify-claim")}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Verify Claim
            </button>
          </div>
        </div>

        {/* Item Selector */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Select Raffle Item
              </label>
              <select
                value={selectedItemId || ""}
                onChange={(e) => {
                  setSelectedItemId(e.target.value || null);
                  setStatusFilter("");
                }}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an item...</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title} - {item.expected_winners} winner(s)
                  </option>
                ))}
              </select>
            </div>

            {selectedItemId && (
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Filter by Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="pending_verification">
                    Pending Verification
                  </option>
                  <option value="verified">Verified</option>
                  <option value="approved">Approved</option>
                  <option value="claimed">Claimed</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        {selectedItemId && !claimsLoading && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Statistics</h3>
              <button
                onClick={() => refetchClaims()}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Total Claims</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
                <p className="text-xs text-yellow-300 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {stats.pending}
                </p>
              </div>
              <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                <p className="text-xs text-blue-300 mb-1">Verified</p>
                <p className="text-2xl font-bold text-blue-400">
                  {stats.verified}
                </p>
              </div>
              <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                <p className="text-xs text-green-300 mb-1">Approved</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats.approved}
                </p>
              </div>
              <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
                <p className="text-xs text-purple-300 mb-1">Claimed</p>
                <p className="text-2xl font-bold text-purple-400">
                  {stats.claimed}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Claims List */}
        {selectedItemId ? (
          claimsLoading ? (
            <div className="flex items-center justify-center h-64 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-slate-300">Loading claims...</span>
            </div>
          ) : claims.length === 0 ? (
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-12 text-center">
              <svg
                className="w-16 h-16 text-slate-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="text-slate-400 text-lg">No claims found</div>
              <p className="text-slate-500 text-sm mt-2">
                {statusFilter
                  ? "Try changing the status filter"
                  : "No winners have initiated pickup yet"}
              </p>
            </div>
          ) : (
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="text-left text-xs font-medium text-slate-300 px-6 py-4">
                        Winner Details
                      </th>
                      <th className="text-left text-xs font-medium text-slate-300 px-6 py-4">
                        Ticket
                      </th>
                      <th className="text-left text-xs font-medium text-slate-300 px-6 py-4">
                        Pickup Code
                      </th>
                      <th className="text-left text-xs font-medium text-slate-300 px-6 py-4">
                        Pickup Date
                      </th>
                      <th className="text-left text-xs font-medium text-slate-300 px-6 py-4">
                        Status
                      </th>
                      <th className="text-left text-xs font-medium text-slate-300 px-6 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {claims.map((claim) => (
                      <tr
                        key={claim.id}
                        className="hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">
                              {claim.user?.name}
                            </p>
                            <p className="text-slate-400 text-sm">
                              {claim.user?.email}
                            </p>
                            {claim.user?.phone && (
                              <p className="text-slate-500 text-xs">
                                {claim.user.phone}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white font-mono">
                            {claim.ticket?.number}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-green-400 font-mono font-semibold">
                            {claim.pickup_code}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-300 text-sm">
                            {formatDate(claim.pickup_date)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              claim.status
                            )}`}
                          >
                            {getStatusLabel(claim.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              navigate(`/logistics/claims/${claim.id}`)
                            }
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-12 text-center">
            <svg
              className="w-16 h-16 text-slate-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <div className="text-slate-400 text-lg">Select a raffle item</div>
            <p className="text-slate-500 text-sm mt-2">
              Choose an item to view its claims
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClaimsManagement;
