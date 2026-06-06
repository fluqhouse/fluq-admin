import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";

const Settings = () => {
  return (
    <Layout title="Settings">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">General Admin Settings</h2>
          <p className="text-slate-300 mb-6">
            Configure system-wide settings and preferences for all operations.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Platform Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Maintenance Mode</p>
                    <p className="text-slate-400 text-sm">Enable system-wide maintenance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Auto Backup</p>
                    <p className="text-slate-400 text-sm">Daily automatic database backups</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-slate-400 text-sm">Send admin alerts via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-slate-400 text-sm">Require 2FA for all admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Session Timeout</p>
                    <p className="text-slate-400 text-sm">Auto-logout after inactivity</p>
                  </div>
                  <select className="bg-slate-600 text-white px-3 py-1 rounded border border-slate-500">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Login Attempts</p>
                    <p className="text-slate-400 text-sm">Max failed login attempts</p>
                  </div>
                  <select className="bg-slate-600 text-white px-3 py-1 rounded border border-slate-500">
                    <option>3 attempts</option>
                    <option>5 attempts</option>
                    <option>10 attempts</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Game Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Lotto Draw Time</p>
                    <p className="text-slate-400 text-sm">Daily draw schedule</p>
                  </div>
                  <input
                    type="time"
                    defaultValue="20:00"
                    className="bg-slate-600 text-white px-3 py-1 rounded border border-slate-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Raffle Duration</p>
                    <p className="text-slate-400 text-sm">Default raffle period</p>
                  </div>
                  <select className="bg-slate-600 text-white px-3 py-1 rounded border border-slate-500">
                    <option>7 days</option>
                    <option>14 days</option>
                    <option>30 days</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Min Prize Value</p>
                    <p className="text-slate-400 text-sm">Minimum raffle prize value</p>
                  </div>
                  <input
                    type="number"
                    defaultValue="100"
                    className="bg-slate-600 text-white px-3 py-1 rounded border border-slate-500 w-20"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">System Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Version</span>
                  <span className="text-white">v2.1.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Last Update</span>
                  <span className="text-white">Dec 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Database Size</span>
                  <span className="text-white">2.4 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Active Users</span>
                  <span className="text-white">2,431</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Server Status</span>
                  <span className="text-green-400">Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;