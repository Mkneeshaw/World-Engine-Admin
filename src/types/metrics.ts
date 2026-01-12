// World Simulation Types
export interface WorldSimulationMetrics {
  totalPopulation: number;
  activeRegions: number;
  economyHealth: number; // 0-100
  worldTime: {
    day: number;
    season: string;
    year: number;
  };
  recentEvents: WorldEvent[];
  populationByRegion: RegionPopulation[];
  economyStats: EconomyStats;
}

export interface WorldEvent {
  id: string;
  type: 'battle' | 'trade' | 'disaster' | 'festival' | 'discovery';
  title: string;
  description: string;
  region: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface RegionPopulation {
  region: string;
  population: number;
  growth: number; // percentage
  prosperity: number; // 0-100
}

export interface EconomyStats {
  totalWealth: number;
  tradeVolume: number;
  inflationRate: number;
  unemployment: number;
  averageIncome: number;
}

// Player Activity Types
export interface PlayerMetrics {
  activePlayers: number;
  totalSessions: number;
  averageSessionDuration: number; // minutes
  newPlayers: number;
  returningPlayers: number;
  recentSessions: PlayerSession[];
  topPlayers: TopPlayer[];
  activityByHour: HourlyActivity[];
}

export interface PlayerSession {
  id: string;
  username: string;
  characterName: string;
  level: number;
  startTime: string;
  duration: number; // minutes
  actions: number;
  region: string;
  status: 'active' | 'idle' | 'offline';
}

export interface TopPlayer {
  username: string;
  characterName: string;
  level: number;
  playtime: number; // hours
  achievements: number;
  lastSeen: string;
}

export interface HourlyActivity {
  timestamp: string;
  activePlayers: number;
  newSessions: number;
}

// Server Performance Types
export interface ServerMetrics {
  uptime: number; // seconds
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  errorRate: number; // percentage
  responseTimes: {
    avg: number;
    p50: number;
    p95: number;
    p99: number;
  };
  requestsByEndpoint: EndpointMetrics[];
  requestsOverTime: TimeSeriesData[];
  errorsByType: ErrorStats[];
  serverHealth: ServerHealth;
}

export interface EndpointMetrics {
  endpoint: string;
  requests: number;
  avgResponseTime: number;
  errorRate: number;
}

export interface TimeSeriesData {
  timestamp: string;
  requests: number;
  successful: number;
  failed: number;
}

export interface ErrorStats {
  type: string;
  count: number;
  percentage: number;
}

export interface ServerHealth {
  cpu: number; // percentage
  memory: number; // percentage
  disk: number; // percentage
  network: number; // MB/s
}

// Battle System Types
export interface BattleMetrics {
  totalBattles: number;
  activeBattles: number;
  averageDuration: number; // seconds
  playerVictories: number;
  playerDefeats: number;
  recentBattles: RecentBattle[];
  skillUsage: SkillUsageStats[];
  damageDistribution: DamageStats;
  battlesByType: BattleTypeStats[];
}

export interface RecentBattle {
  id: string;
  type: 'pvp' | 'pve' | 'boss' | 'arena';
  participants: string[];
  winner: string;
  duration: number; // seconds
  totalDamage: number;
  timestamp: string;
  location: string;
}

export interface SkillUsageStats {
  skillName: string;
  usageCount: number;
  averageDamage: number;
  hitRate: number; // percentage
}

export interface DamageStats {
  physical: number;
  magical: number;
  elemental: number;
  total: number;
}

export interface BattleTypeStats {
  type: 'pvp' | 'pve' | 'boss' | 'arena';
  count: number;
  winRate: number;
  averageDuration: number;
}

// Overview Dashboard Types
export interface OverviewMetrics {
  world: {
    population: number;
    activeRegions: number;
    recentEvents: number;
  };
  players: {
    active: number;
    sessions: number;
    avgSessionDuration: number;
  };
  server: {
    uptime: number;
    requestRate: number;
    errorRate: number;
    avgResponseTime: number;
  };
  battles: {
    total: number;
    active: number;
    winRate: number;
  };
  systemStatus: 'healthy' | 'warning' | 'critical';
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: string;
}
