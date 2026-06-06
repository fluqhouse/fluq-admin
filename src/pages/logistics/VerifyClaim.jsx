import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/dashboard/layouts/Layout";
import { useItems } from "../../hooks/queries/useRaffleQueries";
import { useVerifyClaim } from "../../hooks/queries/useLogisticsQueries";

const VerifyClaim = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemId: "",
    identifier: "",
    pickupCode: "",
  });
  const [verificationResult, setVerificationResult] = useState(null);

  const { data: itemsData } = useItems({ status: "closed", limit: 100 });
  const verifyClaimMutation = useVerifyClaim();

  const items = itemsData?.data || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVerificationResult(null);

    try {
      const result = await verifyClaimMutation.mutateAsync({
        itemId: parseInt(formData.itemId),
        identifier: formData.identifier.trim(),
        pickupCode: formData.pickupCode.trim().toUpperCase(),
      });

      setVerificationResult(result.data);

      // Clear form on success
      setFormData({
        itemId: formData.itemId,
        identifier: "",
        pickupCode: "",
      });
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      itemId: "",
      identifier: "",
      pickupCode: "",
    });
    setVerificationResult(null);
  };

  return (
    <Layout title="Verify Claim">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Verify Claim</h2>
              <p className="text-slate-400 text-sm mt-1">
                Verify winner's identity and pickup code
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
        </div>

        {/* Verification Form */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Raffle Item <span className="text-red-400">*</span>
              </label>
              <select
                name="itemId"
                value={formData.itemId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select raffle item...</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Winner Identifier */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Winner Identifier (Email/Phone/User ID){" "}
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                placeholder="Enter email, phone, or user ID"
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                Enter the winner's email address, phone number, or user ID
              </p>
            </div>

            {/* Pickup Code */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Pickup Code <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="pickupCode"
                value={formData.pickupCode}
                onChange={handleInputChange}
                placeholder="Enter 6-character pickup code"
                required
                maxLength={6}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 font-mono text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              />
              <p className="text-xs text-slate-500 mt-1">
                The 6-character code provided by the winner
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={verifyClaimMutation.isPending}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {verifyClaimMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify Claim"
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-400 mb-4">
                  ✓ Claim Verified Successfully
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Winner</p>
                    <p className="text-white font-medium">
                      {verificationResult.user?.name}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {verificationResult.user?.email}
                    </p>
                    {verificationResult.user?.phone && (
                      <p className="text-slate-500 text-sm">
                        {verificationResult.user.phone}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="text-xs text-slate-400 mb-1">Item</p>
                      <p className="text-white font-medium">
                        {verificationResult.item?.title}
                      </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="text-xs text-slate-400 mb-1">Ticket</p>
                      <p className="text-white font-mono">
                        {verificationResult.ticket?.number}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                    <p className="text-blue-300 text-sm mb-2">
                      📧 Approval email has been sent to the winner
                    </p>
                    <p className="text-slate-400 text-xs">
                      The winner must approve their claim via email before you
                      can hand over the item.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/logistics/claims/${verificationResult.claim_id}`
                      )
                    }
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors mt-4"
                  >
                    View Claim Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Verification Process
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                1
              </div>
              <div>
                <p className="text-white font-medium">Collect Information</p>
                <p className="text-slate-400 text-sm">
                  Ask the winner for their email/phone and pickup code
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                2
              </div>
              <div>
                <p className="text-white font-medium">Verify Identity</p>
                <p className="text-slate-400 text-sm">
                  Enter the details and verify the claim
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                3
              </div>
              <div>
                <p className="text-white font-medium">Wait for Approval</p>
                <p className="text-slate-400 text-sm">
                  Winner will receive an email to approve the claim
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                4
              </div>
              <div>
                <p className="text-white font-medium">Final Handover</p>
                <p className="text-slate-400 text-sm">
                  Once approved, proceed to hand over the item
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyClaim;
