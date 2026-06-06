import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useClaimApprovalStatus,
  useProcessClaimHandover,
  useResendPickupCode,
} from "../../hooks/queries/useLogisticsQueries";
import { formatDate } from "../../utils/format";
import ConfirmationModal from "../../components/dashboard/reuseables/ConfirmationModal";

const ClaimDetail = () => {
  const { claimId } = useParams();
  const navigate = useNavigate();
  const [handoverNotes, setHandoverNotes] = useState("");
  const [showHandoverModal, setShowHandoverModal] = useState(false);

  const {
    data: claimData,
    isLoading,
    error,
    refetch,
  } = useClaimApprovalStatus(claimId, {
    autoRefresh: true, // Auto-refresh every 10s
  });

  const processHandoverMutation = useProcessClaimHandover();
  const resendCodeMutation = useResendPickupCode();

  const claim = claimData?.data;

  const handleProcessHandover = async () => {
    try {
      await processHandoverMutation.mutateAsync({
        claimId: parseInt(claimId),
        data: { notes: handoverNotes },
      });
      setShowHandoverModal(false);
      setTimeout(() => {
        navigate("/logistics/claims");
      }, 2000);
    } catch (error) {
      console.error("Handover error:", error);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendCodeMutation.mutateAsync({
        itemId: claim.item.id,
        identifier: claim.user.email,
      });
    } catch (error) {
      console.error("Resend code error:", error);
    }
  };

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
      verified: "Verified (Awaiting User Approval)",
      approved: "Approved (Ready for Handover)",
      claimed: "Claimed (Completed)",
      expired: "Expired",
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <Layout title="Claim Details">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-slate-300">Loading claim details...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Claim Details">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-2">
              Error loading claim details
            </div>
            <button
              onClick={() => refetch()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!claim) {
    return (
      <Layout title="Claim Details">
        <div className="text-center text-slate-400 py-12">Claim not found</div>
      </Layout>
    );
  }

  return (
    <Layout title="Claim Details">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Claim #{claim.claim_id}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Claim details and handover management
              </p>
            </div>
            <button
              onClick={() => navigate("/logistics/claims")}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
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

          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                claim.status
              )}`}
            >
              {getStatusLabel(claim.status)}
            </span>
            {claim.is_approved && (
              <span className="px-3 py-1 rounded-full text-sm font-medium border bg-green-600/20 text-green-400 border-green-600/30">
                ✓ User Approved
              </span>
            )}
          </div>
        </div>

        {/* Winner Information */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Winner Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Name</p>
              <p className="text-white font-medium">{claim.user.name}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Email</p>
              <p className="text-white">{claim.user.email}</p>
            </div>
            {claim.user.user_id && (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">User ID</p>
                <p className="text-white font-mono">{claim.user.user_id}</p>
              </div>
            )}
          </div>
        </div>

        {/* Item & Ticket Information */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Prize Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Item</p>
              <p className="text-white font-medium">{claim.item.title}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Winning Ticket</p>
              <p className="text-green-400 font-mono font-semibold">
                {claim.ticket.number}
              </p>
            </div>
          </div>
        </div>

        {/* Pickup Information */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Pickup Information
            </h3>
            <button
              onClick={handleResendCode}
              disabled={resendCodeMutation.isPending}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium disabled:opacity-50"
            >
              {resendCodeMutation.isPending ? "Sending..." : "Resend Code"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Pickup Code</p>
              <p className="text-green-400 font-mono text-2xl font-bold">
                {claim.pickup_code}
              </p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">Pickup Date</p>
              <p className="text-white font-medium">
                {formatDate(claim.pickup_date)}
              </p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-1">
                Verification Attempts
              </p>
              <p className="text-white">{claim.verification_attempts}</p>
            </div>
            {claim.last_verification_attempt && (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Last Verification</p>
                <p className="text-white text-sm">
                  {formatDate(claim.last_verification_attempt)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Approval Timeline */}
        {claim.approved_at && (
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5"></div>
                <div className="flex-1">
                  <p className="text-white font-medium">Claim Verified</p>
                  <p className="text-slate-400 text-sm">
                    {formatDate(claim.last_verification_attempt)}
                  </p>
                </div>
              </div>
              {claim.approved_at && (
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">User Approved</p>
                    <p className="text-slate-400 text-sm">
                      {formatDate(claim.approved_at)}
                    </p>
                  </div>
                </div>
              )}
              {claim.status === "claimed" && (
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Item Claimed</p>
                    <p className="text-slate-400 text-sm">Completed</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {claim.status === "approved" && claim.can_claim && (
          <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-400 mb-1">
                  Ready for Handover
                </h3>
                <p className="text-slate-300 text-sm">
                  The winner has approved their claim. You can now proceed with
                  the final handover.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowHandoverModal(true)}
              className="w-full bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Process Final Handover
            </button>
          </div>
        )}

        {claim.status === "verified" && !claim.is_approved && (
          <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white animate-pulse"
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
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-400 mb-1">
                  Awaiting User Approval
                </h3>
                <p className="text-slate-300 text-sm">
                  An approval email has been sent to {claim.user.email}. The
                  winner must click the approval link before you can hand over
                  the item.
                </p>
                <p className="text-slate-400 text-xs mt-2">
                  This page will automatically update when the user approves.
                </p>
              </div>
            </div>
          </div>
        )}

        {claim.status === "claimed" && (
          <div className="bg-purple-600/10 border border-purple-600/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-400 mb-1">
                  Item Claimed
                </h3>
                <p className="text-slate-300 text-sm">
                  This claim has been completed. The item has been handed over
                  to the winner.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Handover Modal */}
      <ConfirmationModal
        isOpen={showHandoverModal}
        onClose={() => setShowHandoverModal(false)}
        onConfirm={handleProcessHandover}
        isLoading={processHandoverMutation.isPending}
        title="Process Final Handover"
        type="success"
        confirmText="Complete Handover"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            You are about to complete the final handover for:
          </p>
          <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
            <p className="text-white">
              <span className="text-slate-400">Winner:</span>{" "}
              <strong>{claim.user.name}</strong>
            </p>
            <p className="text-white">
              <span className="text-slate-400">Item:</span>{" "}
              <strong>{claim.item.title}</strong>
            </p>
            <p className="text-white">
              <span className="text-slate-400">Ticket:</span>{" "}
              <strong className="font-mono">{claim.ticket.number}</strong>
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Handover Notes (Optional)
            </label>
            <textarea
              value={handoverNotes}
              onChange={(e) => setHandoverNotes(e.target.value)}
              placeholder="Add any notes about the handover (e.g., ID verified, item condition, etc.)"
              rows={4}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="text-slate-400 text-sm">
            This action will mark the claim as completed and send a final
            confirmation to the winner.
          </p>
        </div>
      </ConfirmationModal>
    </Layout>
  );
};

export default ClaimDetail;
