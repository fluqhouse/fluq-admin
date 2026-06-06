import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const Settings = () => {
  return (
    <Layout title="Logistics Settings">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Logistics Settings</h2>
            <p className="text-slate-300">Configure logistics and shipping system preferences.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Shipping Configuration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Default Shipping Carrier</label>
                    <select className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white">
                      <option value="fedex">FedEx</option>
                      <option value="ups">UPS</option>
                      <option value="dhl">DHL</option>
                      <option value="usps">USPS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Default Service Level</label>
                    <select className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white">
                      <option value="ground">Ground</option>
                      <option value="express">Express</option>
                      <option value="overnight">Overnight</option>
                      <option value="two-day">2-Day</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Processing Time (days)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="2"
                      min="1"
                      max="7"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Max Package Weight (lbs)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="150"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Inventory Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Low Stock Threshold</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="10"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Reorder Point</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="5"
                      min="1"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Auto Reorder</label>
                    <p className="text-slate-400 text-sm">Automatically create reorder when stock is low</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Stock Alerts</label>
                    <p className="text-slate-400 text-sm">Send notifications when stock levels are low</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Shipment Notifications</label>
                    <p className="text-slate-400 text-sm">Notify recipients when packages are shipped</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Delivery Updates</label>
                    <p className="text-slate-400 text-sm">Send tracking updates to recipients</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Delivery Confirmation</label>
                    <p className="text-slate-400 text-sm">Notify when packages are delivered</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Internal Alerts</label>
                    <p className="text-slate-400 text-sm">Notify logistics team of issues</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Warehouse Configuration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Primary Warehouse</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="Main Distribution Center"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Warehouse Address</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="123 Logistics Blvd, City, State 12345"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Operating Hours</label>
                    <select className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white">
                      <option value="24/7">24/7</option>
                      <option value="business">Business Hours Only</option>
                      <option value="extended">Extended Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Capacity Limit</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="10000"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="px-6 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;