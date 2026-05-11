import axios from 'axios';
import { API_BASE_URL } from '../utils/config';
import { getAuthToken } from './authService';
import { logFrontend } from '../utils/logger';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    logFrontend('warn', 'api', 'Making API request without auth token');
  }
  return config;
}, (error) => {
  logFrontend('error', 'api', `Request interceptor error: ${error.message}`);
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logFrontend('warn', 'api', 'Received 401 Unauthorized. Clearing cached token.');
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_at');
    }
    logFrontend('error', 'api', `Request error: ${error.message}`);
    return Promise.reject(error);
  }
);

export default axiosInstance;
