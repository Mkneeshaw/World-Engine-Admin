export function SettingsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Configure admin panel preferences</p>
      </div>

      <div className="bg-slate-800/50 rounded-lg shadow-lg p-8 border border-slate-700">
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">Settings Coming Soon</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Configuration options for data refresh intervals, display preferences, and API endpoints will be available here.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">Admin Panel Version</h3>
          <p className="text-gray-400 mb-2">Current Version: <span className="text-titan-cyan font-medium">v1.0.0</span></p>
          <p className="text-sm text-gray-500">Last Updated: January 2026</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">Data Status</h3>
          <p className="text-gray-400 mb-2">Mode: <span className="text-yellow-400 font-medium">Mock Data</span></p>
          <p className="text-sm text-gray-500">Using simulated data for development</p>
        </div>
      </div>
    </div>
  );
}
