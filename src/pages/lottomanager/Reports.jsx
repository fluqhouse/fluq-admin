import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useLottoReportsOverview,
  useGenerateLottoReport,
} from "../../hooks/queries/useLottoQueries";
import { formatCurrency, formatNumber } from "../../utils/format";

const Reports = () => {
  const { data: response } = useLottoReportsOverview();
  const summary = response?.data?.summary || {
    totalGames: 0,
    totalTickets: 0,
    totalRevenue: 0,
    totalPayouts: 0,
  };

  const generateReport = useGenerateLottoReport();

  const handleGenerate = (type) => {
    generateReport.mutate({ type, format: "csv", dateFilter: "all" });
  };

  return (
    <Layout title="Lotto Reports">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Lotto Reports
              </h2>
              <p className="text-slate-300">
                Generate and view detailed reports for lotto operations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Sales Report</h3>
                <p className="text-blue-300 text-sm mb-4">
                  Daily, weekly, and monthly sales analysis. Total Revenue:{" "}
                  {formatCurrency(summary.totalRevenue)}
                </p>
                <button
                  onClick={() => handleGenerate("sales")}
                  disabled={
                    generateReport.isPending &&
                    generateReport.variables?.type === "sales"
                  }
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {generateReport.isPending &&
                  generateReport.variables?.type === "sales"
                    ? "Generating..."
                    : "Generate CSV"}
                </button>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Player Report</h3>
                <p className="text-green-300 text-sm mb-4">
                  Player activity and engagement metrics. Total Tickets:{" "}
                  {formatNumber(summary.totalTickets)}
                </p>
                <button
                  onClick={() => handleGenerate("player")}
                  disabled={
                    generateReport.isPending &&
                    generateReport.variables?.type === "player"
                  }
                  className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {generateReport.isPending &&
                  generateReport.variables?.type === "player"
                    ? "Generating..."
                    : "Generate CSV"}
                </button>
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Game Report</h3>
                <p className="text-yellow-300 text-sm mb-4">
                  Individual game performance and statistics. Total Games:{" "}
                  {formatNumber(summary.totalGames)}
                </p>
                <button
                  onClick={() => handleGenerate("game")}
                  disabled={
                    generateReport.isPending &&
                    generateReport.variables?.type === "game"
                  }
                  className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {generateReport.isPending &&
                  generateReport.variables?.type === "game"
                    ? "Generating..."
                    : "Generate CSV"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
