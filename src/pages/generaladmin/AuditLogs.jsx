import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { getAuditLogs, exportAuditLogsCSV } from "../../services/api/auditLogs";
import {
  Search,
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
  FileText,
} from "lucide-react";

const ACTION_TYPES = ["create", "update", "delete"];

const MODEL_TYPES = [
  "User",
  "Wallet",
  "LottoGame",
  "LottoTicket",
  "RaffleItem",
  "RaffleTicket",
  "Transaction",
  "AuditLog",
];

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const [filters, setFilters] = useState({
    model: "",
    action: "",
    userId: "",
    recordId: "",
    ip: "",
    start: "",
    end: "",
    year: "",
    search: "",
  });

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAuditLogs(filters);
      setLogs(response.data || []);
      setTotalCount(response.count || 0);
    } catch (err) {
      setError(err.error?.message || err.message || "Failed to fetch audit logs");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLogs();
  };

  const handleClearFilters = () => {
    setFilters({
      model: "",
      action: "",
      userId: "",
      recordId: "",
      ip: "",
      start: "",
      end: "",
      year: "",
      search: "",
    });
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      await exportAuditLogsCSV(filters);
    } catch (err) {
      setError(err.error?.message || err.message || "Failed to export CSV");
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatJSON = (data) => {
    if (!data) return "-";
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const getActionBadgeColor = (action) => {
    switch (action?.toLowerCase()) {
      case "create":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "update":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "delete":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50";
    }
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <Layout title="Audit Logs">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">Audit Logs</h2>
                <p className="text-slate-400 text-sm">
                  View and export system audit trail
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFilters || hasActiveFilters
                    ? "bg-blue-500/20 border-blue-500 text-blue-300"
                    : "bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {Object.values(filters).filter((v) => v !== "").length}
                  </span>
                )}
              </button>

              <button
                onClick={fetchLogs}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>

              <button
                onClick={handleExportCSV}
                disabled={exporting || loading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                {exporting ? "Exporting..." : "Export CSV"}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-slate-700">
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="sm:col-span-2 lg:col-span-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Search model, action, userId, recordId, IP..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Model Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Model
                    </label>
                    <select
                      name="model"
                      value={filters.model}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Models</option>
                      {MODEL_TYPES.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Action Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Action
                    </label>
                    <select
                      name="action"
                      value={filters.action}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Actions</option>
                      {ACTION_TYPES.map((action) => (
                        <option key={action} value={action}>
                          {action.charAt(0).toUpperCase() + action.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* User ID Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      User ID
                    </label>
                    <input
                      type="number"
                      name="userId"
                      value={filters.userId}
                      onChange={handleFilterChange}
                      placeholder="Enter user ID"
                      className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Record ID Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Record ID
                    </label>
                    <input
                      type="text"
                      name="recordId"
                      value={filters.recordId}
                      onChange={handleFilterChange}
                      placeholder="Enter record ID"
                      className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* IP Address Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      IP Address
                    </label>
                    <input
                      type="text"
                      name="ip"
                      value={filters.ip}
                      onChange={handleFilterChange}
                      placeholder="e.g., 192.168.1.1"
                      className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        name="start"
                        value={filters.start}
                        onChange={handleFilterChange}
                        className="w-full pl-10 pr-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        name="end"
                        value={filters.end}
                        onChange={handleFilterChange}
                        className="w-full pl-10 pr-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                      placeholder="e.g., 2025"
                      min="2020"
                      max="2030"
                      className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-400">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-slate-400">
            {loading ? (
              "Loading..."
            ) : (
              <>
                Showing <span className="text-white font-medium">{logs.length}</span>{" "}
                {totalCount > 0 && logs.length !== totalCount && (
                  <>of <span className="text-white font-medium">{totalCount}</span></>
                )}{" "}
                audit log{logs.length !== 1 ? "s" : ""}
              </>
            )}
          </p>
        </div>

        {/* Logs Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Record ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                        <span className="text-slate-400">Loading audit logs...</span>
                      </div>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <FileText className="w-12 h-12 text-slate-600" />
                        <span className="text-slate-400">No audit logs found</span>
                        {hasActiveFilters && (
                          <button
                            onClick={handleClearFilters}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-300">
                          {log.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-white font-medium">
                          {log.model}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getActionBadgeColor(
                              log.action
                            )}`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300">
                          {log.recordId || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300">
                          {log.userId || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                          {log.ipAddress || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300 whitespace-nowrap">
                          {formatDate(log.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              setExpandedRow(expandedRow === log.id ? null : log.id)
                            }
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                          >
                            {expandedRow === log.id ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                Hide
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                View
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedRow === log.id && (
                        <tr className="bg-slate-700/20">
                          <td colSpan="8" className="px-4 py-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-slate-300 mb-2">
                                  Previous Data
                                </h4>
                                <pre className="bg-slate-900/50 p-3 rounded-lg text-xs text-slate-300 overflow-x-auto max-h-48">
                                  {formatJSON(log.previousData)}
                                </pre>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-slate-300 mb-2">
                                  New Data
                                </h4>
                                <pre className="bg-slate-900/50 p-3 rounded-lg text-xs text-slate-300 overflow-x-auto max-h-48">
                                  {formatJSON(log.newData)}
                                </pre>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuditLogs;
