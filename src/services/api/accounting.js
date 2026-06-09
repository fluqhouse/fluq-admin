import api from "./axios";

const handleError = (error) => {
  throw error.response?.data || error;
};

/**
 * Get accounting dashboard overview
 * @returns {Promise<Object>} Dashboard data with revenue overview, raffle/lotto stats
 */
export const getAccountingDashboard = async () => {
  try {
    const response = await api.get("/api/accounting/dashboard");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get revenue overview
 * @param {Object} params - Query parameters
 * @param {string} [params.period] - Period (7d, 30d, 90d, 1y, all)
 * @returns {Promise<Object>} Revenue overview data
 */
export const getRevenueOverview = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/accounting/revenue/overview", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get daily revenue trends
 * @param {Object} params - Query parameters
 * @param {string} [params.period] - Period (7d, 30d, 90d, 1y)
 * @returns {Promise<Object>} Daily revenue trends data
 */
export const getDailyRevenueTrends = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/accounting/revenue/trends", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get raffle overview for accounting
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Raffle overview data
 */
export const getRaffleOverview = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/accounting/raffle/overview", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get raffle category analytics
 * @returns {Promise<Object>} Raffle category analytics data
 */
export const getRaffleCategoryAnalytics = async () => {
  try {
    const response = await api.get("/api/accounting/raffle/categories");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get raffle category details
 * @param {string} categoryId - Category ID
 * @returns {Promise<Object>} Raffle category details
 */
export const getRaffleCategoryDetails = async (categoryId) => {
  try {
    const response = await api.get(`/api/accounting/raffle/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get raffle item analytics
 * @param {string} itemId - Item ID
 * @returns {Promise<Object>} Raffle item analytics data
 */
export const getRaffleItemAnalytics = async (itemId) => {
  try {
    const response = await api.get(`/api/accounting/raffle/items/${itemId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get lotto overview for accounting
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Lotto overview data
 */
export const getLottoOverview = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/accounting/lotto/overview", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get lotto games analytics
 * @returns {Promise<Object>} Lotto games analytics data
 */
export const getLottoGamesAnalytics = async () => {
  try {
    const response = await api.get("/api/accounting/lotto/games");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get lotto game details
 * @param {string} gameId - Game ID
 * @returns {Promise<Object>} Lotto game details
 */
export const getLottoGameDetails = async (gameId) => {
  try {
    const response = await api.get(`/api/accounting/lotto/games/${gameId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
