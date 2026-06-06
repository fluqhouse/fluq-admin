import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const RaffleOverview = () => {
  return (
    <Layout title="Raffle Overview">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Raffle Operations Overview</h2>
          <p className="text-slate-300 mb-6">
            Monitor and oversee all raffle events across the platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Active Raffles</p>
                  <p className="text-white text-2xl font-bold">8</p>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Today's Entries</p>
                  <p className="text-white text-2xl font-bold">847</p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Upcoming Draws</p>
                  <p className="text-white text-2xl font-bold">2</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Total Prize Value</p>
                  <p className="text-white text-2xl font-bold">$38K</p>
                </div>
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Active Raffle Events</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-600">
                <div>
                  <p className="text-white font-medium">Tech Gadget Raffle</p>
                  <p className="text-slate-400 text-sm">iPhone 15 Pro + AirPods Pro • Ends in 3 days</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">245 entries</p>
                  <p className="text-slate-400 text-sm">$2,450 value</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-600">
                <div>
                  <p className="text-white font-medium">Holiday Vacation Package</p>
                  <p className="text-slate-400 text-sm">7-day Bahamas cruise • Ends tomorrow</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-semibold">412 entries</p>
                  <p className="text-slate-400 text-sm">$5,000 value</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-white font-medium">Monthly Cash Prize</p>
                  <p className="text-slate-400 text-sm">$10,000 cash • Ends in 2 weeks</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 font-semibold">1,089 entries</p>
                  <p className="text-slate-400 text-sm">$10,000 value</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RaffleOverview;