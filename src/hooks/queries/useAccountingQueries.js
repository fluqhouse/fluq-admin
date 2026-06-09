import { useQuery } from "@tanstack/react-query";
import {
  getAccountingDashboard,
  getRevenueOverview,
  getDailyRevenueTrends,
  getRaffleOverview,
  getRaffleCategoryAnalytics,
  getRaffleCategoryDetails,
  getRaffleItemAnalytics,
  getLottoOverview,
  getLottoGamesAnalytics,
  getLottoGameDetails,
} from "../../services/api/accounting";

/**
 * Hook to fetch accounting dashboard data
 */
export const useAccountingDashboard = (options = {}) => {
  return useQuery({
    queryKey: ["accounting", "dashboard"],
    queryFn: getAccountingDashboard,
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options,
  });
};

/**
 * Hook to fetch revenue overview
 */
export const useRevenueOverview = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ["accounting", "revenue", "overview", params],
    queryFn: () => getRevenueOverview(params),
    staleTime: 1000 * 60 * 2,
    ...options,
  });
};

/**
 * Hook to fetch daily revenue trends
 */
export const useDailyRevenueTrends = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ["accounting", "revenue", "trends", params],
    queryFn: () => getDailyRevenueTrends(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Hook to fetch raffle overview for accounting
 */
export const useAccountingRaffleOverview = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ["accounting", "raffle", "overview", params],
    queryFn: () => getRaffleOverview(params),
    staleTime: 1000 * 60 * 2,
    ...options,
  });
};

/**
 * Hook to fetch raffle category analytics
 */
export const useRaffleCategoryAnalytics = (options = {}) => {
  return useQuery({
    queryKey: ["accounting", "raffle", "categories"],
    queryFn: getRaffleCategoryAnalytics,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

/**
 * Hook to fetch raffle category details
 */
export const useRaffleCategoryDetails = (categoryId, options = {}) => {
  return useQuery({
    queryKey: ["accounting", "raffle", "categories", categoryId],
    queryFn: () => getRaffleCategoryDetails(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

/**
 * Hook to fetch raffle item analytics
 */
export const useRaffleItemAnalytics = (itemId, options = {}) => {
  return useQuery({
    queryKey: ["accounting", "raffle", "items", itemId],
    queryFn: () => getRaffleItemAnalytics(itemId),
    enabled: !!itemId,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

/**
 * Hook to fetch lotto overview for accounting
 */
export const useAccountingLottoOverview = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ["accounting", "lotto", "overview", params],
    queryFn: () => getLottoOverview(params),
    staleTime: 1000 * 60 * 2,
    ...options,
  });
};

/**
 * Hook to fetch lotto games analytics
 */
export const useLottoGamesAnalytics = (options = {}) => {
  return useQuery({
    queryKey: ["accounting", "lotto", "games"],
    queryFn: getLottoGamesAnalytics,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

/**
 * Hook to fetch lotto game details
 */
export const useLottoGameDetails = (gameId, options = {}) => {
  return useQuery({
    queryKey: ["accounting", "lotto", "games", gameId],
    queryFn: () => getLottoGameDetails(gameId),
    enabled: !!gameId,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
