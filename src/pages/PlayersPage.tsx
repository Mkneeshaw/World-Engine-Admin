import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';
import { TimeSeriesChart } from '../components/metrics/TimeSeriesChart';
import { format } from 'date-fns';

export function PlayersPage() {
  const { data: playerData, isLoading } = useQuery({
    queryKey: ['player-metrics'],
    queryFn: () => mockDataService.getPlayerMetrics(),
    refetchInterval: 30000,
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Player Activity</h1>
        <p className="text-gray-400">Monitor active players and session data</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Active Players"
          value={playerData?.activePlayers || '0'}
          subtitle="Currently online"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="blue"
        />
        <MetricsCard
          title="Total Sessions"
          value={playerData?.totalSessions || '0'}
          subtitle="Active sessions"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          loading={isLoading}
          color="green"
        />
        <MetricsCard
          title="New Players"
          value={playerData?.newPlayers || '0'}
          subtitle="Last 24 hours"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          }
          loading={isLoading}
          color="cyan"
        />
        <MetricsCard
          title="Avg Session"
          value={`${playerData?.averageSessionDuration || 0}m`}
          subtitle="Duration"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="purple"
        />
      </div>

      {/* Activity Over Time Chart */}
      {playerData && (
        <TimeSeriesChart
          title="Player Activity (24 Hours)"
          data={playerData.activityByHour}
          dataKeys={[
            { key: 'activePlayers', color: '#3B82F6', name: 'Active Players' },
            { key: 'newSessions', color: '#10B981', name: 'New Sessions' },
          ]}
          loading={isLoading}
        />
      )}

      {/* Top Players */}
      {playerData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Top Players</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Character</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Playtime</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Achievements</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Seen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {playerData.topPlayers.map((player, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-titan-cyan">#{index + 1}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{player.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.characterName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                          Lvl {player.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.playtime}h</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.achievements}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {format(new Date(player.lastSeen), 'MMM d, HH:mm')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Recent Sessions */}
      {playerData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Sessions</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Character</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {playerData.recentSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            session.status === 'active' ? 'bg-green-500 animate-pulse' :
                            session.status === 'idle' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }`} />
                          <span className="text-sm text-gray-300 capitalize">{session.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{session.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{session.characterName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{session.level}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{session.region}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{session.duration}m</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{session.actions}</td>
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
