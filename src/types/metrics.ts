// ========================================
// SIMULATION OVERVIEW TYPES
// ========================================

export interface OverviewMetrics {
  simulation: {
    currentTick: number;
    tickRate: number; // ticks per second
    elapsedTime: number; // total ticks elapsed
    fps: number;
  };
  world: {
    date: WorldDate;
    population: number;
    activeRegions: number;
    totalCities: number;
    totalFactions: number;
  };
  economy: {
    totalWealth: number;
    tradeVolume24h: number;
    economicHealth: number; // 0-100
    criticalShortages: number;
  };
  conflicts: {
    activeWars: number;
    tenseDiplomacy: number;
    recentTreaties: number;
  };
  systemStatus: 'healthy' | 'warning' | 'critical';
  alerts: Alert[];
}

export interface WorldDate {
  day: number;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  year: number;
  formatted: string; // e.g., "Day 47, Summer, Year 3"
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  category: 'economy' | 'conflict' | 'disaster' | 'simulation';
  title: string;
  message: string;
  location?: string; // city or region
  timestamp: string;
}

// ========================================
// CITY & REGION TYPES
// ========================================

export interface CityMetrics {
  cities: City[];
  totalCities: number;
  averagePopulation: number;
  averageEconomicHealth: number;
  citiesInCrisis: number;
  totalTradeRoutes: number;
  regionStats: RegionStats[];
}

export interface City {
  id: string;
  name: string;
  region: string;
  population: number;
  populationGrowth: number; // percentage
  treasury: number;
  economicHealth: number; // 0-100
  foodReserves: number; // days remaining
  foodStatus: 'abundant' | 'sufficient' | 'low' | 'critical';
  tradeRoutes: number;
  activeQuests: number;
  completedQuestsToday: number;
  defenseRating: number;
  factionControl: string; // faction name
  productionChains: number;
  productionEfficiency: number; // 0-100
  workforceDistribution: WorkforceDistribution;
}

export interface WorkforceDistribution {
  gathering: number;
  crafting: number;
  trading: number;
  military: number;
  infrastructure: number;
  other: number;
}

export interface RegionStats {
  name: string;
  cities: number;
  totalPopulation: number;
  prosperity: number; // 0-100
  activeNodes: number; // resource nodes
  dangerLevel: number; // 0-100 (monster spawning)
  controllingFaction: string;
}

// ========================================
// FACTION & DIPLOMACY TYPES
// ========================================

export interface FactionMetrics {
  factions: Faction[];
  totalFactions: number;
  activeConflicts: Conflict[];
  recentTreaties: DiplomaticEvent[];
  relationshipMatrix: FactionRelationship[];
  // Battle-related metrics
  totalBattles: number;
  activeBattles: number;
  playerVictories: number;
  averageDuration: number; // seconds
  damageDistribution: {
    physical: number;
    magical: number;
    elemental: number;
    true: number;
    total: number;
  };
  battlesByType: Array<{
    type: string;
    count: number;
    winRate: number;
    averageDuration: number;
  }>;
  skillUsage: Array<{
    skillName: string;
    uses: number;
    usageCount: number;
    averageDamage: number;
    hitRate: number;
  }>;
  recentBattles: Array<{
    id: string;
    type: string;
    participants: string[];
    winner: string;
    location: string;
    outcome: string;
    duration: number;
    totalDamage: number;
    timestamp: string;
  }>;
}

export interface Faction {
  id: string;
  name: string;
  type: 'empire' | 'guild' | 'syndicate' | 'clan' | 'order';
  memberCount: number;
  citiesControlled: number;
  regionsControlled: number;
  treasury: number;
  militaryStrength: number; // 0-100
  technologyLevel: number; // 0-100
  reputation: number; // -100 to 100
  activeGoals: string[];
  recentActivity: string;
}

export interface Conflict {
  id: string;
  type: 'war' | 'raid' | 'skirmish' | 'territorial_dispute';
  factions: string[]; // faction names involved
  startDate: string;
  status: 'active' | 'ceasefire' | 'concluded';
  casualties: number;
  territoriesDisputed: string[];
  description: string;
}

export interface DiplomaticEvent {
  id: string;
  type: 'treaty' | 'alliance' | 'trade_agreement' | 'peace' | 'declaration_of_war';
  factions: string[];
  date: string;
  description: string;
}

export interface FactionRelationship {
  faction1: string;
  faction2: string;
  standing: number; // -100 (hostile) to 100 (allied)
  status: 'allied' | 'friendly' | 'neutral' | 'tense' | 'hostile' | 'at_war';
  treaties: string[];
}

// ========================================
// ECONOMIC SYSTEM TYPES
// ========================================

export interface EconomicMetrics {
  overview: EconomyOverview;
  resourcePrices: ResourcePrice[];
  scarcityLevels: ResourceScarcity[];
  tradeRoutes: TradeRoute[];
  marketActivity: MarketActivity;
  productionChains: ProductionChain[];
}

export interface EconomyOverview {
  totalWealth: number;
  wealthDistribution: {
    factions: number; // percentage
    cities: number;
    individuals: number;
  };
  dailyTradeVolume: number;
  inflationRate: number; // percentage
  economicGrowth: number; // percentage
  unemploymentRate: number; // percentage
}

export interface ResourcePrice {
  resource: string;
  tier: number;
  currentPrice: number;
  priceChange24h: number; // percentage
  priceChange7d: number; // percentage
  trend: 'rising' | 'falling' | 'stable';
  volume: number; // units traded
}

export interface ResourceScarcity {
  resource: string;
  tier: number;
  scarcityLevel: 'abundant' | 'normal' | 'scarce' | 'critical';
  scarcityScore: number; // 0-100
  supply: number;
  demand: number;
  nodeAvailability: number; // active nodes
  affectedCities: string[];
}

export interface TradeRoute {
  id: string;
  origin: string;
  destination: string;
  volume: number; // gold value
  profitability: number; // percentage
  status: 'active' | 'disrupted' | 'blocked';
  primaryGoods: string[];
  travelTime: number; // ticks
}

export interface MarketActivity {
  activeOrders: number;
  buyOrders: number;
  sellOrders: number;
  ordersFilledToday: number;
  averageFulfillmentTime: number; // ticks
  topTradedResources: string[];
}

export interface ProductionChain {
  city: string;
  input: string;
  output: string;
  efficiency: number; // 0-100
  dailyOutput: number;
  bottleneck: string | null;
}

// ========================================
// WORLD EVENTS & SIMULATION TYPES
// ========================================

export interface WorldSimulationMetrics {
  worldState: WorldState;
  recentEvents: WorldEvent[];
  eventsByType: EventTypeCount[];
  disasterImpact: DisasterStats;
  discoveries: Discovery[];
  monsterActivity: MonsterActivity;
}

export interface WorldState {
  currentDate: WorldDate;
  totalPopulation: number;
  activeRegions: number;
  economicStability: number; // 0-100
  overallProsperity: number; // 0-100
  threatLevel: number; // 0-100 (monster/danger)
  technologyProgress: number; // 0-100 (average across factions)
}

export interface WorldEvent {
  id: string;
  type: 'disaster' | 'discovery' | 'political' | 'economic' | 'monster_spawn' | 'technology';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string; // city or region
  timestamp: string;
  affectedEntities: string[]; // cities, factions, characters affected
  impact: string; // brief impact description
}

export interface EventTypeCount {
  type: string;
  count: number;
  last24h: number;
  last7d: number;
}

export interface DisasterStats {
  totalDisasters: number;
  disastersByType: {
    type: string;
    count: number;
  }[];
  populationLost: number;
  economicDamage: number; // gold value
  citiesAffected: string[];
}

export interface Discovery {
  id: string;
  type: 'ruins' | 'resource_node' | 'technology' | 'artifact' | 'location';
  name: string;
  location: string;
  discoveredBy: string; // character or faction
  timestamp: string;
  value: number; // economic or strategic value
  description: string;
}

export interface MonsterActivity {
  totalMonsters: number;
  activeSpawns: number;
  dangerousRegions: string[];
  recentEncounters: MonsterEncounter[];
  spawningTrends: SpawnTrend[];
}

export interface MonsterEncounter {
  id: string;
  monsterType: string;
  location: string;
  threatLevel: number; // 1-10
  outcome: 'ongoing' | 'defeated' | 'fled';
  participants: string[];
  timestamp: string;
}

export interface SpawnTrend {
  region: string;
  spawnRate: number; // monsters per day
  averageThreat: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

// ========================================
// CHARACTER/NPC ANALYTICS TYPES
// ========================================

export interface CharacterMetrics {
  totalCharacters: number;
  charactersByLevel: LevelDistribution[];
  charactersByProfession: ProfessionDistribution[];
  topCharacters: TopCharacter[];
  reputationLeaders: ReputationLeader[];
  wealthDistribution: WealthBracket[];
  questActivity: QuestActivity;
  // Player activity metrics
  activePlayers: number;
  totalSessions: number;
  newPlayers: number;
  averageSessionDuration: number; // minutes
  topPlayers: Array<{
    username: string;
    characterName: string;
    level: number;
    playtime: number;
    achievements: number;
    lastSeen: string;
  }>;
  activityByHour: Array<{
    hour: string;
    timestamp: string;
    activePlayers: number;
    newSessions: number;
  }>;
  recentSessions: Array<{
    id: string;
    username: string;
    character: string;
    characterName: string;
    level: number;
    region: string;
    loginTime: string;
    duration: number;
    actions: number;
    status: string;
  }>;
}

export interface LevelDistribution {
  levelRange: string; // e.g., "1-10", "11-20"
  count: number;
  percentage: number;
}

export interface ProfessionDistribution {
  profession: string;
  count: number;
  percentage: number;
  averageLevel: number;
}

export interface TopCharacter {
  name: string;
  level: number;
  profession: string;
  faction: string;
  wealth: number;
  reputation: number;
  location: string;
  recentActivity: string;
}

export interface ReputationLeader {
  name: string;
  faction: string;
  reputation: number;
  title: string; // earned title
  knownFor: string;
}

export interface WealthBracket {
  bracket: string; // e.g., "0-1K", "1K-10K"
  count: number;
  percentage: number;
  totalWealth: number;
}

export interface QuestActivity {
  activeQuests: number;
  completedToday: number;
  failedToday: number;
  averageCompletionTime: number; // ticks
  questsByType: {
    type: string;
    count: number;
  }[];
  topQuestGivers: {
    entity: string; // city or faction
    questsGenerated: number;
  }[];
}

// ========================================
// SIMULATION PERFORMANCE TYPES
// ========================================

export interface SimulationPerformance {
  tickRate: TickRate;
  entityCounts: EntityCounts;
  systemLoad: SystemLoad;
  performanceMetrics: PerformanceMetrics;
  bottlenecks: Bottleneck[];
  // Server/API performance metrics
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  errorRate: number; // percentage
  responseTimes: {
    avg: number;
    p50: number;
    p95: number;
    p99: number;
    max: number;
  };
  uptime: number; // seconds
  requestsOverTime: Array<{
    timestamp: string;
    requests: number;
    errors: number;
  }>;
  requestsByEndpoint: Array<{
    endpoint: string;
    count: number;
    requests: number;
    avgResponseTime: number;
    errorRate: number;
  }>;
  serverHealth: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  errorsByType: Array<{
    type: string;
    count: number;
    percentage: number;
    lastOccurrence: string;
  }>;
}

export interface TickRate {
  current: number; // ticks per second
  target: number;
  averageLast60s: number;
  stability: number; // 0-100
}

export interface EntityCounts {
  cities: number;
  factions: number;
  characters: number;
  quests: number;
  tradeRoutes: number;
  monsters: number;
  total: number;
}

export interface SystemLoad {
  pathfinding: number; // percentage
  economy: number;
  combat: number;
  questGeneration: number;
  ai: number;
  overall: number;
}

export interface PerformanceMetrics {
  avgTickDuration: number; // milliseconds
  maxTickDuration: number;
  fps: number;
  memoryUsage: number; // MB
  simulatedTime: number; // total in-game days elapsed
}

export interface Bottleneck {
  system: string;
  severity: 'low' | 'medium' | 'high';
  impact: string;
  recommendation: string;
}

// ========================================
// LEGACY TYPES (for backwards compatibility)
// Can be removed once all pages are updated
// ========================================

export interface PlayerMetrics extends CharacterMetrics {} // Alias
export interface ServerMetrics extends SimulationPerformance {} // Alias
export interface BattleMetrics extends FactionMetrics {} // Alias
