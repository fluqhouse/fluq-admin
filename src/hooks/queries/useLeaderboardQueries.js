import { useQuery } from "@tanstack/react-query";
import {
  getTopWinners,
  getMostActivePlayers,
  getBiggestJackpots,
  getRecentWinners,
} from "../../services/api/leaderboard";

/**
 * Hook to fetch top winners leaderboard
 */
export const useTopWinners = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ["leaderboard", "top-winners", params],
    queryFn: () => getTopWinners(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options,
  });
};

/**
 * Hook to fetch most active players leaderboard
 */
export const useMostActivePlayers = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ["leaderboard", "most-active", params],
    queryFn: () => getMostActivePlayers(params),
    staleTime: 1000 * 60 * 2,
    ...options,
  });
};

/**
 * Hook to fetch biggest jackpots
 */
export const useBiggestJackpots = (options = {}) => {
  return useQuery({
    queryKey: ["leaderboard", "biggest-jackpots"],
    queryFn: getBiggestJackpots,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Hook to fetch recent winners
 */
export const useRecentWinners = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ["leaderboard", "recent-winners", params],
    queryFn: () => getRecentWinners(params),
    staleTime: 1000 * 60 * 2,
    ...options,
  });
};
