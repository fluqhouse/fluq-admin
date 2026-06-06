import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const Raffles = () => {
  return (
    <Layout title="Raffle Events">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Raffle Events Management</h2>
              <p className="text-slate-300">Create, manage, and monitor all raffle events and draws.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
              Create New Raffle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Active Raffles</p>
                  <p className="text-white text-2xl font-bold">8</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Total Participants</p>
                  <p className="text-white text-2xl font-bold">567</p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">Pending Draws</p>
                  <p className="text-white text-2xl font-bold">2</p>
                </div>
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Prize Value</p>
                  <p className="text-white text-2xl font-bold">$12.5K</p>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Active Raffle Events</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-slate-300 font-medium py-3 px-4">Raffle Name</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Prize</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Ticket Price</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Draw Date</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Participants</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Status</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">Grand Prize Draw</p>
                        <p className="text-slate-400 text-sm">Monthly mega raffle</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-green-400 font-semibold">$5,000 Cash</td>
                    <td className="py-3 px-4 text-slate-300">$25</td>
                    <td className="py-3 px-4 text-slate-300">Oct 15, 2025</td>
                    <td className="py-3 px-4 text-slate-300">234</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Active</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-yellow-400 hover:text-yellow-300 text-sm">Draw</button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">Tech Bundle Raffle</p>
                        <p className="text-slate-400 text-sm">Gaming setup package</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-green-400 font-semibold">Gaming Setup</td>
                    <td className="py-3 px-4 text-slate-300">$15</td>
                    <td className="py-3 px-4 text-slate-300">Oct 20, 2025</td>
                    <td className="py-3 px-4 text-slate-300">156</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Active</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-slate-500 text-sm cursor-not-allowed">Draw</button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">Holiday Special</p>
                        <p className="text-slate-400 text-sm">Christmas gift package</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-green-400 font-semibold">$2,500 Package</td>
                    <td className="py-3 px-4 text-slate-300">$10</td>
                    <td className="py-3 px-4 text-slate-300">Dec 24, 2025</td>
                    <td className="py-3 px-4 text-slate-300">89</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">Scheduled</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-slate-500 text-sm cursor-not-allowed">Draw</button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">Weekly Winner</p>
                        <p className="text-slate-400 text-sm">Small weekly prize</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-green-400 font-semibold">$500 Cash</td>
                    <td className="py-3 px-4 text-slate-300">$5</td>
                    <td className="py-3 px-4 text-slate-300">Every Friday</td>
                    <td className="py-3 px-4 text-slate-300">88</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full">Paused</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-green-400 hover:text-green-300 text-sm">Resume</button>
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

export default Raffles;