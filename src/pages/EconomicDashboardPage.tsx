import { useQuery } from '@tanstack/react-query';
import { mockDataService } from '../services/mockDataService';
import { MetricsCard } from '../components/metrics/MetricsCard';

export function EconomicDashboardPage() {
  const { data: economicData, isLoading } = useQuery({
    queryKey: ['economic-metrics'],
    queryFn: () => mockDataService.getEconomicMetrics(),
    refetchInterval: 30000,
  });

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'rising':
        return 'text-green-400';
      case 'falling':
        return 'text-red-400';
      case 'stable':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return '↑';
      case 'falling':
        return '↓';
      case 'stable':
        return '→';
      default:
        return '→';
    }
  };

  const getScarcityColor = (level: string) => {
    switch (level) {
      case 'abundant':
        return 'bg-green-500/20 text-green-400';
      case 'normal':
        return 'bg-blue-500/20 text-blue-400';
      case 'scarce':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'critical':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRouteStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'disrupted':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'blocked':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Economic Dashboard</h1>
        <p className="text-gray-400">Monitor economy, trade, and resource markets</p>
      </div>

      {/* Economic Overview */}
      {economicData && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Economy Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <MetricsCard
              title="Total Wealth"
              value={`${(economicData.overview.totalWealth / 1000000).toFixed(1)}M`}
              subtitle="Gold in circulation"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              loading={isLoading}
              color="yellow"
            />
            <MetricsCard
              title="Daily Trade"
              value={`${(economicData.overview.dailyTradeVolume / 1000).toFixed(1)}K`}
              subtitle="Gold traded"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              }
              loading={isLoading}
              color="green"
            />
            <MetricsCard
              title="Inflation Rate"
              value={`${economicData.overview.inflationRate.toFixed(1)}%`}
              subtitle="Annual"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
              loading={isLoading}
              color="red"
            />
            <MetricsCard
              title="Economic Growth"
              value={`${economicData.overview.economicGrowth > 0 ? '+' : ''}${economicData.overview.economicGrowth.toFixed(1)}%`}
              subtitle="Annual"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              loading={isLoading}
              color={economicData.overview.economicGrowth >= 0 ? 'green' : 'red'}
            />
            <MetricsCard
              title="Unemployment"
              value={`${economicData.overview.unemploymentRate.toFixed(1)}%`}
              subtitle="Labor force"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              loading={isLoading}
              color="purple"
            />
          </div>

          {/* Wealth Distribution */}
          <div className="mt-6 bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Wealth Distribution</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400">Factions</p>
                <p className="text-2xl font-bold text-white">{economicData.overview.wealthDistribution.factions}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Cities</p>
                <p className="text-2xl font-bold text-white">{economicData.overview.wealthDistribution.cities}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Individuals</p>
                <p className="text-2xl font-bold text-white">{economicData.overview.wealthDistribution.individuals}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Prices */}
      {economicData && economicData.resourcePrices && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Resource Market Prices</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resource</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">7d Change</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trend</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {economicData.resourcePrices.map((resource, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-white">{resource.resource}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                          Tier {resource.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-yellow-400">{resource.currentPrice}g</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${resource.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {resource.priceChange24h > 0 ? '+' : ''}{resource.priceChange24h.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${resource.priceChange7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {resource.priceChange7d > 0 ? '+' : ''}{resource.priceChange7d.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-lg ${getTrendColor(resource.trend)}`}>
                          {getTrendIcon(resource.trend)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{resource.volume.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Resource Scarcity */}
      {economicData && economicData.scarcityLevels && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Resource Scarcity Levels</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resource</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Supply</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Demand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Active Nodes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Affected Cities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {economicData.scarcityLevels.map((scarcity, index) => (
                    <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-white">{scarcity.resource}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">T{scarcity.tier}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getScarcityColor(scarcity.scarcityLevel)}`}>
                          {scarcity.scarcityLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{scarcity.supply.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{scarcity.demand.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{scarcity.nodeAvailability}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {scarcity.affectedCities.length > 0 ? scarcity.affectedCities.slice(0, 2).join(', ') : 'None'}
                        {scarcity.affectedCities.length > 2 && ` +${scarcity.affectedCities.length - 2}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Trade Routes */}
      {economicData && economicData.tradeRoutes && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Active Trade Routes</h2>
          <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Profitability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Primary Goods</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Travel Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {economicData.tradeRoutes.map((route) => (
                    <tr key={route.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{route.origin}</div>
                        <div className="text-xs text-gray-400">→ {route.destination}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRouteStatusColor(route.status)}`}>
                          {route.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">{route.volume.toLocaleString()}g</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${route.profitability >= 15 ? 'text-green-400' : route.profitability >= 5 ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {route.profitability.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {route.primaryGoods.slice(0, 2).join(', ')}
                        {route.primaryGoods.length > 2 && '...'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{route.travelTime} ticks</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Market Activity */}
      {economicData && economicData.marketActivity && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Market Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <MetricsCard
              title="Active Orders"
              value={economicData.marketActivity.activeOrders.toLocaleString()}
              subtitle="Current market"
              color="cyan"
              loading={isLoading}
            />
            <MetricsCard
              title="Buy Orders"
              value={economicData.marketActivity.buyOrders.toLocaleString()}
              subtitle="Purchasing"
              color="green"
              loading={isLoading}
            />
            <MetricsCard
              title="Sell Orders"
              value={economicData.marketActivity.sellOrders.toLocaleString()}
              subtitle="Selling"
              color="blue"
              loading={isLoading}
            />
            <MetricsCard
              title="Filled Today"
              value={economicData.marketActivity.ordersFilledToday.toLocaleString()}
              subtitle="Completed"
              color="purple"
              loading={isLoading}
            />
            <MetricsCard
              title="Avg Fulfillment"
              value={`${economicData.marketActivity.averageFulfillmentTime} ticks`}
              subtitle="Time to fill"
              color="yellow"
              loading={isLoading}
            />
          </div>
          <div className="mt-4 bg-slate-800/50 rounded-lg shadow-lg border border-slate-700 p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Top Traded Resources</h3>
            <div className="flex flex-wrap gap-2">
              {economicData.marketActivity.topTradedResources.map((resource, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
                  {resource}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
