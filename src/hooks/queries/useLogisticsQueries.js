import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { logisticsAPI } from "../../services/api/logistics.js";
import toast from "react-hot-toast";

const QUERY_KEYS = {
  LOGISTICS: "logistics",
  CLAIMS: "claims",
  CLAIM_APPROVAL: "claimApproval",
  ITEM_CLAIMS: "itemClaims",
};

// Get all claims for a specific item
export const useItemClaims = (itemId, status = null, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOGISTICS, QUERY_KEYS.ITEM_CLAIMS, itemId, status],
    queryFn: () => logisticsAPI.getItemClaims(itemId, status),
    enabled: !!itemId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// Get claim approval status
export const useClaimApprovalStatus = (claimId, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOGISTICS, QUERY_KEYS.CLAIM_APPROVAL, claimId],
    queryFn: () => logisticsAPI.getClaimApprovalStatus(claimId),
    enabled: !!claimId,
    staleTime: 1 * 60 * 1000,
    refetchInterval: options.autoRefresh ? 10000 : false, // Auto-refresh every 10s if enabled
    ...options,
  });
};

// Verify claim (when user comes to pickup)
export const useVerifyClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logisticsAPI.verifyClaim,
    onSuccess: (data) => {
      // Invalidate item claims to refresh the list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LOGISTICS, QUERY_KEYS.ITEM_CLAIMS],
      });

      toast.success(
        data.message || "Claim verified. Approval email sent to user."
      );

      return data;
    },
    onError: (error) => {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to verify claim";
      toast.error(message, { duration: 5000 });
    },
  });
};

// Process claim handover (final step)
export const useProcessClaimHandover = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ claimId, data }) =>
      logisticsAPI.processClaimHandover(claimId, data),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LOGISTICS, QUERY_KEYS.ITEM_CLAIMS],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.LOGISTICS,
          QUERY_KEYS.CLAIM_APPROVAL,
          variables.claimId,
        ],
      });

      toast.success(data.message || "Item claimed successfully");

      return data;
    },
    onError: (error) => {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to process claim";
      toast.error(message, { duration: 5000 });
    },
  });
};

// Resend pickup code
export const useResendPickupCode = () => {
  return useMutation({
    mutationFn: logisticsAPI.resendPickupCode,
    onSuccess: (data) => {
      toast.success(data.message || "Pickup code resent successfully");
      return data;
    },
    onError: (error) => {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to resend pickup code";
      toast.error(message, { duration: 5000 });
    },
  });
};

// Approve claim by token (for public page)
export const useApproveClaimByToken = () => {
  return useMutation({
    mutationFn: logisticsAPI.approveClaimByToken,
    onSuccess: (data) => {
      toast.success(data.message || "Claim approved successfully");
      return data;
    },
    onError: (error) => {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Failed to approve claim";
      toast.error(message, { duration: 5000 });
    },
  });
};
