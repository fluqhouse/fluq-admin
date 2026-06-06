import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const LogisticsDashboard = () => {
  return (
    <Layout title="Logistics Dashboard">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Logistics Overview</h2>
          <p className="text-slate-300 mb-6">
            Manage inventory, shipments, and delivery tracking for all prize fulfillment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Pending Orders</p>
                  <p className="text-white text-2xl font-bold">28</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">In Transit</p>
                  <p className="text-white text-2xl font-bold">45</p>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Delivered</p>
                  <p className="text-white text-2xl font-bold">123</p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Inventory Items</p>
                  <p className="text-white text-2xl font-bold">856</p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Shipments</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">iPhone 15 Pro</p>
                  <p className="text-slate-400 text-sm">Tracking: FLQ123456789</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-orange-600/20 text-orange-300 rounded text-xs">In Transit</span>
                  <p className="text-slate-300 text-xs mt-1">Est. 2 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Gaming Laptop</p>
                  <p className="text-slate-400 text-sm">Tracking: FLQ987654321</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-600/20 text-green-300 rounded text-xs">Delivered</span>
                  <p className="text-slate-300 text-xs mt-1">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Cash Prize</p>
                  <p className="text-slate-400 text-sm">Bank Transfer: $5,000</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-600/20 text-green-300 rounded text-xs">Completed</span>
                  <p className="text-slate-300 text-xs mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Inventory Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-600/10 border border-red-500/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">AirPods Pro</p>
                  <p className="text-red-400 text-sm">Low Stock: 3 remaining</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-red-600/20 text-red-300 rounded text-xs">Critical</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-600/10 border border-yellow-500/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Smartwatch</p>
                  <p className="text-yellow-400 text-sm">Low Stock: 8 remaining</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-yellow-600/20 text-yellow-300 rounded text-xs">Warning</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Gift Cards</p>
                  <p className="text-slate-400 text-sm">Stock: 150 available</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-600/20 text-green-300 rounded text-xs">Good</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Shipment Tracking</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-3 text-slate-300 font-medium">Tracking ID</th>
                  <th className="pb-3 text-slate-300 font-medium">Prize</th>
                  <th className="pb-3 text-slate-300 font-medium">Recipient</th>
                  <th className="pb-3 text-slate-300 font-medium">Status</th>
                  <th className="pb-3 text-slate-300 font-medium">ETA</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-slate-800">
                  <td className="py-3 text-white font-mono text-sm">FLQ123456789</td>
                  <td className="py-3 text-white">iPhone 15 Pro</td>
                  <td className="py-3 text-slate-300">john.doe@email.com</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-orange-600/20 text-orange-300 rounded text-xs">In Transit</span>
                  </td>
                  <td className="py-3 text-slate-300">Dec 25, 2024</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 text-white font-mono text-sm">FLQ987654321</td>
                  <td className="py-3 text-white">Gaming Setup</td>
                  <td className="py-3 text-slate-300">jane.smith@email.com</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs">Processing</span>
                  </td>
                  <td className="py-3 text-slate-300">Dec 28, 2024</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 text-white font-mono text-sm">FLQ456789123</td>
                  <td className="py-3 text-white">Cash Prize</td>
                  <td className="py-3 text-slate-300">mike.wilson@email.com</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-600/20 text-green-300 rounded text-xs">Delivered</span>
                  </td>
                  <td className="py-3 text-slate-300">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LogisticsDashboard;