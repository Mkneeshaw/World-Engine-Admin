import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminLogin } from './components/auth/AdminLogin';
import { OverviewPage } from './pages/OverviewPage';
import { WorldSimulationPage } from './pages/WorldSimulationPage';
import { CitiesPage } from './pages/CitiesPage';
import { SimulationPerformancePage } from './pages/SimulationPerformancePage';
import { FactionsPage } from './pages/FactionsPage';
import { EconomicDashboardPage } from './pages/EconomicDashboardPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        // Check if user is admin
        if (userData.role === 'admin') {
          setIsAuthenticated(true);
        } else {
          // Not admin, clear storage
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
    }

    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-titan-bg-dark">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes with layout */}
        <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />}>
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="world" element={<WorldSimulationPage />} />
          <Route path="cities" element={<CitiesPage />} />
          <Route path="economy" element={<EconomicDashboardPage />} />
          <Route path="simulation" element={<SimulationPerformancePage />} />
          <Route path="factions" element={<FactionsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin/overview" replace />} />
        <Route path="*" element={<Navigate to="/admin/overview" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
