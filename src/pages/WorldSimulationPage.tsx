import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';
import { format } from 'date-fns';

export function WorldSimulationPage() {
  const { data: worldData, isLoading } = useQuery({
    queryKey: ['world-simulation'],
    queryFn: () => mockDataService.getWorldSimulation(),
    refetchInterval: 30000,
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-400';
      case 'high':
        return 'bg-orange-500/20 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'disaster':
        return 'bg-red-500/20 text-red-400';
      case 'discovery':
        return 'bg-green-500/20 text-green-400';
      case 'political':
        return 'bg-purple-500/20 text-purple-400';
      case 'economic':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'monster_spawn':
        return 'bg-orange-500/20 text-orange-400';
      case 'technology':
        return 'bg-cyan-500/20 text-cyan-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">World Simulation</h1>
        <p className="text-gray-400">Monitor world state, events, and discoveries</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Population"
          value={worldData?.worldState.totalPopulation.toLocaleString() || '0'}
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
          title="Economic Stability"
          value={`${worldData?.worldState.economicStability || 0}%`}
          subtitle="Overall health"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="green"
        />
        <MetricsCard
          title="Threat Level"
          value={`${worldData?.worldState.threatLevel || 0}%`}
          subtitle="Monster danger"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
          loading={isLoading}
          color="red"
        />
        <MetricsCard
          title="World Time"
          value={worldData?.worldState.currentDate.formatted || 'N/A'}
          subtitle="In-game date"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          loading={isLoading}
          color="cyan"
        />
      </div>

      {/* World State Details */}
      {worldData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">World State Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title="Active Regions"
              value={worldData.worldState.activeRegions}
              subtitle="Populated areas"
              color="cyan"
              loading={isLoading}
            />
            <MetricsCard
              title="Overall Prosperity"
              value={`${worldData.worldState.overallProsperity}%`}
              subtitle="World happiness"
              color="green"
              loading={isLoading}
            />
            <MetricsCard
              title="Technology Progress"
              value={`${worldData.worldState.technologyProgress}%`}
              subtitle="Average advancement"
              color="purple"
              loading={isLoading}
            />
            <MetricsCard
              title="Economic Stability"
              value={`${worldData.worldState.economicStability}%`}
              subtitle="Market health"
              color="yellow"
              loading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Event Statistics */}
      {worldData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Event Statistics</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Count</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last 24h</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last 7d</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {worldData.eventsByType.map((eventType, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-white capitalize">{eventType.type.replace('_', ' ')}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{eventType.count}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{eventType.last24h}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{eventType.last7d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Disaster Impact */}
      {worldData && worldData.disasterImpact.totalDisasters > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Disaster Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <MetricsCard
              title="Total Disasters"
              value={worldData.disasterImpact.totalDisasters}
              subtitle="All time"
              color="red"
              loading={isLoading}
            />
            <MetricsCard
              title="Population Lost"
              value={worldData.disasterImpact.populationLost.toLocaleString()}
              subtitle="Casualties"
              color="red"
              loading={isLoading}
            />
            <MetricsCard
              title="Economic Damage"
              value={`${worldData.disasterImpact.economicDamage.toLocaleString()}g`}
              subtitle="Gold value lost"
              color="yellow"
              loading={isLoading}
            />
            <MetricsCard
              title="Cities Affected"
              value={worldData.disasterImpact.citiesAffected.length}
              subtitle="Impacted locations"
              color="purple"
              loading={isLoading}
            />
          </div>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Disasters by Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {worldData.disasterImpact.disastersByType.map((disaster, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-xs text-gray-400 capitalize">{disaster.type}</span>
                  <span className="text-lg font-bold text-white">{disaster.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Discoveries */}
      {worldData && worldData.discoveries && worldData.discoveries.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Discoveries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {worldData.discoveries.map((discovery) => (
              <div key={discovery.id} className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{discovery.name}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 capitalize">
                        {discovery.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{discovery.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Location</span>
                    <p className="text-white">{discovery.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Discovered By</span>
                    <p className="text-white">{discovery.discoveredBy}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Value</span>
                    <p className="text-yellow-400">{discovery.value.toLocaleString()}g</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monster Activity */}
      {worldData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Monster Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <MetricsCard
              title="Total Monsters"
              value={worldData.monsterActivity.totalMonsters.toLocaleString()}
              subtitle="In the world"
              color="red"
              loading={isLoading}
            />
            <MetricsCard
              title="Active Spawns"
              value={worldData.monsterActivity.activeSpawns}
              subtitle="Spawn points"
              color="red"
              loading={isLoading}
            />
            <MetricsCard
              title="Dangerous Regions"
              value={worldData.monsterActivity.dangerousRegions.length}
              subtitle="High threat areas"
              color="yellow"
              loading={isLoading}
            />
            <MetricsCard
              title="Recent Encounters"
              value={worldData.monsterActivity.recentEncounters.length}
              subtitle="Last 24 hours"
              color="purple"
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Impact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {worldData.recentEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getEventTypeColor(event.type)}`}>
                          {event.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-white font-medium">{event.title}</div>
                        <div className="text-xs text-gray-400">{event.description}</div>
                        {event.affectedEntities.length > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            Affected: {event.affectedEntities.slice(0, 3).join(', ')}
                            {event.affectedEntities.length > 3 && ` +${event.affectedEntities.length - 3} more`}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{event.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getSeverityColor(event.severity)}`}>
                          {event.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">{event.impact}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {format(new Date(event.timestamp), 'MMM d, HH:mm')}
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
