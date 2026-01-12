import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';
import { TimeSeriesChart } from '../components/metrics/TimeSeriesChart';
import { BarChartCard } from '../components/metrics/BarChartCard';

export function ServerPerformancePage() {
  const { data: serverData, isLoading } = useQuery({
    queryKey: ['server-metrics'],
    queryFn: () => mockDataService.getServerMetrics(),
    refetchInterval: 30000,
  });

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Server Performance</h1>
        <p className="text-gray-400">Monitor API health and server resources</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Requests"
          value={serverData?.totalRequests.toLocaleString() || '0'}
          subtitle={`${serverData?.successfulRequests.toLocaleString() || '0'} successful`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
          loading={isLoading}
          color="blue"
        />
        <MetricsCard
          title="Error Rate"
          value={`${serverData?.errorRate.toFixed(2) || 0}%`}
          subtitle={`${serverData?.failedRequests || 0} failed`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="red"
        />
        <MetricsCard
          title="Avg Response Time"
          value={`${serverData?.responseTimes.avg || 0}ms`}
          subtitle={`P95: ${serverData?.responseTimes.p95 || 0}ms`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          loading={isLoading}
          color="yellow"
        />
        <MetricsCard
          title="Uptime"
          value={serverData ? formatUptime(serverData.uptime) : '0d 0h 0m'}
          subtitle="Since last restart"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="green"
        />
      </div>

      {/* Response Time Distribution */}
      {serverData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricsCard
            title="P50 (Median)"
            value={`${serverData.responseTimes.p50}ms`}
            subtitle="50th percentile"
            color="green"
            loading={isLoading}
          />
          <MetricsCard
            title="P95"
            value={`${serverData.responseTimes.p95}ms`}
            subtitle="95th percentile"
            color="yellow"
            loading={isLoading}
          />
          <MetricsCard
            title="P99"
            value={`${serverData.responseTimes.p99}ms`}
            subtitle="99th percentile"
            color="red"
            loading={isLoading}
          />
          <MetricsCard
            title="Average"
            value={`${serverData.responseTimes.avg}ms`}
            subtitle="Mean response time"
            color="blue"
            loading={isLoading}
          />
        </div>
      )}

      {/* Requests Over Time */}
      {serverData && (
        <TimeSeriesChart
          title="API Requests (24 Hours)"
          data={serverData.requestsOverTime}
          dataKeys={[
            { key: 'successful', color: '#10B981', name: 'Successful' },
            { key: 'failed', color: '#EF4444', name: 'Failed' },
          ]}
          loading={isLoading}
        />
      )}

      {/* Endpoint Performance */}
      {serverData && (
        <BarChartCard
          title="Requests by Endpoint"
          data={serverData.requestsByEndpoint}
          dataKeys={[
            { key: 'requests', color: '#3B82F6', name: 'Total Requests' },
          ]}
          xAxisKey="endpoint"
          loading={isLoading}
        />
      )}

      {/* Server Health */}
      {serverData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Server Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title="CPU Usage"
              value={`${serverData.serverHealth.cpu}%`}
              subtitle="Processor load"
              color={serverData.serverHealth.cpu > 80 ? 'red' : serverData.serverHealth.cpu > 60 ? 'yellow' : 'green'}
              loading={isLoading}
            />
            <MetricsCard
              title="Memory Usage"
              value={`${serverData.serverHealth.memory}%`}
              subtitle="RAM utilization"
              color={serverData.serverHealth.memory > 80 ? 'red' : serverData.serverHealth.memory > 60 ? 'yellow' : 'green'}
              loading={isLoading}
            />
            <MetricsCard
              title="Disk Usage"
              value={`${serverData.serverHealth.disk}%`}
              subtitle="Storage capacity"
              color={serverData.serverHealth.disk > 80 ? 'red' : serverData.serverHealth.disk > 60 ? 'yellow' : 'green'}
              loading={isLoading}
            />
            <MetricsCard
              title="Network"
              value={`${serverData.serverHealth.network.toFixed(2)} MB/s`}
              subtitle="Transfer rate"
              color="cyan"
              loading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Error Distribution */}
      {serverData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Error Distribution</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Error Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Count</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Visual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {serverData.errorsByType.map((error, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white">{error.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{error.count}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{error.percentage.toFixed(2)}%</td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${error.percentage}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Endpoint Details Table */}
      {serverData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Endpoint Performance Details</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Endpoint</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Requests</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg Response Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Error Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {serverData.requestsByEndpoint.map((endpoint, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-white">{endpoint.endpoint}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{endpoint.requests.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{endpoint.avgResponseTime}ms</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          endpoint.errorRate < 1 ? 'bg-green-500/20 text-green-400' :
                          endpoint.errorRate < 3 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {endpoint.errorRate.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
