import axios from "axios";

// In-memory access token storage
let memoryAccessToken = null;

/**
 * Set access token in memory
 * @param {string} token
 */
export const setAccessToken = (token) => {
  memoryAccessToken = token;
};

/**
 * Get access token from memory
 * @returns {string|null}
 */
export const getAccessToken = () => {
  return memoryAccessToken;
};

/**
 * Clear token from memory (used on logout or refresh fail)
 */
export const clearAuth = () => {
  memoryAccessToken = null;
};

/**
 * Check if current token is valid and not expired
 * @returns {boolean}
 */
export const hasValidToken = () => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

// Track if refresh is in progress to prevent multiple simultaneous refreshes
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Call backend to refresh access token using HttpOnly cookie
 * @returns {{ accessToken: string }}
 */
export const refreshAccessToken = async () => {
  // If already refreshing, add to queue
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh-token`,
      {},
      {
        withCredentials: true,
        timeout: 10000
      }
    );

    const tokenData = response.data.data;
    setAccessToken(tokenData.accessToken);
    processQueue(null, tokenData.accessToken);

    return tokenData;
  } catch (error) {
    clearAuth();
    processQueue(error, null);

    if (error.response?.status === 403 || error.response?.status === 401) {
      throw new Error('Session expired. Please login again.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  } finally {
    isRefreshing = false;
  }
};

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Needed for refresh token cookie
});

// Request Interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: handle 401 (unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (originalRequest.headers) {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject: (err) => {
              reject(err);
            }
          });
        });
      }

      try {
        const tokenData = await refreshAccessToken();
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${tokenData.accessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // Clear auth and redirect to login
        clearAuth();

        // Don't redirect if already on login or auth pages
        const currentPath = window.location.pathname;
        const authPaths = ['/login', '/auth', '/', '/register'];

        if (!authPaths.includes(currentPath)) {
          // Use pushState to avoid full page reload
          window.history.pushState({}, '', '/');
          window.location.reload();
        }

        throw refreshError;
      }
    }

    throw error;
  }
);



export default api;
