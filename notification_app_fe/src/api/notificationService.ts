import axiosInstance from './axiosInstance';
import type { NotificationResponse } from '../types';
import { logFrontend } from '../utils/logger';

interface FetchParams {
  limit?: number;
  page?: number;
  notification_type?: string;
}

export const fetchNotifications = async (params: FetchParams = {}): Promise<NotificationResponse | null> => {
  try {
    logFrontend('info', 'api', `Fetching notifications with params: ${JSON.stringify(params)}`);
    const response = await axiosInstance.get('/evaluation-service/notifications', { params });
    logFrontend('info', 'api', `Successfully fetched ${response.data.notifications?.length || 0} notifications`);
    return response.data;
  } catch (error: any) {
    logFrontend('error', 'api', `Failed to fetch notifications: ${error.message}`);
    console.error('Fetch Notifications Error:', error);
    return null;
  }
};
