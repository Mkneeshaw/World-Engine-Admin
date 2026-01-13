import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';

export function OverviewPage() {
  const { data: overview, isLoading } = useQuery({
    queryKey: ['metrics-overview'],
    queryFn: () => mockDataService.getOverview(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'healthy':
        return 'Simulation Running Smoothly';
      case 'warning':
        return 'Minor Issues Detected';
      case 'critical':
        return 'Critical Simulation Issues';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">System Overview</h1>
        <p className="text-gray-400">
          Real-time monitoring of Titan Saga's deep simulation
        </p>
      </div>

      {/* System Status Banner */}
      {overview && (
        <div
          className={`rounded-lg p-6 border-2 ${
            overview.systemStatus === 'healthy'
              ? 'bg-green-500/10 border-green-500/50'
              : overview.systemStatus === 'warning'
              ? 'bg-yellow-500/10 border-yellow-500/50'
              : 'bg-red-500/10 border-red-500/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  overview.systemStatus === 'healthy'
                    ? 'bg-green-500 animate-pulse'
                    : overview.systemStatus === 'warning'
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-red-500 animate-pulse'
                }`}
              />
              <div>
                <h2 className="text-xl font-bold text-white">
                  {getStatusText(overview.systemStatus)}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {overview.world.date.formatted} • Tick #{overview.simulation.currentTick.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Simulation Speed</p>
              <p className="text-2xl font-bold text-white">
                {overview.simulation.tickRate.toFixed(1)} tps
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {overview.simulation.fps} FPS
              </p>
            </div>
          </div>
        </div>
      )}

      {/* World Metrics */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-titan-cyan"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          World State
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricsCard
            title="Total Population"
            value={overview?.world.population.toLocaleString() || '0'}
            subtitle="Across all cities"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            loading={isLoading}
            color="purple"
          />
          <MetricsCard
            title="Cities"
            value={overview?.world.totalCities || '0'}
            subtitle={`${overview?.world.activeRegions || 0} regions`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            }
            loading={isLoading}
            color="cyan"
          />
          <MetricsCard
            title="Factions"
            value={overview?.world.totalFactions || '0'}
            subtitle="Active powers"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
            loading={isLoading}
            color="blue"
          />
          <MetricsCard
            title="Active Regions"
            value={overview?.world.activeRegions || '0'}
            subtitle="Populated areas"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            }
            loading={isLoading}
            color="green"
          />
        </div>
      </div>

      {/* Economy Metrics */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-titan-amber"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Economic Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricsCard
            title="Total Wealth"
            value={`${(overview?.economy.totalWealth || 0).toLocaleString()}g`}
            subtitle="Across all entities"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            loading={isLoading}
            color="yellow"
          />
          <MetricsCard
            title="Trade Volume"
            value={`${(overview?.economy.tradeVolume24h || 0).toLocaleString()}g`}
            subtitle="Last 24 hours"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            }
            loading={isLoading}
            color="green"
          />
          <MetricsCard
            title="Economic Health"
            value={`${overview?.economy.economicHealth || 0}%`}
            subtitle="Overall stability"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            }
            loading={isLoading}
            color="blue"
          />
          <MetricsCard
            title="Critical Shortages"
            value={overview?.economy.criticalShortages || '0'}
            subtitle="Resources in crisis"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
            loading={isLoading}
            color="red"
          />
        </div>
      </div>

      {/* Conflicts & Diplomacy */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          Conflicts & Diplomacy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsCard
            title="Active Wars"
            value={overview?.conflicts.activeWars || '0'}
            subtitle="Ongoing conflicts"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
            }
            loading={isLoading}
            color="red"
          />
          <MetricsCard
            title="Tense Relations"
            value={overview?.conflicts.tenseDiplomacy || '0'}
            subtitle="Diplomatic tensions"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
            loading={isLoading}
            color="yellow"
          />
          <MetricsCard
            title="Recent Treaties"
            value={overview?.conflicts.recentTreaties || '0'}
            subtitle="Past 7 days"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            loading={isLoading}
            color="green"
          />
        </div>
      </div>

      {/* Recent Alerts */}
      {overview && overview.alerts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {overview.alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg p-4 border ${
                  alert.type === 'critical'
                    ? 'bg-red-500/10 border-red-500/50'
                    : alert.type === 'error'
                    ? 'bg-red-500/10 border-red-500/30'
                    : alert.type === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500/50'
                    : 'bg-blue-500/10 border-blue-500/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{alert.title}</h3>
                    <p className="text-sm text-gray-400">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
