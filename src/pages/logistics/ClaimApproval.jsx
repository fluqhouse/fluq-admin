import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApproveClaimByToken } from "../../hooks/queries/useLogisticsQueries";

const ClaimApproval = () => {
  const { approvalToken } = useParams();
  const navigate = useNavigate();
  const [approvalResult, setApprovalResult] = useState(null);
  const approveClaimMutation = useApproveClaimByToken();

  useEffect(() => {
    if (approvalToken && !approvalResult) {
      handleApproval();
    }
  }, [approvalToken]);

  const handleApproval = async () => {
    try {
      const result = await approveClaimMutation.mutateAsync(approvalToken);
      setApprovalResult(result.data);
    } catch (error) {
      console.error("Approval error:", error);
      setApprovalResult({ error: true });
    }
  };

  if (approveClaimMutation.isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Approving Your Claim
          </h2>
          <p className="text-slate-400">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!approvalResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 text-center">
          <div className="text-slate-400">Processing...</div>
        </div>
      </div>
    );
  }

  if (approvalResult.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
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
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Approval Failed
            </h2>
            <p className="text-slate-400 mb-6">
              The approval link is invalid, expired, or the claim has already
              been approved.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg
              className="w-8 h-8 text-white"
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

          <h2 className="text-3xl font-bold text-white mb-4">
            🎉 Claim Approved!
          </h2>

          <p className="text-slate-300 mb-6">
            Congratulations! Your claim has been successfully approved.
          </p>

          {/* Claim Details */}
          <div className="bg-slate-700/50 rounded-xl p-6 mb-6 space-y-4 text-left">
            <div>
              <p className="text-xs text-slate-400 mb-1">Item Won</p>
              <p className="text-white font-semibold text-lg">
                {approvalResult.item_title}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Winning Ticket</p>
                <p className="text-green-400 font-mono font-bold">
                  {approvalResult.ticket_number}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Pickup Code</p>
                <p className="text-blue-400 font-mono font-bold text-lg">
                  {approvalResult.pickup_code}
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-4 mb-6">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Next Steps
            </h3>
            <ol className="text-left text-sm text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <span>
                  Keep your <strong>pickup code</strong> safe - you'll need it
                  to collect your prize
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <span>
                  Visit the collection point at your scheduled pickup time
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <span>
                  Present your pickup code and a valid ID to claim your prize
                </span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => window.print()}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
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
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print This Page
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Homepage
            </button>
          </div>

          {/* Note */}
          <p className="text-slate-500 text-xs mt-6">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClaimApproval;
