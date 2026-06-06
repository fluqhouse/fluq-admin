import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const Reports = () => {
  return (
    <Layout title="Logistics Reports">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Logistics Reports</h2>
              <p className="text-slate-300">Generate and view detailed reports for logistics operations.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
              Generate Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Shipment Report</h3>
                <p className="text-blue-300 text-sm mb-4">Track shipment performance and delivery times</p>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Generate
                </button>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Inventory Report</h3>
                <p className="text-green-300 text-sm mb-4">Analyze stock levels and inventory turnover</p>
                <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Generate
                </button>
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Cost Report</h3>
                <p className="text-yellow-300 text-sm mb-4">Review shipping costs and logistics expenses</p>
                <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Generate
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Delivery Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">On-time Deliveries</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-28"></div>
                    </div>
                    <span className="text-white text-sm">89%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Delayed Deliveries</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-3"></div>
                    </div>
                    <span className="text-white text-sm">8%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Failed Deliveries</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-slate-600 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full w-1"></div>
                    </div>
                    <span className="text-white text-sm">3%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Shipping Costs by Carrier</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-600/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">FedEx</p>
                    <p className="text-slate-300 text-sm">156 shipments</p>
                  </div>
                  <div className="text-green-400 font-semibold">$2,845</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-600/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">UPS</p>
                    <p className="text-slate-300 text-sm">134 shipments</p>
                  </div>
                  <div className="text-green-400 font-semibold">$2,120</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-600/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">DHL</p>
                    <p className="text-slate-300 text-sm">89 shipments</p>
                  </div>
                  <div className="text-green-400 font-semibold">$1,567</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Reports</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-slate-300 font-medium py-3 px-4">Report Name</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Type</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Period</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Generated</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Status</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4 text-white">Monthly Shipment Analysis</td>
                    <td className="py-3 px-4 text-slate-300">Shipment</td>
                    <td className="py-3 px-4 text-slate-300">September 2025</td>
                    <td className="py-3 px-4 text-slate-300">30 minutes ago</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Ready</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                        <button className="text-slate-400 hover:text-slate-300 text-sm">View</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4 text-white">Inventory Stock Report</td>
                    <td className="py-3 px-4 text-slate-300">Inventory</td>
                    <td className="py-3 px-4 text-slate-300">Current</td>
                    <td className="py-3 px-4 text-slate-300">2 hours ago</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Ready</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                        <button className="text-slate-400 hover:text-slate-300 text-sm">View</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4 text-white">Quarterly Cost Analysis</td>
                    <td className="py-3 px-4 text-slate-300">Cost</td>
                    <td className="py-3 px-4 text-slate-300">Q3 2025</td>
                    <td className="py-3 px-4 text-slate-300">1 day ago</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Ready</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                        <button className="text-slate-400 hover:text-slate-300 text-sm">View</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">Carrier Performance Report</td>
                    <td className="py-3 px-4 text-slate-300">Performance</td>
                    <td className="py-3 px-4 text-slate-300">Last 30 days</td>
                    <td className="py-3 px-4 text-slate-300">3 days ago</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full">Processing</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-slate-500 text-sm cursor-not-allowed">Download</button>
                        <button className="text-slate-500 text-sm cursor-not-allowed">View</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;