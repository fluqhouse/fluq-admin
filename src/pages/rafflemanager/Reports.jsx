import React, { useState } from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import {
  useRaffleReportsOverview,
  useGenerateRaffleReport,
} from "../../hooks/queries/useRaffleQueries";

const Reports = () => {
  const [dateFilter, setDateFilter] = useState("all");

  const { data: overviewData } = useRaffleReportsOverview();
  const summary = overviewData?.data?.summary || {
    totalItems: 0,
    totalTickets: 0,
    totalRevenue: 0,
    totalWinners: 0,
  };

  const generateReport = useGenerateRaffleReport();

  const handleGenerate = (type) => {
    generateReport.mutate({ type, dateFilter });
  };

  return (
    <Layout title="Raffle Reports">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Raffle Reports
              </h2>
              <p className="text-slate-300">
                Generate and download detailed reports for raffle operations.
              </p>
            </div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Revenue Report */}
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
                <h3 className="text-white font-semibold mb-2">
                  Revenue Report
                </h3>
                <p className="text-blue-300 text-sm mb-4">
                  Ticket sales and revenue analysis. Total Revenue: ₦
                  {summary.totalRevenue.toLocaleString()}
                </p>
                <button
                  onClick={() => handleGenerate("revenue")}
                  disabled={
                    generateReport.isPending &&
                    generateReport.variables?.type === "revenue"
                  }
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {generateReport.isPending &&
                  generateReport.variables?.type === "revenue"
                    ? "Generating..."
                    : "Generate CSV"}
                </button>
              </div>
            </div>

            {/* Participant Report */}
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
                <h3 className="text-white font-semibold mb-2">
                  Participant Report
                </h3>
                <p className="text-green-300 text-sm mb-4">
                  Participant demographics and engagement. Total Tickets:{" "}
                  {summary.totalTickets.toLocaleString()}
                </p>
                <button
                  onClick={() => handleGenerate("participant")}
                  disabled={
                    generateReport.isPending &&
                    generateReport.variables?.type === "participant"
                  }
                  className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {generateReport.isPending &&
                  generateReport.variables?.type === "participant"
                    ? "Generating..."
                    : "Generate CSV"}
                </button>
              </div>
            </div>

            {/* Event Report */}
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
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Event Report</h3>
                <p className="text-yellow-300 text-sm mb-4">
                  Individual raffle performance analysis. Total Events:{" "}
                  {summary.totalItems}
                </p>
                <button
                  onClick={() => handleGenerate("event")}
                  disabled={
                    generateReport.isPending &&
                    generateReport.variables?.type === "event"
                  }
                  className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  {generateReport.isPending &&
                  generateReport.variables?.type === "event"
                    ? "Generating..."
                    : "Generate CSV"}
                </button>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Overview Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-600/50 rounded-lg p-3 text-center">
                <p className="text-slate-300 text-sm">Total Events</p>
                <p className="text-white text-xl font-bold">
                  {summary.totalItems}
                </p>
              </div>
              <div className="bg-slate-600/50 rounded-lg p-3 text-center">
                <p className="text-slate-300 text-sm">Tickets Sold</p>
                <p className="text-white text-xl font-bold">
                  {summary.totalTickets.toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-600/50 rounded-lg p-3 text-center">
                <p className="text-slate-300 text-sm">Total Revenue</p>
                <p className="text-white text-xl font-bold">
                  ₦{summary.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-600/50 rounded-lg p-3 text-center">
                <p className="text-slate-300 text-sm">Total Winners</p>
                <p className="text-white text-xl font-bold">
                  {summary.totalWinners}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
