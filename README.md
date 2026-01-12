# Titan Saga Admin Panel

> Deep simulation analytics and monitoring dashboard for Titan Saga

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

## Overview

The Titan Saga Admin Panel is a comprehensive React-based dashboard for monitoring and analyzing the deep simulation systems in Titan Saga. It provides real-time visualization of world simulation metrics, player activity, server performance, and battle statistics.

## Features

### Core Metrics
- **Overview Dashboard** - System-wide status with key metrics from all subsystems
- **World Simulation** - Population tracking, economy health, regional data, and world events
- **Player Activity** - Active players, session data, top players, and activity trends
- **Server Performance** - API metrics, response times, error rates, and server health
- **Battle System** - Combat statistics, skill usage, damage distribution, and battle outcomes

### Technical Features
- **Real API Integration** with JWT authentication
- **Role-Based Access Control** (admin only)
- Real-time data updates (30-second auto-refresh with React Query)
- Responsive design with dark theme optimized for long monitoring sessions
- Interactive charts and visualizations using Recharts
- TypeScript for type safety
- **Production-Ready** with Vercel deployment configuration
- Automatic token management with auth interceptors

## Tech Stack

- **Framework**: React 19 with TypeScript 5.9
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Charts**: Recharts
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router v7
- **Date Handling**: date-fns
- **Backend**: FastAPI (see `World-Engine-Server/`)

## Project Structure

```
TitanSaga-Admin/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── layout/           # Layout components (Header, Navigation)
│   │   │   ├── Header.tsx
│   │   │   ├── TabNavigation.tsx
│   │   │   └── AdminLayout.tsx
│   │   └── metrics/          # Reusable metric components
│   │       ├── MetricsCard.tsx
│   │       ├── TimeSeriesChart.tsx
│   │       └── BarChartCard.tsx
│   │
│   ├── pages/                # Page components
│   │   ├── OverviewPage.tsx
│   │   ├── WorldSimulationPage.tsx
│   │   ├── PlayersPage.tsx
│   │   ├── ServerPerformancePage.tsx
│   │   ├── BattlesPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── services/             # Data services
│   │   └── mockDataService.ts
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── metrics.ts
│   │
│   ├── App.tsx               # Main app with routing
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **World Engine Server**: Running on http://localhost:8000 (see `World-Engine-Server/`)

### Installation

1. Navigate to the project directory:
```bash
cd TitanSaga-Admin
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
# Copy .env.example to .env (already configured for local development)
# Default settings work for local World Engine Server
```

### Development

Start the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:5174`

### Default Login Credentials

```
Username: admin
Password: admin123
```

### Setup Guides

- **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Complete guide for connecting to backend API
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Deploy to Vercel in minutes

### Build for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint code with ESLint |

## Color Scheme

The admin panel uses a dark theme with Titan Saga branding:

- **Primary Navy**: `#0A1929` - Main background
- **Purple**: `#6B46C1` - Accent color
- **Blue**: `#3B82F6` - Primary actions
- **Cyan**: `#06B6D4` - Highlights
- **Emerald**: `#10B981` - Success states
- **Amber**: `#F59E0B` - Warnings
- **Red**: `#EF4444` - Errors

## API Integration

### Real API Integration

The admin panel uses **real API calls** to the World-Engine-Server:

```typescript
import { metricsAPI, authAPI } from './services/apiService';

// Authentication
const response = await authAPI.login('admin', 'admin123');
localStorage.setItem('access_token', response.data.access_token);

// Fetch metrics (token automatically included)
const overview = await metricsAPI.getOverview();
const worldData = await metricsAPI.getWorldSimulation();
const playerData = await metricsAPI.getPlayerMetrics();
```

### Authentication Flow

1. **Login** → Get JWT token from server
2. **Token stored** in localStorage
3. **All requests** automatically include `Authorization: Bearer <token>` header
4. **Auto-refresh** every 30 seconds (React Query)
5. **401 errors** → Automatic redirect to login

### Environment Configuration

Create a `.env` file (see `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_V1_PREFIX=/api/v1
VITE_ENV=development
VITE_DEBUG=true
```

### Mock Data Mode (Development)

Mock data is available in `mockDataService.ts` for development without the backend:

```typescript
import { mockDataService } from '../services/mockDataService';

// Use mock data instead of real API
const { data } = useQuery({
  queryKey: ['metrics-overview'],
  queryFn: () => mockDataService.getOverview(),
});
```

## Key Metrics Tracked

### World Simulation
- Total population across all regions
- Active regions and their prosperity
- Economy health (0-100 scale)
- World time (day, season, year)
- Recent world events with severity levels
- Economic indicators (wealth, trade volume, inflation, unemployment)

### Player Activity
- Active player count
- Total active sessions
- New vs returning players
- Average session duration
- Player activity by hour
- Top players by level and playtime

### Server Performance
- Total API requests and success rate
- Error rate and error distribution
- Response times (P50, P95, P99, Average)
- Server uptime
- Resource usage (CPU, Memory, Disk, Network)
- Endpoint-specific performance metrics

### Battle System
- Total battles and active battles
- Player win/loss statistics
- Battle type distribution (PvP, PvE, Boss, Arena)
- Skill usage statistics
- Damage distribution (Physical, Magical, Elemental)
- Recent battle history

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git push
```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Vite framework using `vercel.json`

3. **Add Environment Variables** in Vercel dashboard:
```env
VITE_API_BASE_URL=https://your-production-api.com
VITE_API_V1_PREFIX=/api/v1
VITE_ENV=production
VITE_DEBUG=false
```

4. **Deploy** - Automatic deployment on every push to main

See **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** for complete guide.

### Other Platforms

Standard Vite + React application. Works with:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Any static hosting

**Build command**: `npm run build`
**Output directory**: `dist`

## Troubleshooting

### CORS Errors

Add admin panel URL to backend CORS configuration:

```env
# World-Engine-Server/.env
CORS_ORIGINS=http://localhost:5174,https://your-vercel-app.vercel.app
```

Restart backend server after changing.

### 401 Unauthorized

- Token expired (24 hours)
- Invalid credentials
- Backend not running

**Fix**: Login again or check backend status.

### Connection Refused

- Backend not running
- Wrong API URL in `.env`

**Fix**:
1. Start backend: `cd World-Engine-Server && python run.py`
2. Check `VITE_API_BASE_URL` in `.env`

## Future Enhancements

- ✅ User authentication system (JWT)
- ✅ Role-based access control
- Real-time WebSocket updates for live data
- Custom date range filtering
- Data export functionality (CSV, JSON)
- Alert configuration and notifications
- Historical data trends and analytics
- A/B testing metrics
- Custom dashboard layouts

## Integration with World-Engine-Server

The admin panel is designed to integrate with the World-Engine-Server, which:
- Connects to Neon.tech PostgreSQL database
- Receives REST API calls from deployed Godot game clients
- Stores gameplay datapoints for analysis
- Exposes metrics endpoints for the admin panel

## Development Notes

- All pages use React Query for data fetching with 30-second auto-refresh
- Components are designed to handle loading and error states
- Mock data uses realistic ranges and random generation for demonstration
- Tailwind CSS classes follow a consistent dark theme pattern
- TypeScript types are defined in `src/types/metrics.ts` for all data structures

## Support

- **Backend Issues**: See `World-Engine-Server/AUTH_GUIDE.md`
- **Setup Help**: See `ADMIN_SETUP.md`
- **Deployment**: See `VERCEL_DEPLOYMENT.md`
- **API Documentation**: http://localhost:8000/docs
- **Test Connection**: `curl http://localhost:8000/health`

## License

Internal project - not for external distribution

---

**Status**: Production Ready - Real API Integration
**Last Updated**: January 2026
**Version**: 2.0.0

**Built with** ❤️ **for Titan Saga World Engine**
