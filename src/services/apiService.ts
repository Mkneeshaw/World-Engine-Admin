import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_CONFIG } from '../config/api';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.API_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  register: (data: { username: string; email: string; password: string; full_name?: string }) =>
    apiClient.post('/auth/register', data),

  login: (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return apiClient.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  getCurrentUser: () => apiClient.get('/auth/me'),

  updateUser: (data: { email?: string; full_name?: string }) =>
    apiClient.put('/auth/me', data),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    }),
};

// Metrics API (for admin dashboard)
export const metricsAPI = {
  getOverview: () => apiClient.get('/metrics/overview').then(res => res.data),

  getWorldSimulation: () => apiClient.get('/metrics/world').then(res => res.data),

  getPlayerMetrics: () => apiClient.get('/metrics/players').then(res => res.data),

  getServerMetrics: () => apiClient.get('/metrics/server').then(res => res.data),

  getBattleMetrics: () => apiClient.get('/metrics/battles').then(res => res.data),
};

// Game Data API (if admin needs to manage game data)
export const gameAPI = {
  getSessions: () => apiClient.get('/game/sessions'),

  getEvents: () => apiClient.get('/game/events'),

  getBattles: () => apiClient.get('/game/battles'),
};

// Export the configured axios instance for custom requests
export default apiClient;
