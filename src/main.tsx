import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 30000, // Auto-refresh every 30 seconds
      refetchOnWindowFocus: true,
      staleTime: 5000,
      retry: 2,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
