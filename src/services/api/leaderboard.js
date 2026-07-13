import api from "./axios";

const handleError = (error) => {
  throw error.response?.data || error;
};

/**
 * Get top winners leaderboard
 * @param {Object} params - Query parameters
 * @param {string} [params.period] - Time period ('7days', '1month', '3months')
 * @returns {Promise<Object>} Top winners data
 */
export const getTopWinners = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/lotto/user/leaderboard/top-winners", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get most active players leaderboard
 * @param {Object} params - Query parameters
 * @param {string} [params.period] - Time period ('7days', '1month', '3months')
 * @returns {Promise<Object>} Most active players data
 */
export const getMostActivePlayers = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/lotto/user/leaderboard/most-active", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get biggest jackpots ever
 * @returns {Promise<Object>} Biggest jackpots data
 */
export const getBiggestJackpots = async () => {
  try {
    const response = await api.get("/api/lotto/user/leaderboard/biggest-jackpots");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get recent winners from both lotto and raffle
 * @param {Object} params - Query parameters
 * @param {number} [params.limit] - Number of winners (1-100, default: 20)
 * @param {string} [params.gameType] - Game type ('all', 'lotto', 'raffle')
 * @returns {Promise<Object>} Recent winners data
 */
export const getRecentWinners = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/lotto/user/leaderboard/recent-winners", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
