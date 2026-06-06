import { useCallback } from 'react';
import { refreshAccessToken, hasValidToken, getAccessToken } from '../services/api/axios';
import { shouldRefreshToken, getTokenExpirationTime } from '../utils/jwt';

/**
 * Custom hook for token refresh functionality
 */
export const useTokenRefresh = () => {
  const checkTokenStatus = useCallback(() => {
    const token = getAccessToken();

    if (!token) {
      return {
        hasToken: false,
        isValid: false,
        needsRefresh: false,
        expiresIn: 0
      };
    }

    return {
      hasToken: true,
      isValid: hasValidToken(),
      needsRefresh: shouldRefreshToken(token),
      expiresIn: getTokenExpirationTime(token)
    };
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const tokenData = await refreshAccessToken();
      return {
        success: true,
        accessToken: tokenData.accessToken,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        accessToken: null,
        error: error.message || 'Failed to refresh token'
      };
    }
  }, []);

  const refreshIfNeeded = useCallback(async () => {
    const status = checkTokenStatus();

    if (!status.hasToken || !status.isValid) {
      return { success: false, error: 'No valid token found' };
    }

    if (status.needsRefresh) {
      return await refreshToken();
    }

    return { success: true, error: null, message: 'Token is still valid' };
  }, [checkTokenStatus, refreshToken]);

  return {
    checkTokenStatus,
    refreshToken,
    refreshIfNeeded
  };
};

export default useTokenRefresh;