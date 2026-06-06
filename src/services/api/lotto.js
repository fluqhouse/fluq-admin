import api from "./axios.js";

export const lottoAPI = {
  getAllGames: async (params = {}) => {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = "createdAt",
      sortOrder = "DESC",
    } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
    });

    if (status) {
      queryParams.append("status", status);
    }

    const response = await api.get(`/api/games?${queryParams.toString()}`);
    return response.data;
  },

  getGameById: async (gameId) => {
    const response = await api.get(`/api/games/${gameId}`);
    return response.data;
  },

  getGameStatistics: async (gameId) => {
    const response = await api.get(`/api/games/${gameId}/statistics`);
    return response.data;
  },

  createGame: async (gameData) => {
    const response = await api.post("/api/lotto/create", gameData);
    return response.data;
  },

  updateGame: async (id, gameData) => {
    const response = await api.put(`/api/lotto/${id}/update`, gameData);
    return response.data;
  },

  deleteGame: async (id) => {
    const response = await api.delete(`/api/lotto/${id}/delete`);
    return response.data;
  },

  cancelGame: async (id) => {
    const response = await api.post(`/api/lotto/${id}/cancel`);
    return response.data;
  },

  forceCloseGame: async (id) => {
    const response = await api.post(`/api/${id}/force-close`);
    return response.data;
  },

  getLottoTransactions: async (params = {}) => {
    const {
      page = 1,
      limit = 20,
      type,
      status,
      dateFilter,
      startDate,
      endDate,
    } = params;
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (type) query.append("type", type);
    if (status) query.append("status", status);
    if (dateFilter) query.append("dateFilter", dateFilter);
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);
    const response = await api.get(
      `/api/lotto/transactions?${query.toString()}`,
    );
    return response.data;
  },

  getLottoTransactionDetail: async (transactionId) => {
    const response = await api.get(`/api/lotto/transactions/${transactionId}`);
    return response.data;
  },

  getLottoAnalytics: async (params = {}) => {
    const { period } = params;
    const query = new URLSearchParams();
    if (period) query.append("period", period);

    // Convert to query string if not empty
    const queryString = query.toString() ? `?${query.toString()}` : "";
    const response = await api.get(
      `/api/lotto/analytics/overview${queryString}`,
    );
    return response.data;
  },

  getLottoReportsOverview: async () => {
    const response = await api.get("/api/lotto/reports/overview");
    return response.data;
  },

  generateLottoReport: async (params = {}) => {
    const { type, format, dateFilter, startDate, endDate } = params;
    const query = new URLSearchParams({ type });
    if (format) query.append("format", format);
    if (dateFilter) query.append("dateFilter", dateFilter);
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);

    // Note: If format=csv is requested, this will return binary/blob data instead of JSON
    // We should configure responseType if downloading CSV, handled in the component/hook.
    const response = await api.get(
      `/api/lotto/reports/generate?${query.toString()}`,
      {
        responseType: format === "csv" ? "blob" : "json",
      },
    );
    return response; // returning whole response since data might be blob
  },
};

export const drawAPI = {
  submitDrawResults: async (resultsData) => {
    const response = await api.post("/api/draw/submit", resultsData);
    return response.data;
  },

  getDrawResults: async (gameId) => {
    const response = await api.get(`/api/draw/results/${gameId}`);
    return response.data;
  },

  getTicketResults: async (ticketId) => {
    const response = await api.get(`/api/draw/ticket-results/${ticketId}`);
    return response.data;
  },
};
