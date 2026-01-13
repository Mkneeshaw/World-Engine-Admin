import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';

export function SimulationPerformancePage() {
  const { data: simData, isLoading } = useQuery({
    queryKey: ['simulation-performance'],
    queryFn: () => mockDataService.getSimulationPerformance(),
    refetchInterval: 30000,
  });

  const formatSimulatedTime = (days: number): string => {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    if (years > 0) {
      return `${years}y ${remainingDays}d`;
    }
    return `${days}d`;
  };

  const getLoadColor = (load: number) => {
    if (load >= 80) return 'red';
    if (load >= 60) return 'yellow';
    return 'green';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Simulation Performance</h1>
        <p className="text-gray-400">Monitor simulation engine and world state</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Tick Rate"
          value={`${simData?.tickRate.current.toFixed(1) || 0} tps`}
          subtitle={`Target: ${simData?.tickRate.target || 10} tps`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          loading={isLoading}
          color="cyan"
        />
        <MetricsCard
          title="FPS"
          value={simData?.performanceMetrics.fps || '0'}
          subtitle="Frames per second"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
          loading={isLoading}
          color="green"
        />
        <MetricsCard
          title="Avg Tick Duration"
          value={`${simData?.performanceMetrics.avgTickDuration || 0}ms`}
          subtitle={`Max: ${simData?.performanceMetrics.maxTickDuration || 0}ms`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="yellow"
        />
        <MetricsCard
          title="Simulated Time"
          value={simData ? formatSimulatedTime(simData.performanceMetrics.simulatedTime) : '0d'}
          subtitle="In-game days elapsed"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          loading={isLoading}
          color="purple"
        />
      </div>

      {/* Tick Rate Details */}
      {simData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Tick Rate Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricsCard
              title="Current Rate"
              value={`${simData.tickRate.current.toFixed(2)} tps`}
              subtitle="Now"
              color="cyan"
              loading={isLoading}
            />
            <MetricsCard
              title="Target Rate"
              value={`${simData.tickRate.target} tps`}
              subtitle="Desired"
              color="blue"
              loading={isLoading}
            />
            <MetricsCard
              title="Average (60s)"
              value={`${simData.tickRate.averageLast60s.toFixed(2)} tps`}
              subtitle="Last minute"
              color="green"
              loading={isLoading}
            />
            <MetricsCard
              title="Stability"
              value={`${simData.tickRate.stability}%`}
              subtitle="Consistency"
              color={simData.tickRate.stability >= 80 ? 'green' : simData.tickRate.stability >= 60 ? 'yellow' : 'red'}
              loading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Entity Counts */}
      {simData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Active Entities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-4">
              <p className="text-xs text-gray-400 uppercase mb-1">Cities</p>
              <p className="text-2xl font-bold text-white">{simData.entityCounts.cities}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-4">
              <p className="text-xs text-gray-400 uppercase mb-1">Factions</p>
              <p className="text-2xl font-bold text-white">{simData.entityCounts.factions}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-4">
              <p className="text-xs text-gray-400 uppercase mb-1">Characters</p>
              <p className="text-2xl font-bold text-white">{simData.entityCounts.characters.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-4">
              <p className="text-xs text-gray-400 uppercase mb-1">Quests</p>
              <p className="text-2xl font-bold text-white">{simData.entityCounts.quests}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-4">
              <p className="text-xs text-gray-400 uppercase mb-1">Trade Routes</p>
              <p className="text-2xl font-bold text-white">{simData.entityCounts.tradeRoutes}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-4">
              <p className="text-xs text-gray-400 uppercase mb-1">Monsters</p>
              <p className="text-2xl font-bold text-white">{simData.entityCounts.monsters}</p>
            </div>
          </div>
          <div className="mt-4 bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-4">
            <p className="text-sm text-gray-400">Total Entities</p>
            <p className="text-3xl font-bold text-white">{simData.entityCounts.total.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* System Load */}
      {simData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">System Load Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricsCard
              title="Pathfinding"
              value={`${simData.systemLoad.pathfinding}%`}
              subtitle="Navigation calculations"
              color={getLoadColor(simData.systemLoad.pathfinding)}
              loading={isLoading}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              }
            />
            <MetricsCard
              title="Economy"
              value={`${simData.systemLoad.economy}%`}
              subtitle="Trade & resource simulation"
              color={getLoadColor(simData.systemLoad.economy)}
              loading={isLoading}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <MetricsCard
              title="Combat"
              value={`${simData.systemLoad.combat}%`}
              subtitle="Battle processing"
              color={getLoadColor(simData.systemLoad.combat)}
              loading={isLoading}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              }
            />
            <MetricsCard
              title="Quest Generation"
              value={`${simData.systemLoad.questGeneration}%`}
              subtitle="Dynamic quests"
              color={getLoadColor(simData.systemLoad.questGeneration)}
              loading={isLoading}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              }
            />
            <MetricsCard
              title="AI Processing"
              value={`${simData.systemLoad.ai}%`}
              subtitle="NPC decision making"
              color={getLoadColor(simData.systemLoad.ai)}
              loading={isLoading}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            />
            <MetricsCard
              title="Overall Load"
              value={`${simData.systemLoad.overall}%`}
              subtitle="Total system usage"
              color={getLoadColor(simData.systemLoad.overall)}
              loading={isLoading}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      {simData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Performance Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricsCard
              title="Memory Usage"
              value={`${simData.performanceMetrics.memoryUsage} MB`}
              subtitle="Simulation memory"
              color="purple"
              loading={isLoading}
            />
            <MetricsCard
              title="Max Tick Duration"
              value={`${simData.performanceMetrics.maxTickDuration}ms`}
              subtitle="Longest tick"
              color="red"
              loading={isLoading}
            />
            <MetricsCard
              title="Avg Tick Duration"
              value={`${simData.performanceMetrics.avgTickDuration}ms`}
              subtitle="Mean tick time"
              color="blue"
              loading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Bottlenecks */}
      {simData && simData.bottlenecks && simData.bottlenecks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Performance Bottlenecks</h2>
          <div className="space-y-3">
            {simData.bottlenecks.map((bottleneck, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{bottleneck.system}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getSeverityColor(bottleneck.severity)}`}>
                        {bottleneck.severity} severity
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      <span className="text-gray-400">Impact:</span> {bottleneck.impact}
                    </p>
                    <p className="text-sm text-blue-400">
                      <span className="text-gray-400">Recommendation:</span> {bottleneck.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
