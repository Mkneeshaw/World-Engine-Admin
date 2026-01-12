import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';
import { BarChartCard } from '../components/metrics/BarChartCard';
import { format } from 'date-fns';

export function WorldSimulationPage() {
  const { data: worldData, isLoading } = useQuery({
    queryKey: ['world-simulation'],
    queryFn: () => mockDataService.getWorldSimulation(),
    refetchInterval: 30000,
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">World Simulation</h1>
        <p className="text-gray-400">Monitor population, economy, and world events</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Population"
          value={worldData?.totalPopulation.toLocaleString() || '0'}
          subtitle="Across all regions"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          loading={isLoading}
          color="purple"
        />
        <MetricsCard
          title="Active Regions"
          value={worldData?.activeRegions || '0'}
          subtitle="Currently active"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          }
          loading={isLoading}
          color="cyan"
        />
        <MetricsCard
          title="Economy Health"
          value={`${worldData?.economyHealth || 0}%`}
          subtitle="Overall prosperity"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="green"
        />
        <MetricsCard
          title="World Time"
          value={worldData ? `Year ${worldData.worldTime.year}, Day ${worldData.worldTime.day}` : 'N/A'}
          subtitle={worldData?.worldTime.season || 'Unknown'}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="yellow"
        />
      </div>

      {/* Population by Region Chart */}
      <BarChartCard
        title="Population by Region"
        data={worldData?.populationByRegion || []}
        dataKeys={[
          { key: 'population', color: '#3B82F6', name: 'Population' },
          { key: 'prosperity', color: '#10B981', name: 'Prosperity' },
        ]}
        xAxisKey="region"
        loading={isLoading}
      />

      {/* Economy Stats */}
      {worldData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Economy Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <MetricsCard
              title="Total Wealth"
              value={`${(worldData.economyStats.totalWealth / 1000000).toFixed(1)}M`}
              subtitle="Gold coins"
              color="yellow"
              loading={isLoading}
            />
            <MetricsCard
              title="Trade Volume"
              value={worldData.economyStats.tradeVolume.toLocaleString()}
              subtitle="Transactions"
              color="cyan"
              loading={isLoading}
            />
            <MetricsCard
              title="Inflation Rate"
              value={`${worldData.economyStats.inflationRate.toFixed(1)}%`}
              subtitle="Annual"
              color="red"
              loading={isLoading}
            />
            <MetricsCard
              title="Unemployment"
              value={`${worldData.economyStats.unemployment.toFixed(1)}%`}
              subtitle="Labor force"
              color="purple"
              loading={isLoading}
            />
            <MetricsCard
              title="Avg Income"
              value={`${worldData.economyStats.averageIncome}g`}
              subtitle="Per capita"
              color="green"
              loading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Recent Events */}
      {worldData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent World Events</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {worldData.recentEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.type === 'battle' ? 'bg-red-500/20 text-red-400' :
                          event.type === 'trade' ? 'bg-green-500/20 text-green-400' :
                          event.type === 'disaster' ? 'bg-orange-500/20 text-orange-400' :
                          event.type === 'festival' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white font-medium">{event.title}</div>
                        <div className="text-xs text-gray-400">{event.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.region}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          event.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          event.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {event.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {format(new Date(event.timestamp), 'HH:mm:ss')}
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
