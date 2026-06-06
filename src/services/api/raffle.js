import api from "./axios.js";

export const raffleAPI = {
  // Category endpoints
  getAllCategories: async () => {
    const response = await api.get("/api/raffle/category");
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await api.get(`/api/raffle/category/${id}`);
    return response.data;
  },

  createCategory: async (formData) => {
    const response = await api.post("/api/raffle/category", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateCategory: async (id, formData) => {
    const response = await api.put(`/api/raffle/category/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deactivateCategory: async (id) => {
    const response = await api.patch(`/api/raffle/category/${id}/deactivate`);
    return response.data;
  },

  // Item endpoints
  getAllItems: async (params = {}) => {
    const {
      page = 1,
      limit = 10,
      status,
      categoryId,
      createdBy,
      search,
      sortBy = "created_at",
      sortOrder = "DESC",
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
    });

    if (status) queryParams.append("status", status);
    if (categoryId) queryParams.append("categoryId", categoryId);
    if (createdBy) queryParams.append("createdBy", createdBy);
    if (search) queryParams.append("search", search);

    const response = await api.get(
      `/api/raffle/items?${queryParams.toString()}`,
    );
    return response.data;
  },

  getItemById: async (id) => {
    const response = await api.get(`/api/raffle/items/${id}`);
    return response.data;
  },

  getItemStatistics: async (id) => {
    const response = await api.get(`/api/raffle/items/${id}/statistics`);
    return response.data;
  },

  getGlobalStatistics: async (params = {}) => {
    const { startDate, endDate, period, category, status } = params;

    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (period) queryParams.append("period", period);
    if (category) queryParams.append("category", category);
    if (status) queryParams.append("status", status);

    const response = await api.get(
      `/api/raffle/items/statistics?${queryParams.toString()}`,
    );
    return response.data;
  },

  createItem: async (formData) => {
    const response = await api.post("/api/raffle/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateItem: async (id, formData) => {
    const response = await api.put(`/api/raffle/items/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteItem: async (id) => {
    const response = await api.delete(`/api/raffle/items/${id}`);
    return response.data;
  },

  // Draw endpoints
  submitDrawResults: async (drawData) => {
    const response = await api.post("/api/raffle/tickets/winners", drawData);
    return response.data;
  },

  getDrawResults: async (itemId) => {
    const response = await api.get(`/api/raffle/draw/${itemId}/results`); //todo in the backend
    return response.data;
  },

  getTicketDrawResult: async (ticketId) => {
    const response = await api.get(`/api/raffle/draw/ticket/${ticketId}`); //todo in the backend
    return response.data;
  },

  closeItem: async (id) => {
    const response = await api.patch(`/api/raffle/items/${id}/close`); //todo in the backend
    return response.data;
  },

  archiveItem: async (id) => {
    const response = await api.patch(`/api/raffle/items/${id}/archive`); //todo in the backend
    return response.data;
  },

  // Local Government Analytics endpoints
  getLocalGovernmentTickets: async (params = {}) => {
    const { itemId, localGovernment, state, country } = params;
    const queryParams = new URLSearchParams();

    if (itemId) queryParams.append("itemId", itemId);
    if (localGovernment) queryParams.append("localGovernment", localGovernment);
    if (state) queryParams.append("state", state);
    if (country) queryParams.append("country", country);

    const response = await api.get(
      `/api/raffle/tickets/by-local-government${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`,
    );
    return response.data;
  },

  // Analytics endpoint
  getRaffleAnalytics: async (params = {}) => {
    const { dateFilter, startDate, endDate } = params;
    const queryParams = new URLSearchParams();
    if (dateFilter) queryParams.append("dateFilter", dateFilter);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    const response = await api.get(
      `/api/raffle/analytics/overview${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
    );
    return response.data;
  },

  // Reports overview endpoint
  getRaffleReportsOverview: async () => {
    const response = await api.get("/api/raffle/reports/overview");
    return response.data;
  },

  // Generate CSV report endpoint (returns blob)
  generateRaffleReport: async (params = {}) => {
    const { type, dateFilter, startDate, endDate } = params;
    const queryParams = new URLSearchParams({ type });
    if (dateFilter) queryParams.append("dateFilter", dateFilter);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    const response = await api.get(
      `/api/raffle/reports/generate?${queryParams.toString()}`,
      { responseType: "blob" },
    );
    return response;
  },

  // Transactions endpoint
  getRaffleTransactions: async (params = {}) => {
    const {
      page = 1,
      limit = 20,
      status,
      dateFilter,
      startDate,
      endDate,
    } = params;
    const queryParams = new URLSearchParams({ page, limit });
    if (status) queryParams.append("status", status);
    if (dateFilter) queryParams.append("dateFilter", dateFilter);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    const response = await api.get(
      `/api/raffle/transactions?${queryParams.toString()}`,
    );
    return response.data;
  },
};
