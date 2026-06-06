import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const RaffleManagerDashboard = () => {
  return (
    <Layout title="Raffle Manager Dashboard">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Raffle Manager Overview</h2>
          <p className="text-slate-300 mb-6">
            Manage all raffle events, prizes, and participant entries from your control panel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Active Raffles</p>
                  <p className="text-white text-2xl font-bold">12</p>
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
                  <p className="text-green-300 text-sm">Today's Entries</p>
                  <p className="text-white text-2xl font-bold">1,234</p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Upcoming Draws</p>
                  <p className="text-white text-2xl font-bold">3</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Prize Value</p>
                  <p className="text-white text-2xl font-bold">$85K</p>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Active Raffle Events</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">iPhone 15 Pro Giveaway</p>
                  <p className="text-slate-400 text-sm">Entries: 2,456 | Prize: $1,200</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm">Active</p>
                  <p className="text-slate-300 text-xs">Ends in 2 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Gaming Setup Bundle</p>
                  <p className="text-slate-400 text-sm">Entries: 1,823 | Prize: $3,500</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 text-sm">Active</p>
                  <p className="text-slate-300 text-xs">Ends in 5 days</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Cash Prize $5000</p>
                  <p className="text-slate-400 text-sm">Entries: 5,234 | Prize: $5,000</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 text-sm">Active</p>
                  <p className="text-slate-300 text-xs">Ends in 1 week</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Winners</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Laptop Raffle</p>
                  <p className="text-slate-400 text-sm">Winner: sarah.johnson@email.com</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm">$1,800</p>
                  <p className="text-slate-300 text-xs">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Weekly Cash Draw</p>
                  <p className="text-slate-400 text-sm">Winner: alex.brown@email.com</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm">$500</p>
                  <p className="text-slate-300 text-xs">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Smartwatch Giveaway</p>
                  <p className="text-slate-400 text-sm">Winner: emma.davis@email.com</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm">$400</p>
                  <p className="text-slate-300 text-xs">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RaffleManagerDashboard;