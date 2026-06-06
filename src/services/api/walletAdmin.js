// 📁 src/services/api/walletAdmin.js
import axiosInstance from "./axios";

export const walletAdminService = {
  /**
   * Get overall wallet statistics
   * @returns {Promise}
   */
  getStatistics: async () => {
    const response = await axiosInstance.get("/api/wallet/admin/statistics");
    return response.data;
  },

  /**
   * Get all user wallets with pagination and filtering
   * @param {Object} params - Query parameters (page, limit, status, search)
   * @returns {Promise}
   */
  getAllWallets: async (params = {}) => {
    const response = await axiosInstance.get("/api/wallet/admin/wallets", {
      params,
    });
    return response.data;
  },

  /**
   * Get a specific user's wallet overview
   * @param {string} userId - ID of the user
   * @returns {Promise}
   */
  getUserWallet: async (userId) => {
    const response = await axiosInstance.get(`/api/wallet/admin/wallets/${userId}`);
    return response.data;
  },

  /**
   * Superadmin: Freeze a wallet
   * @param {string} walletId - ID of the wallet
   * @param {Object} data - Contains reason for freezing
   * @returns {Promise}
   */
  freezeWallet: async (walletId, data) => {
    const response = await axiosInstance.post(
      `/api/wallet/admin/wallets/${walletId}/freeze`,
      data,
    );
    return response.data;
  },

  /**
   * Superadmin: Unfreeze a frozen wallet
   * @param {string} walletId - ID of the wallet
   * @param {Object} data - Contains reason for unfreezing
   * @returns {Promise}
   */
  unfreezeWallet: async (walletId, data) => {
    const response = await axiosInstance.post(
      `/api/wallet/admin/wallets/${walletId}/unfreeze`,
      data,
    );
    return response.data;
  },

  /**
   * Superadmin: Manually credit a user's wallet
   * @param {string} walletId - ID of the wallet
   * @param {Object} data - amount, description, type
   * @returns {Promise}
   */
  manualCredit: async (walletId, data) => {
    const response = await axiosInstance.post(
      `/api/wallet/admin/wallets/${walletId}/manual-credit`,
      data,
    );
    return response.data;
  },

  /**
   * Superadmin: Manually debit a user's wallet
   * @param {string} walletId - ID of the wallet
   * @param {Object} data - amount, description, type
   * @returns {Promise}
   */
  manualDebit: async (walletId, data) => {
    const response = await axiosInstance.post(
      `/api/wallet/admin/wallets/${walletId}/manual-debit`,
      data,
    );
    return response.data;
  },

  /**
   * Get global wallet transactions
   * @param {Object} params - Query parameters (page, limit, status, type, search)
   * @returns {Promise}
   */
  getAllTransactions: async (params = {}) => {
    const response = await axiosInstance.get("/api/wallet/admin/transactions", {
      params,
    });
    return response.data;
  },
};

export default walletAdminService;
