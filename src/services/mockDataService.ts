import type {
  OverviewMetrics,
  WorldSimulationMetrics,
  CityMetrics,
  FactionMetrics,
  EconomicMetrics,
  CharacterMetrics,
  SimulationPerformance,
  City,
  Faction,
  WorldEvent,
  Alert,
  ResourcePrice,
  ResourceScarcity,
  TradeRoute,
  Conflict,
  DiplomaticEvent,
  TopCharacter,
  Discovery,
  MonsterEncounter,
} from '../types/metrics';

// ============================================
// HELPER FUNCTIONS
// ============================================

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;
const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomBool = () => Math.random() > 0.5;

// ============================================
// GAME DATA CONSTANTS
// ============================================

const regions = [
  'Titan\'s Rest',
  'Shadowfall',
  'Crystal Plains',
  'Ironforge Mountains',
  'Mystic Woods',
  'Dragon\'s Peak',
  'Coastal Haven',
  'Desert Wastes'
];

const cityNames = [
  'Lithmere', 'Vothaven', 'Ironforge', 'Shadowfall City',
  'Crystalholm', 'Dragonwatch', 'Seaport', 'Oasis',
  'Stonehelm', 'Woodhaven', 'Peakfort', 'Haven\'s Rest'
];

const factionNames = [
  'Valorian Empire',
  'Shadowborn Syndicate',
  'Merchant\'s Guild',
  'Crystal Order',
  'Iron Brotherhood',
  'Dragon Clan',
  'Coastal Alliance'
];

const characterNames = [
  'Thorin Ironforge', 'Lyra Shadowstep', 'Zephyr Stormcaller', 'Kael Fireborn',
  'Aria Moonwhisper', 'Magnus Steelheart', 'Selene Frostweaver', 'Raven Nightblade',
  'Drake Emberforge', 'Luna Starlight', 'Garrick Stonefist', 'Iris Meadowbrook'
];

const professions = [
  'Miner', 'Blacksmith', 'Merchant', 'Hunter', 'Alchemist',
  'Enchanter', 'Warrior', 'Scout', 'Builder', 'Trader'
];

const resources = [
  'Iron Ore', 'Gold Ore', 'Timber', 'Stone', 'Food',
  'Herbs', 'Leather', 'Cloth', 'Gems', 'Essence Crystals'
];

// Monster types - currently unused but kept for future features
// const monsterTypes = [
//   'Forest Wolves', 'Mountain Trolls', 'Desert Scorpions', 'Cave Spiders',
//   'Undead Warriors', 'Ice Drakes', 'Fire Elementals', 'Shadow Beasts'
// ];

// ============================================
// MOCK DATA GENERATORS
// ============================================

export const mockDataService = {
  // ==========================================
  // SIMULATION OVERVIEW
  // ==========================================
  getOverview: (): OverviewMetrics => {
    const currentDay = random(1, 365);
    const season = ['Spring', 'Summer', 'Autumn', 'Winter'][Math.floor(currentDay / 91)] as 'Spring' | 'Summer' | 'Autumn' | 'Winter';
    const year = random(1, 5);

    const alerts: Alert[] = [
      {
        id: 'alert-1',
        type: 'critical',
        category: 'economy',
        title: 'Food Crisis in Lithmere',
        message: 'City food reserves down to 2 days. Production disrupted.',
        location: 'Lithmere',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
      },
      {
        id: 'alert-2',
        type: 'warning',
        category: 'conflict',
        title: 'Tensions Rising',
        message: 'Shadowborn Syndicate has made hostile moves toward Valorian Empire',
        location: 'Shadowfall',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
      },
      {
        id: 'alert-3',
        type: 'info',
        category: 'economy',
        title: 'New Trade Route Established',
        message: 'Profitable trade route opened between Lithmere and Vothaven',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
    ];

    return {
      simulation: {
        currentTick: random(10000, 50000),
        tickRate: randomFloat(8, 12),
        elapsedTime: random(10000, 50000),
        fps: random(55, 60),
      },
      world: {
        date: {
          day: currentDay,
          season,
          year,
          formatted: `Day ${currentDay}, ${season}, Year ${year}`,
        },
        population: random(40000, 60000),
        activeRegions: random(6, 8),
        totalCities: random(10, 12),
        totalFactions: random(5, 7),
      },
      economy: {
        totalWealth: random(2000000, 3000000),
        tradeVolume24h: random(120000, 180000),
        economicHealth: random(65, 85),
        criticalShortages: random(1, 3),
      },
      conflicts: {
        activeWars: random(1, 3),
        tenseDiplomacy: random(2, 5),
        recentTreaties: random(0, 2),
      },
      systemStatus: random(1, 100) > 20 ? 'healthy' : random(1, 100) > 50 ? 'warning' : 'critical',
      alerts,
    };
  },

  // ==========================================
  // CITY & REGION METRICS
  // ==========================================
  getCityMetrics: (): CityMetrics => {
    const cities: City[] = cityNames.slice(0, 12).map((name, i) => {
      const economicHealth = random(40, 95);
      const foodReserves = random(1, 30);
      const treasury = random(50000, 500000);

      return {
        id: `city-${i}`,
        name,
        region: regions[i % regions.length],
        population: random(2000, 5000),
        populationGrowth: randomFloat(-1, 3),
        treasury,
        economicHealth,
        foodReserves,
        foodStatus: foodReserves < 5 ? 'critical' : foodReserves < 10 ? 'low' : foodReserves < 20 ? 'sufficient' : 'abundant',
        tradeRoutes: random(2, 6),
        activeQuests: random(5, 25),
        completedQuestsToday: random(3, 15),
        defenseRating: random(30, 90),
        factionControl: randomItem(factionNames),
        productionChains: random(3, 12),
        productionEfficiency: random(55, 95),
        workforceDistribution: {
          gathering: random(15, 30),
          crafting: random(10, 25),
          trading: random(8, 20),
          military: random(5, 15),
          infrastructure: random(5, 12),
          other: random(10, 20),
        },
      };
    });

    const regionStats = regions.map(name => ({
      name,
      cities: random(1, 3),
      totalPopulation: random(5000, 12000),
      prosperity: random(50, 90),
      activeNodes: random(5, 15),
      dangerLevel: random(10, 70),
      controllingFaction: randomItem(factionNames),
    }));

    return {
      cities,
      totalCities: cities.length,
      averagePopulation: Math.floor(cities.reduce((sum, c) => sum + c.population, 0) / cities.length),
      averageEconomicHealth: Math.floor(cities.reduce((sum, c) => sum + c.economicHealth, 0) / cities.length),
      citiesInCrisis: cities.filter(c => c.foodStatus === 'critical' || c.economicHealth < 50).length,
      totalTradeRoutes: cities.reduce((sum, c) => sum + c.tradeRoutes, 0),
      regionStats,
    };
  },

  // ==========================================
  // FACTION & DIPLOMACY METRICS
  // ==========================================
  getFactionMetrics: (): FactionMetrics => {
    const factions: Faction[] = factionNames.slice(0, 7).map((name, i) => ({
      id: `faction-${i}`,
      name,
      type: randomItem(['empire', 'guild', 'syndicate', 'clan', 'order'] as const),
      memberCount: random(20, 80),
      citiesControlled: random(1, 4),
      regionsControlled: random(1, 3),
      treasury: random(200000, 800000),
      militaryStrength: random(40, 95),
      technologyLevel: random(30, 85),
      reputation: random(-50, 100),
      activeGoals: [
        randomItem(['Expand territory', 'Build wealth', 'Research technology', 'Form alliances']),
        randomItem(['Train army', 'Establish trade', 'Explore ruins', 'Defend borders']),
      ],
      recentActivity: randomItem([
        'Declared war on rival faction',
        'Signed trade agreement',
        'Discovered ancient ruins',
        'Completed major construction',
        'Recruited new members',
        'Won territorial battle',
      ]),
    }));

    const activeConflicts: Conflict[] = [
      {
        id: 'conflict-1',
        type: 'war',
        factions: ['Valorian Empire', 'Shadowborn Syndicate'],
        startDate: `Day ${random(1, 50)}, Summer, Year ${random(1, 3)}`,
        status: 'active',
        casualties: random(50, 200),
        territoriesDisputed: ['Shadowfall', 'Crystal Plains'],
        description: 'Long-standing territorial dispute over resource-rich regions',
      },
      {
        id: 'conflict-2',
        type: 'raid',
        factions: ['Dragon Clan', 'Coastal Alliance'],
        startDate: `Day ${random(1, 30)}, Autumn, Year ${random(2, 4)}`,
        status: 'active',
        casualties: random(10, 50),
        territoriesDisputed: ['Dragon\'s Peak'],
        description: 'Series of raids over disputed mining operations',
      },
    ];

    const recentTreaties: DiplomaticEvent[] = [
      {
        id: 'treaty-1',
        type: 'trade_agreement',
        factions: ['Merchant\'s Guild', 'Coastal Alliance'],
        date: `Day ${random(1, 20)}, Spring, Year ${random(3, 5)}`,
        description: 'Mutual trade benefits and reduced tariffs',
      },
      {
        id: 'treaty-2',
        type: 'alliance',
        factions: ['Crystal Order', 'Iron Brotherhood'],
        date: `Day ${random(1, 40)}, Summer, Year ${random(2, 4)}`,
        description: 'Military and economic alliance for mutual defense',
      },
    ];

    const relationshipMatrix = [];
    for (let i = 0; i < factions.length; i++) {
      for (let j = i + 1; j < factions.length; j++) {
        const standing = random(-100, 100);
        relationshipMatrix.push({
          faction1: factions[i].name,
          faction2: factions[j].name,
          standing,
          status: standing > 70 ? 'allied' :
                  standing > 30 ? 'friendly' :
                  standing > -30 ? 'neutral' :
                  standing > -70 ? 'tense' :
                  'hostile' as any,
          treaties: standing > 50 ? [randomItem(['Trade Agreement', 'Non-Aggression Pact'])] : [],
        });
      }
    }

    return {
      factions,
      totalFactions: factions.length,
      activeConflicts,
      recentTreaties,
      relationshipMatrix,
    };
  },

  // ==========================================
  // ECONOMIC METRICS
  // ==========================================
  getEconomicMetrics: (): EconomicMetrics => {
    const resourcePrices: ResourcePrice[] = resources.map((resource, i) => {
      const currentPrice = random(10, 500);
      const priceChange24h = randomFloat(-15, 20);

      return {
        resource,
        tier: (i % 3) + 1,
        currentPrice,
        priceChange24h,
        priceChange7d: randomFloat(-25, 35),
        trend: priceChange24h > 5 ? 'rising' : priceChange24h < -5 ? 'falling' : 'stable',
        volume: random(100, 5000),
      };
    });

    const scarcityLevels: ResourceScarcity[] = resources.map((resource, i) => {
      const scarcityScore = random(0, 100);
      const supply = random(1000, 10000);
      const demand = random(800, 12000);

      return {
        resource,
        tier: (i % 3) + 1,
        scarcityLevel: scarcityScore > 75 ? 'critical' :
                        scarcityScore > 50 ? 'scarce' :
                        scarcityScore > 25 ? 'normal' : 'abundant',
        scarcityScore,
        supply,
        demand,
        nodeAvailability: random(5, 30),
        affectedCities: scarcityScore > 60 ? cityNames.slice(0, random(2, 5)) : [],
      };
    });

    const tradeRoutes: TradeRoute[] = Array.from({ length: 15 }, (_, i) => {
      const cities = [...cityNames];
      const origin = cities[random(0, cities.length - 1)];
      cities.splice(cities.indexOf(origin), 1);
      const destination = cities[random(0, cities.length - 1)];

      return {
        id: `route-${i}`,
        origin,
        destination,
        volume: random(5000, 50000),
        profitability: randomFloat(5, 35),
        status: random(1, 100) > 10 ? 'active' : randomItem(['disrupted', 'blocked'] as const),
        primaryGoods: [randomItem(resources), randomItem(resources)],
        travelTime: random(50, 300),
      };
    });

    return {
      overview: {
        totalWealth: random(2000000, 4000000),
        wealthDistribution: {
          factions: random(40, 50),
          cities: random(30, 40),
          individuals: random(10, 20),
        },
        dailyTradeVolume: random(100000, 200000),
        inflationRate: randomFloat(1, 4),
        economicGrowth: randomFloat(-1, 5),
        unemploymentRate: randomFloat(2, 8),
      },
      resourcePrices,
      scarcityLevels,
      tradeRoutes,
      marketActivity: {
        activeOrders: random(500, 2000),
        buyOrders: random(250, 1100),
        sellOrders: random(250, 900),
        ordersFilledToday: random(300, 1500),
        averageFulfillmentTime: random(20, 100),
        topTradedResources: resources.slice(0, 5),
      },
      productionChains: Array.from({ length: 20 }, () => ({
        city: randomItem(cityNames),
        input: randomItem(resources),
        output: randomItem(resources),
        efficiency: random(60, 98),
        dailyOutput: random(100, 1000),
        bottleneck: random(1, 100) > 70 ? randomItem(['Labor shortage', 'Resource scarcity', 'Equipment failure']) : null,
      })),
    };
  },

  // ==========================================
  // WORLD SIMULATION & EVENTS
  // ==========================================
  getWorldSimulation: (): WorldSimulationMetrics => {
    const currentDay = random(1, 365);
    const season = ['Spring', 'Summer', 'Autumn', 'Winter'][Math.floor(currentDay / 91)] as 'Spring' | 'Summer' | 'Autumn' | 'Winter';
    const year = random(1, 5);

    const eventTypes: WorldEvent['type'][] = ['disaster', 'discovery', 'political', 'economic', 'monster_spawn', 'technology'];
    // Severities array - kept for future use
    // const severities: WorldEvent['severity'][] = ['low', 'medium', 'high', 'critical'];

    const recentEvents: WorldEvent[] = [
      {
        id: 'event-1',
        type: 'disaster',
        severity: 'high',
        title: 'Earthquake Strikes Crystal Plains',
        description: 'A massive earthquake has damaged infrastructure and disrupted mining operations',
        location: 'Crystal Plains',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        affectedEntities: ['Crystalholm', 'Crystal Order'],
        impact: 'Mining production reduced by 40% for next 7 days',
      },
      {
        id: 'event-2',
        type: 'discovery',
        severity: 'medium',
        title: 'Ancient Ruins Discovered',
        description: 'Explorers have uncovered ancient Titan ruins in the Mystic Woods',
        location: 'Mystic Woods',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        affectedEntities: ['Woodhaven', 'Dragon Clan'],
        impact: 'New essence crystal deposits available for mining',
      },
      {
        id: 'event-3',
        type: 'political',
        severity: 'critical',
        title: 'War Declared',
        description: 'Shadowborn Syndicate has officially declared war on Valorian Empire',
        location: 'Shadowfall',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        affectedEntities: ['Shadowfall City', 'Lithmere', 'Shadowborn Syndicate', 'Valorian Empire'],
        impact: 'Trade routes disrupted, military mobilization in progress',
      },
      {
        id: 'event-4',
        type: 'economic',
        severity: 'high',
        title: 'Food Prices Spike',
        description: 'Crop failure in Desert Wastes causes food prices to surge',
        location: 'Desert Wastes',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        affectedEntities: ['Oasis', 'Merchant\'s Guild'],
        impact: 'Food prices increased by 60%, cities scrambling for supplies',
      },
      {
        id: 'event-5',
        type: 'monster_spawn',
        severity: 'medium',
        title: 'Dragon Sighted Near Peak',
        description: 'A powerful ice dragon has been spotted near Dragonwatch',
        location: 'Dragon\'s Peak',
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        affectedEntities: ['Dragonwatch', 'Dragon Clan'],
        impact: 'Travel to region extremely dangerous, high-level threats active',
      },
      {
        id: 'event-6',
        type: 'technology',
        severity: 'low',
        title: 'New Forging Technique Developed',
        description: 'Iron Brotherhood discovers advanced metalworking methods',
        location: 'Ironforge Mountains',
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        affectedEntities: ['Ironforge', 'Iron Brotherhood'],
        impact: 'Equipment quality improved by 15% for faction members',
      },
    ];

    const discoveries: Discovery[] = [
      {
        id: 'discovery-1',
        type: 'ruins',
        name: 'Ancient Titan Temple',
        location: 'Mystic Woods',
        discoveredBy: 'Zephyr Stormcaller',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        value: random(50000, 200000),
        description: 'Massive temple complex with essence crystal deposits',
      },
      {
        id: 'discovery-2',
        type: 'resource_node',
        name: 'Rich Gold Vein',
        location: 'Ironforge Mountains',
        discoveredBy: 'Iron Brotherhood',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        value: random(100000, 300000),
        description: 'Highly productive gold mining location',
      },
    ];

    const monsterEncounters: MonsterEncounter[] = [
      {
        id: 'encounter-1',
        monsterType: 'Ice Drake',
        location: 'Dragon\'s Peak',
        threatLevel: 9,
        outcome: 'ongoing',
        participants: ['Drake Emberforge', 'Magnus Steelheart'],
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: 'encounter-2',
        monsterType: 'Shadow Beasts',
        location: 'Shadowfall',
        threatLevel: 6,
        outcome: 'defeated',
        participants: ['Raven Nightblade', 'Lyra Shadowstep'],
        timestamp: new Date(Date.now() - 5400000).toISOString(),
      },
    ];

    return {
      worldState: {
        currentDate: {
          day: currentDay,
          season,
          year,
          formatted: `Day ${currentDay}, ${season}, Year ${year}`,
        },
        totalPopulation: random(45000, 60000),
        activeRegions: random(6, 8),
        economicStability: random(60, 85),
        overallProsperity: random(55, 80),
        threatLevel: random(30, 70),
        technologyProgress: random(40, 75),
      },
      recentEvents,
      eventsByType: eventTypes.map(type => ({
        type,
        count: random(5, 50),
        last24h: random(0, 5),
        last7d: random(5, 30),
      })),
      disasterImpact: {
        totalDisasters: random(10, 50),
        disastersByType: [
          { type: 'Earthquake', count: random(2, 10) },
          { type: 'Flood', count: random(1, 8) },
          { type: 'Drought', count: random(3, 12) },
          { type: 'Plague', count: random(1, 5) },
        ],
        populationLost: random(100, 1000),
        economicDamage: random(50000, 500000),
        citiesAffected: cityNames.slice(0, random(2, 5)),
      },
      discoveries,
      monsterActivity: {
        totalMonsters: random(500, 2000),
        activeSpawns: random(50, 200),
        dangerousRegions: regions.filter(() => randomBool()),
        recentEncounters: monsterEncounters,
        spawningTrends: regions.map(region => ({
          region,
          spawnRate: randomFloat(10, 100),
          averageThreat: randomFloat(3, 8),
          trend: randomItem(['increasing', 'decreasing', 'stable'] as const),
        })),
      },
    };
  },

  // ==========================================
  // CHARACTER/NPC ANALYTICS
  // ==========================================
  getCharacterMetrics: (): CharacterMetrics => {
    const topCharacters: TopCharacter[] = characterNames.map((name) => ({
      name,
      level: random(40, 100),
      profession: randomItem(professions),
      faction: randomItem(factionNames),
      wealth: random(5000, 100000),
      reputation: random(20, 100),
      location: randomItem(cityNames),
      recentActivity: randomItem([
        'Completed legendary quest',
        'Discovered ancient artifact',
        'Won tournament battle',
        'Established new trade route',
        'Crafted masterwork equipment',
        'Led successful raid',
      ]),
    }));

    return {
      totalCharacters: random(200, 300),
      charactersByLevel: [
        { levelRange: '1-20', count: random(80, 120), percentage: 40 },
        { levelRange: '21-40', count: random(50, 80), percentage: 30 },
        { levelRange: '41-60', count: random(30, 50), percentage: 20 },
        { levelRange: '61-80', count: random(15, 30), percentage: 8 },
        { levelRange: '81-100', count: random(5, 10), percentage: 2 },
      ],
      charactersByProfession: professions.map(profession => ({
        profession,
        count: random(15, 40),
        percentage: randomFloat(5, 15),
        averageLevel: random(25, 60),
      })),
      topCharacters,
      reputationLeaders: topCharacters.slice(0, 5).map(char => ({
        name: char.name,
        faction: char.faction,
        reputation: char.reputation,
        title: randomItem(['Champion', 'Hero', 'Legend', 'Master', 'Elite']),
        knownFor: randomItem([
          'Slaying legendary beasts',
          'Discovering lost artifacts',
          'Leading victorious battles',
          'Amassing great wealth',
          'Mastering rare crafts',
        ]),
      })),
      wealthDistribution: [
        { bracket: '0-1K', count: random(100, 150), percentage: 50, totalWealth: random(50000, 100000) },
        { bracket: '1K-10K', count: random(50, 80), percentage: 30, totalWealth: random(200000, 400000) },
        { bracket: '10K-50K', count: random(20, 40), percentage: 15, totalWealth: random(500000, 1000000) },
        { bracket: '50K+', count: random(5, 15), percentage: 5, totalWealth: random(300000, 1000000) },
      ],
      questActivity: {
        activeQuests: random(80, 150),
        completedToday: random(30, 70),
        failedToday: random(5, 15),
        averageCompletionTime: random(50, 200),
        questsByType: [
          { type: 'Gathering', count: random(20, 40) },
          { type: 'Crafting', count: random(15, 30) },
          { type: 'Combat', count: random(25, 50) },
          { type: 'Delivery', count: random(10, 25) },
          { type: 'Exploration', count: random(8, 20) },
        ],
        topQuestGivers: [
          { entity: 'Lithmere', questsGenerated: random(30, 60) },
          { entity: 'Valorian Empire', questsGenerated: random(25, 50) },
          { entity: 'Merchant\'s Guild', questsGenerated: random(20, 45) },
        ],
      },
    };
  },

  // ==========================================
  // SIMULATION PERFORMANCE
  // ==========================================
  getSimulationPerformance: (): SimulationPerformance => {
    const tickRate = randomFloat(8, 12);

    return {
      tickRate: {
        current: tickRate,
        target: 10,
        averageLast60s: randomFloat(9, 11),
        stability: random(85, 98),
      },
      entityCounts: {
        cities: random(10, 12),
        factions: random(5, 7),
        characters: random(200, 300),
        quests: random(100, 200),
        tradeRoutes: random(40, 80),
        monsters: random(500, 2000),
        total: random(855, 2599),
      },
      systemLoad: {
        pathfinding: random(15, 35),
        economy: random(20, 40),
        combat: random(10, 25),
        questGeneration: random(8, 20),
        ai: random(25, 45),
        overall: random(78, 165) / 5, // average
      },
      performanceMetrics: {
        avgTickDuration: randomFloat(80, 120),
        maxTickDuration: randomFloat(150, 250),
        fps: random(55, 60),
        memoryUsage: random(400, 800),
        simulatedTime: random(50, 500),
      },
      bottlenecks: [
        {
          system: 'AI Decision Making',
          severity: 'medium',
          impact: 'Slight delay in NPC responses during peak activity',
          recommendation: 'Optimize decision tree evaluation',
        },
        {
          system: 'Pathfinding',
          severity: 'low',
          impact: 'Minor performance impact when many entities travel simultaneously',
          recommendation: 'Implement path caching for common routes',
        },
      ],
    };
  },

  // ==========================================
  // LEGACY COMPATIBILITY METHODS
  // ==========================================

  // Alias for backwards compatibility
  getPlayerMetrics: () => mockDataService.getCharacterMetrics(),
  getServerMetrics: () => mockDataService.getSimulationPerformance(),
  getBattleMetrics: () => mockDataService.getFactionMetrics(),
};
