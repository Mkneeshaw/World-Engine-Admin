# Admin Panel Setup Guide

Connect the TitanSaga Admin Panel to your World Engine Server.

## Quick Setup

### 1. Environment Configuration

The `.env` file is already configured:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_V1_PREFIX=/api/v1
VITE_ENV=development
VITE_DEBUG=true
```

### 2. Install Dependencies (if not done)

```bash
cd TitanSaga-Admin
npm install
```

### 3. Start the Server

Make sure your World Engine Server is running:

```bash
cd ../World-Engine-Server
python run.py
```

Server should be at: http://localhost:8000

### 4. Start Admin Panel

```bash
cd TitanSaga-Admin
npm run dev
```

Admin panel will be at: http://localhost:5174

### 5. Login

Use the admin credentials:
- **Username**: `admin`
- **Password**: `admin123`

## Switching from Mock Data to Real API

### Update Service Files

The admin panel now uses **real API calls** instead of mock data!

**Files Updated:**
- `src/config/api.ts` - API configuration
- `src/services/apiService.ts` - Real API service with authentication
- `src/components/auth/AdminLogin.tsx` - Login component

### How It Works

1. **Login** → Gets JWT token from server
2. **Token stored** in localStorage
3. **All requests** include `Authorization: Bearer <token>` header
4. **Auto-refresh** every 30 seconds (React Query)
5. **401 errors** → Automatically redirect to login

### Update Your Pages

Replace `mockDataService` imports with `metricsAPI`:

**Before:**
```typescript
import { mockDataService } from '../services/mockDataService';

const { data } = useQuery({
  queryKey: ['metrics-overview'],
  queryFn: () => mockDataService.getOverview(),
});
```

**After:**
```typescript
import { metricsAPI } from '../services/apiService';

const { data } = useQuery({
  queryKey: ['metrics-overview'],
  queryFn: () => metricsAPI.getOverview(),
});
```

### Files to Update

1. `src/pages/OverviewPage.tsx`
2. `src/pages/WorldSimulationPage.tsx`
3. `src/pages/PlayersPage.tsx`
4. `src/pages/ServerPerformancePage.tsx`
5. `src/pages/BattlesPage.tsx`

Just replace:
- `mockDataService.getOverview()` → `metricsAPI.getOverview()`
- `mockDataService.getWorldSimulation()` → `metricsAPI.getWorldSimulation()`
- `mockDataService.getPlayerMetrics()` → `metricsAPI.getPlayerMetrics()`
- `mockDataService.getServerMetrics()` → `metricsAPI.getServerMetrics()`
- `mockDataService.getBattleMetrics()` → `metricsAPI.getBattleMetrics()`

## Authentication Flow

### Login Process

```typescript
import { authAPI } from './services/apiService';

// 1. Login
const response = await authAPI.login('admin', 'admin123');
const { access_token } = response.data;

// 2. Store token
localStorage.setItem('access_token', access_token);

// 3. Get user info
const user = await authAPI.getCurrentUser();

// 4. Store user
localStorage.setItem('user', JSON.stringify(user.data));

// 5. All subsequent requests automatically include token!
```

### Token Management

Tokens are:
- **Stored** in localStorage
- **Automatically added** to requests via axios interceptor
- **Valid for 24 hours** (configurable on server)
- **Auto-cleared** on 401 Unauthorized

### Manual Token Usage

If you need to make custom requests:

```typescript
import apiClient from './services/apiService';

// Token is automatically included
const response = await apiClient.get('/custom-endpoint');
```

## API Endpoints Available

### Authentication
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/change-password` - Change password

### Metrics (Protected)
- `GET /api/v1/metrics/overview` - Dashboard overview
- `GET /api/v1/metrics/world` - World simulation
- `GET /api/v1/metrics/players` - Player activity
- `GET /api/v1/metrics/server` - Server performance
- `GET /api/v1/metrics/battles` - Battle statistics

### User Management (Admin Only)
- `GET /api/v1/auth/users` - List all users
- `DELETE /api/v1/auth/users/{id}` - Delete user

## Environment Variables

### Development (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Production (`.env.production`)
```env
VITE_API_BASE_URL=https://your-production-api.com
```

## Troubleshooting

### CORS Errors

If you see CORS errors in console:

1. Check server `.env` has your admin URL in CORS_ORIGINS:
   ```env
   CORS_ORIGINS=http://localhost:5173,http://localhost:5174
   ```

2. Restart the server after changing `.env`

### 401 Unauthorized

- Token expired (24 hours)
- Token invalid
- User deleted

**Solution:** Login again

### Connection Refused

- Server not running
- Wrong API URL in `.env`

**Solution:**
1. Start server: `python run.py`
2. Check `VITE_API_BASE_URL` in `.env`

### No Data Showing

1. **Check server is running**: http://localhost:8000/health
2. **Check login works**: Open browser console, look for errors
3. **Verify token**: Check localStorage has `access_token`
4. **Test API directly**: http://localhost:8000/docs

### Token Not Stored

Check browser console for errors. Make sure:
- Login response has `access_token`
- localStorage is enabled
- No browser extensions blocking

## Testing API Connection

### Browser Console Test

Open browser console and run:

```javascript
// Check API URL
console.log(import.meta.env.VITE_API_BASE_URL);

// Test health endpoint
fetch('http://localhost:8000/health')
  .then(r => r.json())
  .then(console.log);

// Check token
console.log(localStorage.getItem('access_token'));
```

### Using API Service

```typescript
import { metricsAPI } from './services/apiService';

// This will use the token automatically
const data = await metricsAPI.getOverview();
console.log(data);
```

## Security Notes

### Token Storage

Tokens are stored in localStorage for simplicity. For production:
- Consider using httpOnly cookies
- Implement refresh tokens
- Add CSRF protection

### HTTPS Required

In production:
- Always use HTTPS
- Update CORS to match production URLs
- Use secure token storage

## Deployment

### Deploy to Vercel

The admin panel is configured for easy deployment to Vercel.

See **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** for complete deployment guide.

**Quick Deploy:**

1. Push to GitHub
2. Import to Vercel (auto-detects Vite)
3. Add environment variables:
   - `VITE_API_BASE_URL` - Your production API URL
   - `VITE_API_V1_PREFIX` - `/api/v1`
   - `VITE_ENV` - `production`
   - `VITE_DEBUG` - `false`
4. Deploy!

**Important**: Update your backend CORS to include your Vercel URL.

## Next Steps

1. ✅ Server running with authentication
2. ✅ Admin panel connected
3. ✅ Login working
4. ✅ Vercel deployment configured
5. 🔲 Update pages to use real API
6. 🔲 Test all dashboard features
7. 🔲 Deploy to production

## Need Help?

- **Server Issues**: Check `World-Engine-Server/AUTH_GUIDE.md`
- **Deployment**: Check `VERCEL_DEPLOYMENT.md`
- **API Docs**: http://localhost:8000/docs
- **Test Connection**: `curl http://localhost:8000/health`

---

**Status**: Ready to connect to real API and deploy! 🚀
