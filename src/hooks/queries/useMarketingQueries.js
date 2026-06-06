import { useQuery } from "@tanstack/react-query";
import {
  getExecutiveDashboard,
  getUserAcquisitionMetrics,
  getRevenueAnalytics,
  getEngagementMetrics,
  getTrendAnalysis,
} from "../../services/api/marketing";

const QUERY_KEYS = {
  MARKETING: "marketing",
  EXECUTIVE: "executive",
  USER_ACQUISITION: "userAcquisition",
  REVENUE: "revenue",
  ENGAGEMENT: "engagement",
  TRENDS: "trends",
};

export const useExecutiveDashboard = (params, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MARKETING, QUERY_KEYS.EXECUTIVE, params],
    queryFn: () => getExecutiveDashboard(params),
    ...options,
  });
};

export const useUserAcquisitionMetrics = (params, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MARKETING, QUERY_KEYS.USER_ACQUISITION, params],
    queryFn: () => getUserAcquisitionMetrics(params),
    ...options,
  });
};

export const useRevenueAnalytics = (params, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MARKETING, QUERY_KEYS.REVENUE, params],
    queryFn: () => getRevenueAnalytics(params),
    ...options,
  });
};

export const useEngagementMetrics = (params, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MARKETING, QUERY_KEYS.ENGAGEMENT, params],
    queryFn: () => getEngagementMetrics(params),
    ...options,
  });
};

export const useTrendAnalysis = (params, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MARKETING, QUERY_KEYS.TRENDS, params],
    queryFn: () => getTrendAnalysis(params),
    ...options,
  });
};
