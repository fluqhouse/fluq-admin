import api from "./axios";

const handleError = (error) => {
  throw error.response?.data || error;
};

/**
 * Fetch audit logs with optional filters
 * @param {Object} params - Query parameters for filtering
 * @param {string} [params.model] - Filter by model/table name
 * @param {string} [params.action] - Filter by action type
 * @param {number} [params.userId] - Filter by user ID
 * @param {string} [params.recordId] - Filter by record ID
 * @param {string} [params.ip] - Filter by IP address
 * @param {string} [params.start] - Start date (YYYY-MM-DD)
 * @param {string} [params.end] - End date (YYYY-MM-DD)
 * @param {string} [params.year] - Filter by year
 * @param {string} [params.search] - Search across fields
 * @returns {Promise<Object>} Audit logs response
 */
export const getAuditLogs = async (params = {}) => {
  try {
    // Remove empty/undefined params
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== "" && v !== undefined && v !== null,
      ),
    );

    const response = await api.get("/api/audit-logs", { params: cleanParams });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Export audit logs as CSV
 * @param {Object} params - Query parameters for filtering (same as getAuditLogs)
 * @returns {Promise<Blob>} CSV file blob
 */
export const exportAuditLogsCSV = async (params = {}) => {
  try {
    // Remove empty/undefined params and add export=csv
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== "" && v !== undefined && v !== null,
      ),
    );
    cleanParams.export = "csv";

    const response = await api.get("/api/audit-logs", {
      params: cleanParams,
      responseType: "blob",
    });

    // Create download link
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `audit-logs-${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    handleError(error);
  }
};
