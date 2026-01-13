import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';

export function FactionsPage() {
  const { data: factionData, isLoading } = useQuery({
    queryKey: ['faction-metrics'],
    queryFn: () => mockDataService.getFactionMetrics(),
    refetchInterval: 30000,
  });

  const getRelationshipColor = (standing: number) => {
    if (standing >= 50) return 'text-green-400';
    if (standing >= 0) return 'text-blue-400';
    if (standing >= -50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRelationshipStatusColor = (status: string) => {
    switch (status) {
      case 'allied':
        return 'bg-green-500/20 text-green-400';
      case 'friendly':
        return 'bg-blue-500/20 text-blue-400';
      case 'neutral':
        return 'bg-gray-500/20 text-gray-400';
      case 'tense':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'hostile':
        return 'bg-orange-500/20 text-orange-400';
      case 'at_war':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getConflictTypeColor = (type: string) => {
    switch (type) {
      case 'war':
        return 'bg-red-500/20 text-red-400';
      case 'raid':
        return 'bg-orange-500/20 text-orange-400';
      case 'skirmish':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'territorial_dispute':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Faction Dynamics</h1>
        <p className="text-gray-400">Monitor factions, conflicts, and diplomatic relations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Factions"
          value={factionData?.totalFactions || '0'}
          subtitle="Active powers"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
          loading={isLoading}
          color="blue"
        />
        <MetricsCard
          title="Active Conflicts"
          value={factionData?.activeConflicts.length || '0'}
          subtitle="Wars & disputes"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          }
          loading={isLoading}
          color="red"
        />
        <MetricsCard
          title="Recent Treaties"
          value={factionData?.recentTreaties.length || '0'}
          subtitle="Past 7 days"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          loading={isLoading}
          color="green"
        />
        <MetricsCard
          title="Diplomatic Relations"
          value={factionData?.relationshipMatrix.length || '0'}
          subtitle="Active relationships"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          loading={isLoading}
          color="purple"
        />
      </div>

      {/* Active Conflicts */}
      {factionData && factionData.activeConflicts && factionData.activeConflicts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Active Conflicts</h2>
          <div className="space-y-4">
            {factionData.activeConflicts.map((conflict) => (
              <div key={conflict.id} className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${getConflictTypeColor(conflict.type)}`}>
                        {conflict.type.replace('_', ' ')}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        conflict.status === 'active' ? 'bg-red-500/20 text-red-400' :
                        conflict.status === 'ceasefire' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {conflict.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{conflict.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <span className="text-xs text-gray-400">Factions Involved</span>
                    <p className="text-sm text-white mt-1">{conflict.factions.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Started</span>
                    <p className="text-sm text-white mt-1">{conflict.startDate}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Casualties</span>
                    <p className="text-sm text-red-400 mt-1">{conflict.casualties.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Territories Disputed</span>
                    <p className="text-sm text-white mt-1">{conflict.territoriesDisputed.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Faction List */}
      {factionData && factionData.factions && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">All Factions</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Faction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Members</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cities</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Treasury</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Military</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Technology</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Reputation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Recent Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {factionData.factions.map((faction) => (
                    <tr key={faction.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{faction.name}</div>
                        <div className="text-xs text-gray-400">{faction.regionsControlled} regions</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 capitalize">
                          {faction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{faction.memberCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{faction.citiesControlled}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">{faction.treasury.toLocaleString()}g</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                faction.militaryStrength >= 70 ? 'bg-red-500' :
                                faction.militaryStrength >= 40 ? 'bg-yellow-500' :
                                'bg-gray-500'
                              }`}
                              style={{ width: `${faction.militaryStrength}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-300">{faction.militaryStrength}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                            <div
                              className="bg-cyan-500 h-2 rounded-full"
                              style={{ width: `${faction.technologyLevel}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-300">{faction.technologyLevel}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${faction.reputation >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {faction.reputation > 0 ? '+' : ''}{faction.reputation}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">{faction.recentActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Diplomatic Relations */}
      {factionData && factionData.relationshipMatrix && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Diplomatic Relations</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Faction 1</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Faction 2</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Standing</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Treaties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {factionData.relationshipMatrix.map((rel, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{rel.faction1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{rel.faction2}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRelationshipStatusColor(rel.status)}`}>
                          {rel.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-700 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                rel.standing >= 50 ? 'bg-green-500' :
                                rel.standing >= 0 ? 'bg-blue-500' :
                                rel.standing >= -50 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${Math.abs(rel.standing)}%` }}
                            />
                          </div>
                          <span className={`text-sm ${getRelationshipColor(rel.standing)}`}>
                            {rel.standing > 0 ? '+' : ''}{rel.standing}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {rel.treaties.length > 0 ? rel.treaties.join(', ') : 'None'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Recent Treaties */}
      {factionData && factionData.recentTreaties && factionData.recentTreaties.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Diplomatic Events</h2>
          <div className="space-y-3">
            {factionData.recentTreaties.map((treaty) => (
              <div key={treaty.id} className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        treaty.type === 'alliance' ? 'bg-green-500/20 text-green-400' :
                        treaty.type === 'treaty' ? 'bg-blue-500/20 text-blue-400' :
                        treaty.type === 'trade_agreement' ? 'bg-yellow-500/20 text-yellow-400' :
                        treaty.type === 'peace' ? 'bg-cyan-500/20 text-cyan-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {treaty.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500">{treaty.date}</span>
                    </div>
                    <p className="text-sm text-gray-300">{treaty.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Participants: {treaty.factions.join(', ')}
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
