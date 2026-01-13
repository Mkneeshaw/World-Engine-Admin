import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { TabNavigation } from './TabNavigation';

interface AdminLayoutProps {
  onLogout?: () => void;
}

export function AdminLayout({ onLogout }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-titan-bg-dark flex flex-col">
      <Header onLogout={onLogout} />
      <TabNavigation />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
