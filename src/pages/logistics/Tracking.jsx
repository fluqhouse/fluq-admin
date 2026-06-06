import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const Tracking = () => {
  return (
    <Layout title="Shipment Tracking">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Shipment Tracking</h2>
              <p className="text-slate-300">Real-time tracking and delivery status monitoring.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
              Track Package
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Track Shipment</h3>
                <div className="flex space-x-3 mb-6">
                  <input
                    type="text"
                    placeholder="Enter tracking number..."
                    className="flex-1 px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white"
                    defaultValue="TRK-2025-001234"
                  />
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                    Track
                  </button>
                </div>

                <div className="bg-slate-600/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-white font-semibold">iPhone 15 Pro - John Doe</h4>
                      <p className="text-slate-300 text-sm">Tracking: TRK-2025-001234 • FedEx</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 text-sm rounded-full">In Transit</span>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-500"></div>

                    <div className="space-y-6">
                      <div className="relative flex items-center">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center z-10">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-white font-medium">Package Shipped</p>
                          <p className="text-slate-400 text-sm">Sept 21, 2025 at 2:30 PM</p>
                          <p className="text-slate-300 text-sm">Departed from New York Distribution Center</p>
                        </div>
                      </div>

                      <div className="relative flex items-center">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center z-10">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-white font-medium">In Transit</p>
                          <p className="text-slate-400 text-sm">Sept 22, 2025 at 8:15 AM</p>
                          <p className="text-slate-300 text-sm">Package arrived at Philadelphia Hub</p>
                        </div>
                      </div>

                      <div className="relative flex items-center">
                        <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center z-10">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-white font-medium">Out for Delivery</p>
                          <p className="text-slate-400 text-sm">Sept 23, 2025 at 6:00 AM</p>
                          <p className="text-slate-300 text-sm">Package is out for delivery in New York, NY</p>
                        </div>
                      </div>

                      <div className="relative flex items-center opacity-50">
                        <div className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center z-10">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-slate-400 font-medium">Delivered</p>
                          <p className="text-slate-500 text-sm">Estimated: Sept 23, 2025 by 3:00 PM</p>
                          <p className="text-slate-500 text-sm">To be delivered to recipient</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Delivery Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Recipient:</span>
                    <span className="text-white">John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Address:</span>
                    <div className="text-right">
                      <p className="text-white">123 Main St</p>
                      <p className="text-white">New York, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Phone:</span>
                    <span className="text-white">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Delivery Notes:</span>
                    <span className="text-white">Leave at front door</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Package Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Weight:</span>
                    <span className="text-white">1.2 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Dimensions:</span>
                    <span className="text-white">8" × 6" × 2"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Service:</span>
                    <span className="text-white">FedEx Ground</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Insurance:</span>
                    <span className="text-white">$1,199.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Tracking Updates</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-slate-300 font-medium py-3 px-4">Tracking ID</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Recipient</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Status</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Location</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Updated</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">TRK-2025-001235</td>
                    <td className="py-3 px-4 text-white">Mary Johnson</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Delivered</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">Boston, MA</td>
                    <td className="py-3 px-4 text-slate-300">1 hour ago</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">TRK-2025-001236</td>
                    <td className="py-3 px-4 text-white">David Lee</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full">In Transit</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">Denver, CO</td>
                    <td className="py-3 px-4 text-slate-300">2 hours ago</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Track</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">TRK-2025-001237</td>
                    <td className="py-3 px-4 text-white">Lisa Chen</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">Shipped</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">Atlanta, GA</td>
                    <td className="py-3 px-4 text-slate-300">3 hours ago</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Track</button>
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

export default Tracking;