import api from "./axios.js";

export const logisticsAPI = {
  // Claims Management endpoints

  /**
   * Verify claim when user comes to pickup
   * @param {Object} data - { identifier, pickupCode, itemId }
   */
  verifyClaim: async (data) => {
    const response = await api.post("/api/raffle/claims/verify-claim", data);
    return response.data;
  },

  /**
   * Approve claim via email token (user clicks link in email)
   * @param {string} approvalToken - Token from email link
   */
  approveClaimByToken: async (approvalToken) => {
    const response = await api.post(
      `/api/raffle/claims/approve-claim/${approvalToken}`
    );
    return response.data;
  },

  /**
   * Check if claim has been approved by user
   * @param {number} claimId - Claim ID to check
   */
  getClaimApprovalStatus: async (claimId) => {
    const response = await api.get(
      `/api/raffle/claims/claim-approval/${claimId}`
    );
    return response.data;
  },

  /**
   * Process final claim handover (admin hands over item)
   * @param {number} claimId - Claim ID
   * @param {Object} data - { notes }
   */
  processClaimHandover: async (claimId, data) => {
    const response = await api.post(
      `/api/raffle/claims/process-claim/${claimId}`,
      data
    );
    return response.data;
  },

  /**
   * Get all claims for a specific raffle item
   * @param {number} itemId - Item ID
   * @param {string} status - Filter by status (optional)
   */
  getItemClaims: async (itemId, status = null) => {
    const queryParams = new URLSearchParams();
    if (status) queryParams.append("status", status);

    const response = await api.get(
      `/api/raffle/claims/${itemId}${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`
    );
    return response.data;
  },

  /**
   * Resend pickup code to a winner
   * @param {Object} data - { itemId, identifier }
   */
  resendPickupCode: async (data) => {
    const response = await api.post(
      "/api/raffle/claims/resend-pickup-code",
      data
    );
    return response.data;
  },
};
