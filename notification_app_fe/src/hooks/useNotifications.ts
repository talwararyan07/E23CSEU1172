import { useState, useEffect } from 'react';
import { fetchNotifications } from '../api/notificationService';
import type { Notification, NotificationTypeFilter } from '../types';
import { logFrontend } from '../utils/logger';

export const useNotifications = (page: number, limit: number, filterType: NotificationTypeFilter) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params: any = { page, limit };
        if (filterType !== 'All') {
          params.notification_type = filterType;
        }

        const data = await fetchNotifications(params);
        if (mounted) {
          if (data && data.notifications) {
            setNotifications(data.notifications);
          } else {
            setNotifications([]);
          }
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load notifications');
          logFrontend('error', 'hook', `useNotifications failed: ${err.message}`);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [page, limit, filterType]);

  return { notifications, loading, error };
};
