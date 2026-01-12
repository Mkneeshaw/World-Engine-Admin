import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';
import { BarChartCard } from '../components/metrics/BarChartCard';
import { format } from 'date-fns';

export function BattlesPage() {
  const { data: battleData, isLoading } = useQuery({
    queryKey: ['battle-metrics'],
    queryFn: () => mockDataService.getBattleMetrics(),
    refetchInterval: 30000,
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Battle System</h1>
        <p className="text-gray-400">Combat statistics and battle analytics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Battles"
          value={battleData?.totalBattles.toLocaleString() || '0'}
          subtitle="All time"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
          loading={isLoading}
          color="red"
        />
        <MetricsCard
          title="Active Battles"
          value={battleData?.activeBattles || '0'}
          subtitle="Currently ongoing"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          }
          loading={isLoading}
          color="yellow"
        />
        <MetricsCard
          title="Player Victories"
          value={battleData?.playerVictories.toLocaleString() || '0'}
          subtitle={`${battleData ? ((battleData.playerVictories / battleData.totalBattles) * 100).toFixed(1) : 0}% win rate`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          }
          loading={isLoading}
          color="green"
        />
        <MetricsCard
          title="Avg Duration"
          value={`${battleData?.averageDuration || 0}s`}
          subtitle="Per battle"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="purple"
        />
      </div>

      {/* Damage Distribution */}
      {battleData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Damage Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricsCard
              title="Physical Damage"
              value={battleData.damageDistribution.physical.toLocaleString()}
              subtitle="Melee & ranged"
              color="red"
              loading={isLoading}
            />
            <MetricsCard
              title="Magical Damage"
              value={battleData.damageDistribution.magical.toLocaleString()}
              subtitle="Spells & curses"
              color="purple"
              loading={isLoading}
            />
            <MetricsCard
              title="Elemental Damage"
              value={battleData.damageDistribution.elemental.toLocaleString()}
              subtitle="Fire, ice, lightning"
              color="cyan"
              loading={isLoading}
            />
            <MetricsCard
              title="Total Damage"
              value={battleData.damageDistribution.total.toLocaleString()}
              subtitle="All types combined"
              color="yellow"
              loading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Battles by Type */}
      {battleData && (
        <BarChartCard
          title="Battles by Type"
          data={battleData.battlesByType}
          dataKeys={[
            { key: 'count', color: '#3B82F6', name: 'Battle Count' },
          ]}
          xAxisKey="type"
          loading={isLoading}
        />
      )}

      {/* Battle Type Stats */}
      {battleData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Battle Type Statistics</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Count</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Win Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {battleData.battlesByType.map((battle) => (
                    <tr key={battle.type} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                          battle.type === 'pvp' ? 'bg-red-500/20 text-red-400' :
                          battle.type === 'pve' ? 'bg-blue-500/20 text-blue-400' :
                          battle.type === 'boss' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {battle.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{battle.count.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          battle.winRate > 60 ? 'bg-green-500/20 text-green-400' :
                          battle.winRate > 40 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {battle.winRate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{battle.averageDuration}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Skill Usage */}
      {battleData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Top Skills Used</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Skill</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Usage Count</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg Damage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hit Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {battleData.skillUsage.map((skill, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{skill.skillName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{skill.usageCount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{skill.averageDamage.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-300 mr-2">{skill.hitRate.toFixed(1)}%</span>
                          <div className="w-20 bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${skill.hitRate}%` }}
                            />
                          </div>
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

      {/* Recent Battles */}
      {battleData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Battles</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Participants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Winner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Damage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {battleData.recentBattles.map((battle) => (
                    <tr key={battle.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                          battle.type === 'pvp' ? 'bg-red-500/20 text-red-400' :
                          battle.type === 'pve' ? 'bg-blue-500/20 text-blue-400' :
                          battle.type === 'boss' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {battle.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{battle.participants.length} players</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{battle.winner}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{battle.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{battle.duration}s</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{battle.totalDamage.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {format(new Date(battle.timestamp), 'HH:mm:ss')}
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
