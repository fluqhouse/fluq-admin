import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const LogisticsOverview = () => {
  return (
    <Layout title="Logistics Overview">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Logistics Operations Overview</h2>
          <p className="text-slate-300 mb-6">
            Monitor shipping, inventory, and delivery operations across all platforms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Pending Orders</p>
                  <p className="text-white text-2xl font-bold">23</p>
                </div>
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">In Transit</p>
                  <p className="text-white text-2xl font-bold">45</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Delivered Today</p>
                  <p className="text-white text-2xl font-bold">89</p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Inventory Items</p>
                  <p className="text-white text-2xl font-bold">1.5K</p>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Shipments</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-600">
                  <div>
                    <p className="text-white font-medium">Order #ORD-2024-001</p>
                    <p className="text-slate-400 text-sm">Tech Gadget Raffle Prize • iPhone 15 Pro</p>
                  </div>
                  <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Delivered</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-600">
                  <div>
                    <p className="text-white font-medium">Order #ORD-2024-002</p>
                    <p className="text-slate-400 text-sm">Vacation Package Documents</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">In Transit</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-white font-medium">Order #ORD-2024-003</p>
                    <p className="text-slate-400 text-sm">Monthly Cash Prize Certificates</p>
                  </div>
                  <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full">Processing</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Warehouse Status</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Storage Capacity</span>
                    <span className="text-white">75%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Active Staff</span>
                    <span className="text-white">12/15</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Today's Productivity</span>
                    <span className="text-white">92%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LogisticsOverview;