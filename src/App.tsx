import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { OverviewPage } from './pages/OverviewPage';
import { WorldSimulationPage } from './pages/WorldSimulationPage';
import { PlayersPage } from './pages/PlayersPage';
import { ServerPerformancePage } from './pages/ServerPerformancePage';
import { BattlesPage } from './pages/BattlesPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes with layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="world" element={<WorldSimulationPage />} />
          <Route path="players" element={<PlayersPage />} />
          <Route path="server" element={<ServerPerformancePage />} />
          <Route path="battles" element={<BattlesPage />} />
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
