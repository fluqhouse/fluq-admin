import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lottoAPI, drawAPI } from "../../services/api/lotto.js";
import toast from "react-hot-toast";

const QUERY_KEYS = {
  LOTTO: "lotto",
  GAMES: "games",
  GAME_STATISTICS: "gameStatistics",
  DRAW_RESULTS: "drawResults",
  TICKET_RESULTS: "ticketResults",
  LOTTO_TRANSACTIONS: "lottoTransactions",
  LOTTO_TRANSACTION_DETAIL: "lottoTransactionDetail",
  LOTTO_ANALYTICS: "lottoAnalytics",
  LOTTO_REPORTS_OVERVIEW: "lottoReportsOverview",
};

export const useGames = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOTTO, QUERY_KEYS.GAMES, params],
    queryFn: () => lottoAPI.getAllGames(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useGameById = (gameId, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOTTO, QUERY_KEYS.GAMES, gameId],
    queryFn: () => lottoAPI.getGameById(gameId),
    enabled: !!gameId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

export const useGameStatistics = (gameId, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOTTO, QUERY_KEYS.GAME_STATISTICS, gameId],
    queryFn: () => lottoAPI.getGameStatistics(gameId),
    enabled: !!gameId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lottoAPI.createGame,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LOTTO, QUERY_KEYS.GAMES],
      });
      toast.success(data.message || "Game created successfully");
    },
    onError: (error) => {
      console.error("Create game error:", error);

      // Extract detailed error messages
      let message = "Failed to create game";

      if (error.response?.data) {
        const errorData = error.response.data;

        // Handle validation errors with multiple fields
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors
            .map((err) => err.message || err.msg)
            .join(", ");
          message = `Validation error: ${errorMessages}`;
        }
        // Handle single error message
        else if (errorData.message) {
          message = errorData.message;
        }
        // Handle error field
        else if (errorData.error) {
          message =
            typeof errorData.error === "string"
              ? errorData.error
              : "Failed to create game";
        }
      }
      // Handle network errors
      else if (error.message === "Network Error") {
        message = "Network error. Please check your connection and try again.";
      }
      // Handle timeout errors
      else if (error.code === "ECONNABORTED") {
        message = "Request timeout. Please try again.";
      }
      // Handle other axios errors
      else if (error.message) {
        message = `Error: ${error.message}`;
      }

      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, gameData }) => lottoAPI.updateGame(id, gameData),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOTTO] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LOTTO, QUERY_KEYS.GAME_STATISTICS, id],
      });
      toast.success(data.message || "Game updated successfully");
    },
    onError: (error) => {
      console.error("Update game error:", error);

      let message = "Failed to update game";
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors
            .map((err) => err.message || err.msg)
            .join(", ");
          message = `Validation error: ${errorMessages}`;
        } else if (errorData.message) {
          message = errorData.message;
        } else if (errorData.error) {
          message =
            typeof errorData.error === "string"
              ? errorData.error
              : "Failed to update game";
        }
      } else if (error.message === "Network Error") {
        message = "Network error. Please check your connection and try again.";
      } else if (error.message) {
        message = `Error: ${error.message}`;
      }

      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lottoAPI.deleteGame,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOTTO] });
      toast.success(data.message || "Game deleted successfully");
    },
    onError: (error) => {
      console.error("Delete game error:", error);

      let message = "Failed to delete game";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message === "Network Error") {
        message = "Network error. Please check your connection and try again.";
      } else if (error.message) {
        message = `Error: ${error.message}`;
      }

      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useCancelGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lottoAPI.cancelGame,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOTTO] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LOTTO, QUERY_KEYS.GAME_STATISTICS, id],
      });
      toast.success(data.message || "Game cancelled successfully");
    },
    onError: (error) => {
      console.error("Cancel game error:", error);

      let message = "Failed to cancel game";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message === "Network Error") {
        message = "Network error. Please check your connection and try again.";
      } else if (error.message) {
        message = `Error: ${error.message}`;
      }

      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useForceCloseGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lottoAPI.forceCloseGame,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOTTO] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LOTTO, QUERY_KEYS.GAME_STATISTICS, id],
      });
      toast.success(data.message || "Game force closed successfully");
    },
    onError: (error) => {
      console.error("Force close game error:", error);

      let message = "Failed to force close game";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message === "Network Error") {
        message = "Network error. Please check your connection and try again.";
      } else if (error.message) {
        message = `Error: ${error.message}`;
      }

      toast.error(message, { autoClose: 5000 });
    },
  });
};

export const useSubmitDrawResults = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: drawAPI.submitDrawResults,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOTTO] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DRAW_RESULTS] });
      toast.success(data.message || "Draw results submitted successfully");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to submit draw results";
      toast.error(message);
    },
  });
};

export const useDrawResults = (gameId, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.DRAW_RESULTS, gameId],
    queryFn: () => drawAPI.getDrawResults(gameId),
    enabled: !!gameId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

export const useTicketResults = (ticketId, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TICKET_RESULTS, ticketId],
    queryFn: () => drawAPI.getTicketResults(ticketId),
    enabled: !!ticketId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
};

export const useLottoTransactions = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOTTO_TRANSACTIONS, params],
    queryFn: () => lottoAPI.getLottoTransactions(params),
    staleTime: 60 * 1000, // 1 minute
    ...options,
  });
};

export const useLottoTransactionDetail = (transactionId, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOTTO_TRANSACTION_DETAIL, transactionId],
    queryFn: () => lottoAPI.getLottoTransactionDetail(transactionId),
    enabled: !!transactionId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useLottoAnalytics = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOTTO, QUERY_KEYS.LOTTO_ANALYTICS, params],
    queryFn: () => lottoAPI.getLottoAnalytics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useLottoReportsOverview = (options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOTTO, QUERY_KEYS.LOTTO_REPORTS_OVERVIEW],
    queryFn: () => lottoAPI.getLottoReportsOverview(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useGenerateLottoReport = () => {
  return useMutation({
    mutationFn: lottoAPI.generateLottoReport,
    onSuccess: (response, variables) => {
      if (variables.format === "csv") {
        // Blob is returned for CSV format
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        const fileName = `lotto_${variables.type}_report_${new Date().toISOString().split("T")[0]}.csv`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success(`${variables.type} report downloaded successfully`);
      } else {
        toast.success(`${variables.type} report generated successfully`);
      }
    },
    onError: (error) => {
      console.error("Generate report error:", error);
      toast.error(error.response?.data?.message || "Failed to generate report");
    },
  });
};
