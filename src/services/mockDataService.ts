import type {
  WorldSimulationMetrics,
  PlayerMetrics,
  ServerMetrics,
  BattleMetrics,
  OverviewMetrics,
  WorldEvent,
  PlayerSession,
  RecentBattle
} from '../types/metrics';

// Helper function to generate random number in range
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random float in range
const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

// Helper function to get a random item from array
const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Region names for Titan Saga
const regions = ['Titan\'s Rest', 'Shadowfall', 'Crystal Plains', 'Ironforge', 'Mystic Woods', 'Dragon\'s Peak', 'Coastal Haven', 'Desert Wastes'];
const eventTypes: WorldEvent['type'][] = ['battle', 'trade', 'disaster', 'festival', 'discovery'];
const severities: WorldEvent['severity'][] = ['low', 'medium', 'high', 'critical'];
const battleTypes: ('pvp' | 'pve' | 'boss' | 'arena')[] = ['pvp', 'pve', 'boss', 'arena'];
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
const skillNames = ['Fireball', 'Lightning Strike', 'Heal', 'Shield Bash', 'Arrow Volley', 'Ice Shard', 'Shadow Step', 'Earth Shatter'];

// Mock data generators
export const mockDataService = {
  getWorldSimulation: (): WorldSimulationMetrics => {
    const totalPopulation = random(50000, 100000);
    const activeRegions = random(6, 8);

    const recentEvents: WorldEvent[] = Array.from({ length: 10 }, (_, i) => ({
      id: `event-${i}`,
      type: randomItem(eventTypes),
      title: `${randomItem(['Great', 'Minor', 'Massive', 'Unexpected'])} ${randomItem(['Battle', 'Trade Deal', 'Storm', 'Festival', 'Discovery'])}`,
      description: `A significant event occurred in ${randomItem(regions)}`,
      region: randomItem(regions),
      timestamp: new Date(Date.now() - random(0, 86400000)).toISOString(),
      severity: randomItem(severities),
    }));

    const populationByRegion = regions.map(region => ({
      region,
      population: random(5000, 15000),
      growth: randomFloat(-2, 5),
      prosperity: random(40, 95),
    }));

    return {
      totalPopulation,
      activeRegions,
      economyHealth: random(60, 90),
      worldTime: {
        day: random(1, 365),
        season: randomItem(seasons),
        year: random(1, 10),
      },
      recentEvents,
      populationByRegion,
      economyStats: {
        totalWealth: random(10000000, 50000000),
        tradeVolume: random(100000, 500000),
        inflationRate: randomFloat(1, 5),
        unemployment: randomFloat(2, 8),
        averageIncome: random(50, 200),
      },
    };
  },

  getPlayerMetrics: (): PlayerMetrics => {
    const activePlayers = random(100, 500);
    const totalSessions = random(150, 600);

    const usernames = ['DragonSlayer', 'ShadowHunter', 'MysticMage', 'IronKnight', 'SwiftArcher', 'DarkPaladin', 'LightHealer', 'StormCaller'];
    const characterNames = ['Thorin', 'Lyra', 'Zephyr', 'Kael', 'Aria', 'Magnus', 'Selene', 'Raven'];

    const recentSessions: PlayerSession[] = Array.from({ length: 20 }, (_, i) => ({
      id: `session-${i}`,
      username: randomItem(usernames),
      characterName: randomItem(characterNames),
      level: random(1, 100),
      startTime: new Date(Date.now() - random(0, 7200000)).toISOString(),
      duration: random(10, 180),
      actions: random(50, 500),
      region: randomItem(regions),
      status: randomItem(['active', 'idle', 'offline'] as const),
    }));

    const topPlayers = Array.from({ length: 10 }, (_, i) => ({
      username: usernames[i % usernames.length],
      characterName: characterNames[i % characterNames.length],
      level: random(80, 100),
      playtime: random(50, 500),
      achievements: random(20, 100),
      lastSeen: new Date(Date.now() - random(0, 3600000)).toISOString(),
    }));

    const activityByHour = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date();
      hour.setHours(i, 0, 0, 0);
      return {
        timestamp: hour.toISOString(),
        activePlayers: random(50, 300),
        newSessions: random(20, 100),
      };
    });

    return {
      activePlayers,
      totalSessions,
      averageSessionDuration: random(30, 120),
      newPlayers: random(10, 50),
      returningPlayers: activePlayers - random(10, 50),
      recentSessions,
      topPlayers,
      activityByHour,
    };
  },

  getServerMetrics: (): ServerMetrics => {
    const totalRequests = random(10000, 50000);
    const failedRequests = random(100, 500);
    const successfulRequests = totalRequests - failedRequests;

    const endpoints = ['/api/player/login', '/api/world/state', '/api/battle/start', '/api/trade/execute', '/api/player/stats'];

    const requestsByEndpoint = endpoints.map(endpoint => ({
      endpoint,
      requests: random(1000, 10000),
      avgResponseTime: random(50, 500),
      errorRate: randomFloat(0, 5),
    }));

    const requestsOverTime = Array.from({ length: 24 }, (_, i) => {
      const timestamp = new Date(Date.now() - (23 - i) * 3600000);
      const requests = random(1000, 5000);
      const failed = random(10, 100);
      return {
        timestamp: timestamp.toISOString(),
        requests,
        successful: requests - failed,
        failed,
      };
    });

    const errorsByType = [
      { type: '500 Internal Server Error', count: random(50, 200), percentage: randomFloat(1, 3) },
      { type: '404 Not Found', count: random(30, 100), percentage: randomFloat(0.5, 2) },
      { type: '403 Forbidden', count: random(20, 80), percentage: randomFloat(0.3, 1.5) },
      { type: '400 Bad Request', count: random(40, 150), percentage: randomFloat(0.7, 2.5) },
    ];

    return {
      uptime: random(86400, 2592000),
      totalRequests,
      successfulRequests,
      failedRequests,
      errorRate: (failedRequests / totalRequests) * 100,
      responseTimes: {
        avg: random(100, 300),
        p50: random(80, 200),
        p95: random(300, 800),
        p99: random(800, 1500),
      },
      requestsByEndpoint,
      requestsOverTime,
      errorsByType,
      serverHealth: {
        cpu: random(20, 80),
        memory: random(30, 70),
        disk: random(40, 60),
        network: randomFloat(1, 10),
      },
    };
  },

  getBattleMetrics: (): BattleMetrics => {
    const totalBattles = random(1000, 5000);
    const activeBattles = random(10, 50);
    const playerVictories = random(500, 2500);
    const playerDefeats = totalBattles - playerVictories - activeBattles;

    const recentBattles: RecentBattle[] = Array.from({ length: 15 }, (_, i) => {
      const type = randomItem(battleTypes);
      const participants = Array.from({ length: random(2, 6) }, () => `Player${random(1, 100)}`);
      return {
        id: `battle-${i}`,
        type,
        participants,
        winner: randomItem(participants),
        duration: random(30, 600),
        totalDamage: random(5000, 50000),
        timestamp: new Date(Date.now() - random(0, 86400000)).toISOString(),
        location: randomItem(regions),
      };
    });

    const skillUsage = skillNames.map(skillName => ({
      skillName,
      usageCount: random(100, 1000),
      averageDamage: random(500, 3000),
      hitRate: randomFloat(60, 95),
    }));

    const battlesByType = battleTypes.map(type => ({
      type,
      count: random(200, 1500),
      winRate: randomFloat(45, 65),
      averageDuration: random(60, 300),
    }));

    return {
      totalBattles,
      activeBattles,
      averageDuration: random(120, 300),
      playerVictories,
      playerDefeats,
      recentBattles,
      skillUsage,
      damageDistribution: {
        physical: random(30000, 100000),
        magical: random(25000, 90000),
        elemental: random(20000, 80000),
        total: random(75000, 270000),
      },
      battlesByType,
    };
  },

  getOverview: (): OverviewMetrics => {
    const world = mockDataService.getWorldSimulation();
    const players = mockDataService.getPlayerMetrics();
    const server = mockDataService.getServerMetrics();
    const battles = mockDataService.getBattleMetrics();

    const alerts = [
      {
        id: 'alert-1',
        type: 'warning' as const,
        title: 'High Server Load',
        message: 'Server CPU usage is above 70%',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: 'alert-2',
        type: 'info' as const,
        title: 'New Region Active',
        message: 'Dragon\'s Peak region has been activated',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
    ];

    return {
      world: {
        population: world.totalPopulation,
        activeRegions: world.activeRegions,
        recentEvents: world.recentEvents.length,
      },
      players: {
        active: players.activePlayers,
        sessions: players.totalSessions,
        avgSessionDuration: players.averageSessionDuration,
      },
      server: {
        uptime: server.uptime,
        requestRate: Math.floor(server.totalRequests / (server.uptime / 3600)),
        errorRate: server.errorRate,
        avgResponseTime: server.responseTimes.avg,
      },
      battles: {
        total: battles.totalBattles,
        active: battles.activeBattles,
        winRate: (battles.playerVictories / battles.totalBattles) * 100,
      },
      systemStatus: server.serverHealth.cpu > 80 ? 'critical' : server.serverHealth.cpu > 60 ? 'warning' : 'healthy',
      alerts,
    };
  },
};
