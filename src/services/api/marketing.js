import api from "./axios";

const handleError = (error) => {
  throw error.response?.data || error;
};

/**
 * Get comprehensive marketing analysis
 * @param {Object} params - Query parameters
 * @param {string} [params.startDate] - Start date (YYYY-MM-DD)
 * @param {string} [params.endDate] - End date (YYYY-MM-DD)
 * @param {string} [params.period] - Period (7d, 30d, 90d, 1y, all)
 * @returns {Promise<Object>} Comprehensive analysis data
 */
export const getComprehensiveAnalysis = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/marketing/analysis", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get executive dashboard
 * @param {Object} params - Query parameters
 * @param {string} [params.period] - Period (7d, 30d, 90d, 1y, all)
 * @returns {Promise<Object>} Executive dashboard data
 */
export const getExecutiveDashboard = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/marketing/analysis/dashboard", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get user acquisition metrics
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} User acquisition data
 */
export const getUserAcquisitionMetrics = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/marketing/analysis/users", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get revenue analytics
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Revenue analytics data
 */
export const getRevenueAnalytics = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/marketing/analysis/revenue", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get engagement metrics
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Engagement metrics data
 */
export const getEngagementMetrics = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/marketing/analysis/engagement", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get conversion analysis
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Conversion analysis data
 */
export const getConversionAnalysis = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/marketing/analysis/conversion", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get game performance metrics
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Game performance data
 */
export const getGamePerformanceMetrics = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/marketing/analysis/games", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get trend analysis
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Trend analysis data
 */
export const getTrendAnalysis = async (params = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const response = await api.get("/api/marketing/analysis/trends", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Export analysis data
 * @param {Object} data - Export parameters
 * @param {string} [data.format] - Export format (json, csv, excel)
 * @param {Array} [data.sections] - Sections to export
 * @returns {Promise<Object>} Export data
 */
export const exportAnalysisData = async (data = {}) => {
  try {
    const response = await api.post("/api/marketing/analysis/export", data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
