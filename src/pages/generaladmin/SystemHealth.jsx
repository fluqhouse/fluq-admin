import React from "react";
import Layout from "../../components/dashboard/layouts/Layout";
import { useDetailedStatus, useVersionInfo } from "../../hooks/queries/useHealthQueries";
import {
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Server,
  Database,
  HardDrive,
  Cpu,
  Clock,
  Activity,
  AlertTriangle,
} from "lucide-react";

const SystemHealth = () => {
  const {
    data: statusData,
    isLoading,
    error,
    refetch,
  } = useDetailedStatus();

  const { data: versionData } = useVersionInfo();

  const health = statusData?.health;
  const metrics = statusData?.metrics;
  const version = versionData;

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "text-green-400";
      case "degraded":
        return "text-yellow-400";
      case "unhealthy":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "healthy":
        return "bg-green-500/20 border-green-500/30";
      case "degraded":
        return "bg-yellow-500/20 border-yellow-500/30";
      case "unhealthy":
        return "bg-red-500/20 border-red-500/30";
      default:
        return "bg-slate-500/20 border-slate-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "unhealthy":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (error) {
    return (
      <Layout title="System Health">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 text-lg mb-4">
              {error.message || "Failed to load system health"}
            </p>
            <button
              onClick={() => refetch()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="System Health">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">System Health Monitor</h2>
              <p className="text-slate-300">
                Real-time monitoring of all system components and services.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {health && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusBg(health.status)}`}>
                  {getStatusIcon(health.status)}
                  <span className={`font-semibold capitalize ${getStatusColor(health.status)}`}>
                    {health.status}
                  </span>
                </div>
              )}
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-slate-700/30 rounded-lg h-24"></div>
              ))}
            </div>
          ) : health?.summary && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Total Services</p>
                    <p className="text-white text-2xl font-bold">
                      {health.summary.totalServices}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm">Healthy</p>
                    <p className="text-white text-2xl font-bold">
                      {health.summary.healthyServices}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-300 text-sm">Unhealthy</p>
                    <p className="text-white text-2xl font-bold">
                      {health.summary.unhealthyServices}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm">Response Time</p>
                    <p className="text-white text-2xl font-bold">
                      {health.responseTime}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Services Status</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-12"></div>
                ))}
              </div>
            ) : health?.services ? (
              <div className="space-y-3">
                {Object.entries(health.services).map(([serviceName, serviceData]) => (
                  <div
                    key={serviceName}
                    className={`flex items-center justify-between p-3 rounded-lg border ${getStatusBg(serviceData.status)}`}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(serviceData.status)}
                      <span className="text-white font-medium capitalize">{serviceName}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-semibold capitalize ${getStatusColor(serviceData.status)}`}>
                        {serviceData.status}
                      </span>
                      {serviceData.responseTime && (
                        <p className="text-slate-400 text-sm">{serviceData.responseTime}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No service data available
              </div>
            )}
          </div>

          {/* Memory Usage */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <HardDrive className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Memory Usage</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-6"></div>
                ))}
              </div>
            ) : metrics?.memory ? (
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Process Memory</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Heap Used</span>
                      <span className="text-white font-semibold">{metrics.memory.process.heapUsed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Heap Total</span>
                      <span className="text-white font-semibold">{metrics.memory.process.heapTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Usage</span>
                      <span className={`font-semibold ${
                        metrics.memory.process.heapUsagePercentage > 80 ? 'text-red-400' :
                        metrics.memory.process.heapUsagePercentage > 60 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {metrics.memory.process.heapUsagePercentage}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <p className="text-slate-400 text-sm mb-2">System Memory</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total</span>
                      <span className="text-white font-semibold">{metrics.memory.system.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Used</span>
                      <span className="text-white font-semibold">{metrics.memory.system.used}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Usage</span>
                      <span className={`font-semibold ${
                        metrics.memory.system.usagePercentage > 90 ? 'text-red-400' :
                        metrics.memory.system.usagePercentage > 75 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {metrics.memory.system.usagePercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No memory data available
              </div>
            )}
          </div>
        </div>

        {/* System Info and Uptime */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">System Information</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-6"></div>
                ))}
              </div>
            ) : metrics?.system ? (
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-300">Platform</span>
                  <span className="text-white font-semibold capitalize">{metrics.system.platform}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-300">Architecture</span>
                  <span className="text-white font-semibold">{metrics.system.architecture}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-300">CPU Cores</span>
                  <span className="text-white font-semibold">{metrics.system.cpu?.cores}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-300">Load Average (1m)</span>
                  <span className="text-white font-semibold">
                    {metrics.system.loadAverage?.['1m']?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-300">Hostname</span>
                  <span className="text-white font-semibold">{metrics.system.hostname}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No system data available
              </div>
            )}
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Version & Uptime</h3>
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700/30 rounded h-6"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {version?.application && (
                  <>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-slate-300">App Name</span>
                      <span className="text-white font-semibold">{version.application.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-slate-300">Version</span>
                      <span className="text-white font-semibold">{version.application.version}</span>
                    </div>
                  </>
                )}
                {version?.runtime && (
                  <>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-slate-300">Node Version</span>
                      <span className="text-white font-semibold">{version.runtime.node}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-slate-300">Environment</span>
                      <span className="text-white font-semibold capitalize">{version.runtime.environment}</span>
                    </div>
                  </>
                )}
                {metrics?.system?.uptime && (
                  <>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-slate-300">Process Uptime</span>
                      <span className="text-green-400 font-semibold">
                        {formatUptime(metrics.system.uptime.process)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-300">System Uptime</span>
                      <span className="text-green-400 font-semibold">
                        {formatUptime(metrics.system.uptime.system)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Failed Services Alert */}
        {health?.summary?.failedServices?.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-red-400">Failed Services</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {health.summary.failedServices.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium capitalize"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SystemHealth;
