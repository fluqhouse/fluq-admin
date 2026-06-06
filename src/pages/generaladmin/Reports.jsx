import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const Reports = () => {
  return (
    <Layout title="Reports">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Reports & Documentation</h2>
          <p className="text-slate-300 mb-6">
            Generate and view comprehensive reports across all operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 cursor-pointer hover:bg-blue-600/30 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Financial Reports</p>
                  <p className="text-white text-lg font-semibold">Revenue & Profit</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 cursor-pointer hover:bg-green-600/30 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">User Reports</p>
                  <p className="text-white text-lg font-semibold">Activity & Demographics</p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4 cursor-pointer hover:bg-purple-600/30 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Operations Reports</p>
                  <p className="text-white text-lg font-semibold">Games & Logistics</p>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Reports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-slate-600">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Monthly Revenue Report - December 2024</p>
                    <p className="text-slate-400 text-sm">Generated on Jan 1, 2025 • Financial Department</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Complete</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-600">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">User Activity Analysis - Q4 2024</p>
                    <p className="text-slate-400 text-sm">Generated on Dec 28, 2024 • Marketing Department</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Complete</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-600">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Logistics Performance Report - December</p>
                    <p className="text-slate-400 text-sm">Generated on Dec 30, 2024 • Operations Department</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Complete</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Weekly Summary Report - Week 52</p>
                    <p className="text-slate-400 text-sm">Generating... • All Departments</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full">Processing</span>
                  <button className="text-slate-500 text-sm cursor-not-allowed">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;