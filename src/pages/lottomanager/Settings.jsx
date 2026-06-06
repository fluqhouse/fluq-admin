import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const Settings = () => {
  return (
    <Layout title="Lotto Settings">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Lotto Settings</h2>
            <p className="text-slate-300">Configure lotto system settings and preferences.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Game Configuration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Default Draw Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="20:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Minimum Bet Amount</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="5"
                      min="1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Maximum Bet Amount</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="1000"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">House Edge (%)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white"
                      defaultValue="15"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Draw Notifications</label>
                    <p className="text-slate-400 text-sm">Notify players before draws</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Winner Announcements</label>
                    <p className="text-slate-400 text-sm">Announce winners publicly</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Email Reports</label>
                    <p className="text-slate-400 text-sm">Send daily reports via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">RNG Seed Refresh Interval</label>
                  <select className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white">
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Audit Logging</label>
                    <p className="text-slate-400 text-sm">Log all game activities</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-slate-300 font-medium">Two-Factor Authentication</label>
                    <p className="text-slate-400 text-sm">Require 2FA for sensitive operations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
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