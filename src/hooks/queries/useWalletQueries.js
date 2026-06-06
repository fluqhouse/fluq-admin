import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import walletAdminService from "../../services/api/walletAdmin";
import toast from "react-hot-toast";

const QUERY_KEYS = {
  WALLET: "wallet",
  STATISTICS: "statistics",
  WALLETS: "wallets",
  USER_WALLET: "userWallet",
  TRANSACTIONS: "transactions",
};

export const useWalletStatistics = (options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.WALLET, QUERY_KEYS.STATISTICS],
    queryFn: () => walletAdminService.getStatistics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useAllWallets = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.WALLET, QUERY_KEYS.WALLETS, params],
    queryFn: () => walletAdminService.getAllWallets(params),
    staleTime: 60 * 1000, // 1 minute
    ...options,
  });
};

export const useUserWallet = (userId, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.WALLET, QUERY_KEYS.USER_WALLET, userId],
    queryFn: () => walletAdminService.getUserWallet(userId),
    enabled: !!userId,
    staleTime: 60 * 1000, // 1 minute
    ...options,
  });
};

export const useAllWalletTransactions = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.WALLET, QUERY_KEYS.TRANSACTIONS, params],
    queryFn: () => walletAdminService.getAllTransactions(params),
    staleTime: 60 * 1000, // 1 minute
    ...options,
  });
};

export const useFreezeWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ walletId, data }) =>
      walletAdminService.freezeWallet(walletId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WALLET] });
      toast.success(data.message || "Wallet frozen successfully");
    },
    onError: (error) => {
      console.error("Freeze wallet error:", error);
      toast.error(
        error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Failed to freeze wallet",
      );
    },
  });
};

export const useUnfreezeWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ walletId, data }) =>
      walletAdminService.unfreezeWallet(walletId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WALLET] });
      toast.success(data.message || "Wallet unfrozen successfully");
    },
    onError: (error) => {
      console.error("Unfreeze wallet error:", error);
      toast.error(
        error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Failed to unfreeze wallet",
      );
    },
  });
};

export const useManualCredit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ walletId, data }) =>
      walletAdminService.manualCredit(walletId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WALLET] });
      toast.success(data.message || "Wallet credited successfully");
    },
    onError: (error) => {
      console.error("Manual credit error:", error);
      toast.error(
        error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Failed to credit wallet",
      );
    },
  });
};

export const useManualDebit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ walletId, data }) =>
      walletAdminService.manualDebit(walletId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WALLET] });
      toast.success(data.message || "Wallet debited successfully");
    },
    onError: (error) => {
      console.error("Manual debit error:", error);
      toast.error(
        error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Failed to debit wallet",
      );
    },
  });
};
