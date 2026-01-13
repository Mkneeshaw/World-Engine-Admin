import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';

export function CitiesPage() {
  const { data: cityData, isLoading } = useQuery({
    queryKey: ['city-metrics'],
    queryFn: () => mockDataService.getCityMetrics(),
    refetchInterval: 30000,
  });

  const getFoodStatusColor = (status: string) => {
    switch (status) {
      case 'abundant':
        return 'text-green-400';
      case 'sufficient':
        return 'text-blue-400';
      case 'low':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getEconomicHealthColor = (health: number) => {
    if (health >= 70) return 'text-green-400';
    if (health >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">City Management</h1>
        <p className="text-gray-400">Monitor cities across the simulation world</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Cities"
          value={cityData?.totalCities || '0'}
          subtitle="Across all regions"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          loading={isLoading}
          color="cyan"
        />
        <MetricsCard
          title="Total Population"
          value={cityData?.averagePopulation ? (cityData.averagePopulation * cityData.totalCities).toLocaleString() : '0'}
          subtitle={`Avg ${cityData?.averagePopulation.toLocaleString() || 0} per city`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          loading={isLoading}
          color="purple"
        />
        <MetricsCard
          title="Cities in Crisis"
          value={cityData?.citiesInCrisis || '0'}
          subtitle="Food or economic trouble"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
          loading={isLoading}
          color="red"
        />
        <MetricsCard
          title="Trade Routes"
          value={cityData?.totalTradeRoutes || '0'}
          subtitle="Active connections"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          }
          loading={isLoading}
          color="green"
        />
      </div>

      {/* Regional Statistics */}
      {cityData && cityData.regionStats && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Regional Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityData.regionStats.map((region, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{region.name}</h3>
                  <span className="text-xs text-gray-400">{region.controllingFaction}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Cities</span>
                    <span className="text-sm font-medium text-white">{region.cities}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Population</span>
                    <span className="text-sm font-medium text-white">{region.totalPopulation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Prosperity</span>
                    <span className={`text-sm font-medium ${getEconomicHealthColor(region.prosperity)}`}>
                      {region.prosperity}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Resource Nodes</span>
                    <span className="text-sm font-medium text-white">{region.activeNodes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Danger Level</span>
                    <span className={`text-sm font-medium ${region.dangerLevel > 60 ? 'text-red-400' : region.dangerLevel > 30 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {region.dangerLevel}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* City List */}
      {cityData && cityData.cities && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">All Cities</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">City</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Population</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Treasury</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Economic Health</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Food Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trade Routes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Active Quests</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Faction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {cityData.cities.map((city) => (
                    <tr key={city.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{city.name}</div>
                        <div className="text-xs text-gray-400">
                          {city.populationGrowth > 0 ? '+' : ''}{city.populationGrowth.toFixed(1)}% growth
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{city.region}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{city.population.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">{city.treasury.toLocaleString()}g</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                city.economicHealth >= 70 ? 'bg-green-500' :
                                city.economicHealth >= 40 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${city.economicHealth}%` }}
                            />
                          </div>
                          <span className={`text-sm ${getEconomicHealthColor(city.economicHealth)}`}>
                            {city.economicHealth}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <span className={getFoodStatusColor(city.foodStatus)}>{city.foodReserves}d</span>
                          <span className="text-xs text-gray-500 ml-1 capitalize">({city.foodStatus})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">{city.tradeRoutes}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{city.activeQuests}</div>
                        <div className="text-xs text-green-400">+{city.completedQuestsToday} today</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                          {city.factionControl}
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
