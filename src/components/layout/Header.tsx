import { useQuery } from '@tanstack/react-query';

interface HeaderProps {
  showExportButton?: boolean;
  onExportCSV?: () => void;
}

export function Header({ showExportButton = false, onExportCSV }: HeaderProps) {
  // Track if any query is fetching for the live indicator
  const { isFetching: metricsFetching } = useQuery({
    queryKey: ['metrics-overview'],
    enabled: false,
  });

  const handleLogout = () => {
    localStorage.removeItem('titan_admin_token');
    window.location.href = '/login';
  };

  return (
    <header className="bg-gradient-to-r from-titan-navy to-titan-purple shadow-lg border-b-2 border-titan-cyan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-titan-cyan to-titan-blue rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Titan Saga Admin
              </h1>
              <p className="text-sm text-titan-cyan mt-1">
                Deep Simulation Analytics & Monitoring
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {showExportButton && onExportCSV && (
              <button
                onClick={onExportCSV}
                className="px-4 py-2 bg-titan-cyan text-white rounded-lg hover:bg-titan-blue border border-titan-cyan transition-colors text-sm font-medium flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export CSV
              </button>
            )}
            <div className="flex items-center text-sm text-white bg-titan-navy/50 px-3 py-2 rounded-lg">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  metricsFetching
                    ? 'bg-yellow-400 animate-pulse'
                    : 'bg-titan-emerald'
                }`}
              />
              {metricsFetching ? 'Updating...' : 'Live'}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white border border-titan-cyan rounded-lg hover:bg-titan-cyan/20 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
