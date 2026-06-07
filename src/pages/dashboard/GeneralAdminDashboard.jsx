import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const GeneralAdminDashboard = () => {
  return (
    <Layout title="General Admin Dashboard">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">General Admin Overview</h2>
          <p className="text-slate-300 mb-6">
            Oversee lotto, raffle, and logistics operations from your admin panel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Lotto Revenue</p>
                  <p className="text-white text-2xl font-bold">₦45K</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Raffle Revenue</p>
                  <p className="text-white text-2xl font-bold">₦38K</p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Shipments</p>
                  <p className="text-white text-2xl font-bold">156</p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Lotto Operations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Active Games</span>
                <span className="text-white font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Today's Sales</span>
                <span className="text-green-400 font-semibold">₦2.1K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Pending Draws</span>
                <span className="text-yellow-400 font-semibold">3</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Raffle Operations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Active Raffles</span>
                <span className="text-white font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Today's Entries</span>
                <span className="text-green-400 font-semibold">847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Upcoming Draws</span>
                <span className="text-blue-400 font-semibold">2</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Logistics Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Pending Orders</span>
                <span className="text-white font-semibold">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">In Transit</span>
                <span className="text-blue-400 font-semibold">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Delivered</span>
                <span className="text-green-400 font-semibold">89</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GeneralAdminDashboard;