import { useQuery } from "@tanstack/react-query";
import {
  getHealthStatus,
  getDetailedStatus,
  getSystemMetrics,
  getDatabaseHealth,
  getRedisHealth,
  getVersionInfo,
  ping,
} from "../../services/api/health";

/**
 * Hook to fetch comprehensive health status
 */
export const useHealthStatus = (options = {}) => {
  return useQuery({
    queryKey: ["health", "status"],
    queryFn: getHealthStatus,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 30, // Auto-refresh every 30 seconds
    ...options,
  });
};

/**
 * Hook to fetch detailed system status
 */
export const useDetailedStatus = (options = {}) => {
  return useQuery({
    queryKey: ["health", "detailed"],
    queryFn: getDetailedStatus,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    ...options,
  });
};

/**
 * Hook to fetch system metrics
 */
export const useSystemMetrics = (options = {}) => {
  return useQuery({
    queryKey: ["health", "metrics"],
    queryFn: getSystemMetrics,
    staleTime: 1000 * 15, // 15 seconds
    refetchInterval: 1000 * 15,
    ...options,
  });
};

/**
 * Hook to fetch database health
 */
export const useDatabaseHealth = (options = {}) => {
  return useQuery({
    queryKey: ["health", "database"],
    queryFn: getDatabaseHealth,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    ...options,
  });
};

/**
 * Hook to fetch Redis health
 */
export const useRedisHealth = (options = {}) => {
  return useQuery({
    queryKey: ["health", "redis"],
    queryFn: getRedisHealth,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    ...options,
  });
};

/**
 * Hook to fetch version information
 */
export const useVersionInfo = (options = {}) => {
  return useQuery({
    queryKey: ["health", "version"],
    queryFn: getVersionInfo,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

/**
 * Hook to ping server
 */
export const usePing = (options = {}) => {
  return useQuery({
    queryKey: ["health", "ping"],
    queryFn: ping,
    staleTime: 1000 * 10, // 10 seconds
    ...options,
  });
};
