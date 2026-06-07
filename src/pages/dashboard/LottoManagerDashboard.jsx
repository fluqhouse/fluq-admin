import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const LottoManagerDashboard = () => {
  return (
    <Layout title="Lotto Manager Dashboard">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Lotto Manager Overview</h2>
          <p className="text-slate-300 mb-6">
            Manage all lottery games, draws, and transactions from your control panel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Active Games</p>
                  <p className="text-white text-2xl font-bold">15</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Today's Sales</p>
                  <p className="text-white text-2xl font-bold">₦3.2K</p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Pending Draws</p>
                  <p className="text-white text-2xl font-bold">4</p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Total Players</p>
                  <p className="text-white text-2xl font-bold">8,456</p>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Upcoming Draws</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Mega Millions</p>
                  <p className="text-slate-400 text-sm">Jackpot: ₦2.5M</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 text-sm">Tomorrow</p>
                  <p className="text-slate-300 text-xs">9:00 PM</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Daily Pick 3</p>
                  <p className="text-slate-400 text-sm">Prize Pool: ₦50K</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm">Today</p>
                  <p className="text-slate-300 text-xs">6:00 PM</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Lucky 7s</p>
                  <p className="text-slate-400 text-sm">Jackpot: ₦750K</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 text-sm">Friday</p>
                  <p className="text-slate-300 text-xs">8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Ticket Purchase</p>
                  <p className="text-slate-400 text-sm">Player: john.doe@email.com</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm">+₦25.00</p>
                  <p className="text-slate-300 text-xs">2 min ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Winning Payout</p>
                  <p className="text-slate-400 text-sm">Player: jane.smith@email.com</p>
                </div>
                <div className="text-right">
                  <p className="text-red-400 text-sm">-₦150.00</p>
                  <p className="text-slate-300 text-xs">15 min ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Bulk Purchase</p>
                  <p className="text-slate-400 text-sm">Player: mike.wilson@email.com</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm">+₦200.00</p>
                  <p className="text-slate-300 text-xs">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LottoManagerDashboard;