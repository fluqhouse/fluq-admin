import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { raffleAPI } from "../../services/api/raffle.js";
import toast from "react-hot-toast";

const QUERY_KEYS = {
  RAFFLE: "raffle",
  CATEGORIES: "categories",
  CATEGORY: "category",
  ITEMS: "items",
  ITEM: "item",
  ITEM_STATISTICS: "itemStatistics",
  GLOBAL_STATISTICS: "globalStatistics",
  DRAW_RESULTS: "drawResults",
  TICKET_RESULT: "ticketResult",
  LGA_STATISTICS: "lgaStatistics",
  LGA_TICKETS: "lgaTickets",
};

// Category Hooks
export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.CATEGORIES],
    queryFn: () => raffleAPI.getAllCategories(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCategoryById = (id, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.CATEGORY, id],
    queryFn: () => raffleAPI.getCategoryById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: raffleAPI.createCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.CATEGORIES],
      });
      toast.success(data.message || "Category created successfully");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to create category";
      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => raffleAPI.updateCategory(id, formData),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.CATEGORY, id],
      });
      toast.success(data.message || "Category updated successfully");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to update category";
      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useDeactivateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: raffleAPI.deactivateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.CATEGORIES],
      });
      toast.success(data.message || "Category deactivated successfully");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to deactivate category";
      toast.error(message, { autoClose: 5000 });
    },
  });
};

// Item Hooks
export const useItems = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEMS, params],
    queryFn: () => raffleAPI.getAllItems(params),
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useItemById = (id, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEM, id],
    queryFn: () => raffleAPI.getItemById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useItemStatistics = (id, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEM_STATISTICS, id],
    queryFn: () => raffleAPI.getItemStatistics(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGlobalStatistics = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.GLOBAL_STATISTICS, params],
    queryFn: () => raffleAPI.getGlobalStatistics(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: raffleAPI.createItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.GLOBAL_STATISTICS],
      });
      toast.success(data.message || "Item created successfully");
    },
    onError: (error) => {
      console.error("Create item error:", error);
      let message = "Failed to create item";

      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors
            .map((err) => err.message || err.msg)
            .join(", ");
          message = `Validation error: ${errorMessages}`;
        } else if (errorData.message) {
          message = errorData.message;
        }
      }

      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => raffleAPI.updateItem(id, formData),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEM, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEM_STATISTICS, id],
      });
      toast.success(data.message || "Item updated successfully");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to update item";
      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: raffleAPI.deleteItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.GLOBAL_STATISTICS],
      });
      toast.success(data.message || "Item deleted successfully");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to delete item";
      toast.error(message, { autoClose: 5000 });
    },
  });
};

// Draw Hooks
export const useDrawResults = (itemId, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.DRAW_RESULTS, itemId],
    queryFn: () => raffleAPI.getDrawResults(itemId),
    enabled: !!itemId,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useTicketDrawResult = (ticketId, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.TICKET_RESULT, ticketId],
    queryFn: () => raffleAPI.getTicketDrawResult(ticketId),
    enabled: !!ticketId && options.enabled !== false,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

export const useSubmitDrawResults = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: raffleAPI.submitDrawResults,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEM, variables.itemId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.RAFFLE,
          QUERY_KEYS.ITEM_STATISTICS,
          variables.itemId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.RAFFLE,
          QUERY_KEYS.DRAW_RESULTS,
          variables.itemId,
        ],
      });
      toast.success(data.message || "Draw results submitted successfully");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to submit draw results";
      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useCloseItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: raffleAPI.closeItem,
    onSuccess: (data, itemId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEM, itemId],
      });
      toast.success(data.message || "Item closed successfully");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to close item";
      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useArchiveItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: raffleAPI.archiveItem,
    onSuccess: (data, itemId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.ITEM, itemId],
      });
      toast.success(data.message || "Item archived successfully");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to archive item";
      toast.error(message, { autoClose: 5000 });
    },
  });
};

// Local Government Analytics Hooks
export const useLocalGovernmentTickets = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, QUERY_KEYS.LGA_TICKETS, params],
    queryFn: () => raffleAPI.getLocalGovernmentTickets(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Raffle Analytics Hook
export const useRaffleAnalytics = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, "analytics", params],
    queryFn: () => raffleAPI.getRaffleAnalytics(params),
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// Raffle Reports Overview Hook
export const useRaffleReportsOverview = (options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, "reportsOverview"],
    queryFn: () => raffleAPI.getRaffleReportsOverview(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Generate Raffle Report (CSV download mutation)
export const useGenerateRaffleReport = () => {
  return useMutation({
    mutationFn: (params) => raffleAPI.generateRaffleReport(params),
    onSuccess: (response, variables) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `raffle_${variables.type}_report.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(`${variables.type} report downloaded successfully`);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to generate report";
      toast.error(message);
    },
  });
};

// Raffle Transactions Hook
export const useRaffleTransactions = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RAFFLE, "transactions", params],
    queryFn: () => raffleAPI.getRaffleTransactions(params),
    staleTime: 1 * 60 * 1000,
    ...options,
  });
};
