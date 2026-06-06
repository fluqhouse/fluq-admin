import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const Inventory = () => {
  return (
    <Layout title="Inventory Management">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Inventory Management</h2>
              <p className="text-slate-300">Track and manage prize inventory and stock levels.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors">
              Add New Item
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Total Items</p>
                  <p className="text-white text-2xl font-bold">1,245</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">In Stock</p>
                  <p className="text-white text-2xl font-bold">987</p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">Low Stock</p>
                  <p className="text-white text-2xl font-bold">23</p>
                </div>
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-300 text-sm">Out of Stock</p>
                  <p className="text-white text-2xl font-bold">15</p>
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Inventory Items</h3>
              <div className="flex space-x-2">
                <select className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm">
                  <option value="all">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="cash">Cash Prizes</option>
                  <option value="experiences">Experiences</option>
                  <option value="vouchers">Vouchers</option>
                </select>
                <input
                  type="text"
                  placeholder="Search items..."
                  className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-slate-300 font-medium py-3 px-4">Item</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Category</th>
                    <th className="text-slate-300 font-medium py-3 px-4">SKU</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Stock</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Value</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Status</th>
                    <th className="text-slate-300 font-medium py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">iPhone 15 Pro</p>
                          <p className="text-slate-400 text-sm">Latest smartphone model</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">Electronics</td>
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">IPH-15P-001</td>
                    <td className="py-3 px-4 text-white font-semibold">5</td>
                    <td className="py-3 px-4 text-green-400 font-semibold">$1,199</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full">Low Stock</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-green-400 hover:text-green-300 text-sm">Restock</button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">Cash Prize - $500</p>
                          <p className="text-slate-400 text-sm">Direct cash payout</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">Cash</td>
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">CASH-500</td>
                    <td className="py-3 px-4 text-white font-semibold">∞</td>
                    <td className="py-3 px-4 text-green-400 font-semibold">$500</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Available</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-slate-500 text-sm cursor-not-allowed">Restock</button>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-600">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">Gaming Laptop</p>
                          <p className="text-slate-400 text-sm">High-performance gaming setup</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">Electronics</td>
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">LAP-GAM-002</td>
                    <td className="py-3 px-4 text-white font-semibold">12</td>
                    <td className="py-3 px-4 text-green-400 font-semibold">$2,499</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">In Stock</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-green-400 hover:text-green-300 text-sm">Restock</button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">Amazon Gift Card</p>
                          <p className="text-slate-400 text-sm">$100 digital voucher</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">Vouchers</td>
                    <td className="py-3 px-4 text-slate-300 font-mono text-sm">AMZ-GC-100</td>
                    <td className="py-3 px-4 text-white font-semibold">0</td>
                    <td className="py-3 px-4 text-green-400 font-semibold">$100</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full">Out of Stock</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-green-400 hover:text-green-300 text-sm">Restock</button>
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

export default Inventory;