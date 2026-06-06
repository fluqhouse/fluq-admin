import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const Shipments = () => {
  return (
    <Layout title="Shipments">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Shipment Management</h2>
              <p className="text-slate-300">Track and manage prize shipments and deliveries.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
              Create Shipment
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Total Shipments</p>
                  <p className="text-white text-2xl font-bold">342</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">In Transit</p>
                  <p className="text-white text-2xl font-bold">45</p>
                </div>
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Delivered</p>
                  <p className="text-white text-2xl font-bold">287</p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-300 text-sm">Issues</p>
                  <p className="text-white text-2xl font-bold">3</p>
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Shipments</h3>
              <div className="flex space-x-2">
                <select className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="issues">Issues</option>
                </select>
                <input
                  type="text"
                  placeholder="Search tracking..."
                  className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-slate-300 font-medium py-3 px-4">Tracking ID</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Winner</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Prize</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Destination</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Carrier</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Ship Date</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Status</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">TRK-2025-001234</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">John Doe</p>
                        <p className="text-slate-400 text-sm">john.doe@email.com</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">iPhone 15 Pro</td>
                    <td className="py-3 px-4 text-slate-300">New York, NY</td>
                    <td className="py-3 px-4 text-slate-300">FedEx</td>
                    <td className="py-3 px-4 text-slate-300">2 days ago</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full">In Transit</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Track</button>
                        <button className="text-slate-400 hover:text-slate-300 text-sm">Details</button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">TRK-2025-001233</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">Jane Smith</p>
                        <p className="text-slate-400 text-sm">jane.smith@email.com</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">Gaming Laptop</td>
                    <td className="py-3 px-4 text-slate-300">Los Angeles, CA</td>
                    <td className="py-3 px-4 text-slate-300">UPS</td>
                    <td className="py-3 px-4 text-slate-300">3 days ago</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Delivered</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Track</button>
                        <button className="text-slate-400 hover:text-slate-300 text-sm">Details</button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">TRK-2025-001232</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">Mike Johnson</p>
                        <p className="text-slate-400 text-sm">mike.j@email.com</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">Smart Watch</td>
                    <td className="py-3 px-4 text-slate-300">Chicago, IL</td>
                    <td className="py-3 px-4 text-slate-300">DHL</td>
                    <td className="py-3 px-4 text-slate-300">1 day ago</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">Pending</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Track</button>
                        <button className="text-slate-400 hover:text-slate-300 text-sm">Details</button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">TRK-2025-001231</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">Sarah Wilson</p>
                        <p className="text-slate-400 text-sm">sarah.w@email.com</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">Headphones</td>
                    <td className="py-3 px-4 text-slate-300">Miami, FL</td>
                    <td className="py-3 px-4 text-slate-300">FedEx</td>
                    <td className="py-3 px-4 text-slate-300">5 days ago</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Delivered</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Track</button>
                        <button className="text-slate-400 hover:text-slate-300 text-sm">Details</button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">TRK-2025-001230</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">Alex Brown</p>
                        <p className="text-slate-400 text-sm">alex.brown@email.com</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white">Tablet</td>
                    <td className="py-3 px-4 text-slate-300">Seattle, WA</td>
                    <td className="py-3 px-4 text-slate-300">UPS</td>
                    <td className="py-3 px-4 text-slate-300">4 days ago</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full">Delivery Failed</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Retry</button>
                        <button className="text-red-400 hover:text-red-300 text-sm">Contact</button>
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

export default Shipments;