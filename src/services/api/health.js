import api from "./axios";

const handleError = (error) => {
  throw error.response?.data || error;
};

/**
 * Get comprehensive health check status
 * @returns {Promise<Object>} Health check data with all services status
 */
export const getHealthStatus = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get detailed system status
 * @returns {Promise<Object>} Detailed status with health and metrics
 */
export const getDetailedStatus = async () => {
  try {
    const response = await api.get("/health/status");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get system metrics
 * @returns {Promise<Object>} System metrics (memory, CPU, etc.)
 */
export const getSystemMetrics = async () => {
  try {
    const response = await api.get("/health/metrics");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get database health status
 * @returns {Promise<Object>} Database health data
 */
export const getDatabaseHealth = async () => {
  try {
    const response = await api.get("/health/db");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get Redis health status
 * @returns {Promise<Object>} Redis health data
 */
export const getRedisHealth = async () => {
  try {
    const response = await api.get("/health/redis");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Get version information
 * @returns {Promise<Object>} Version and runtime info
 */
export const getVersionInfo = async () => {
  try {
    const response = await api.get("/health/version");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Simple ping to check connectivity
 * @returns {Promise<Object>} Ping response
 */
export const ping = async () => {
  try {
    const response = await api.get("/health/ping");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
