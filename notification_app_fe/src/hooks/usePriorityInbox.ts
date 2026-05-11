import { useState, useEffect } from 'react';
import { fetchNotifications } from '../api/notificationService';
import type { Notification, NotificationTypeFilter } from '../types';
import { logFrontend } from '../utils/logger';

const TYPE_WEIGHTS: Record<string, number> = {
  'Placement': 3,
  'Result': 2,
  'Event': 1,
};

export const usePriorityInbox = (limit: number, filterType: NotificationTypeFilter) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params: any = { page: 1, limit: 100 };
        if (filterType !== 'All') {
          params.notification_type = filterType;
        }

        const data = await fetchNotifications(params);
        if (mounted && data && data.notifications) {
          let allNotifications = data.notifications;
          
          allNotifications.sort((a, b) => {
             const weightA = TYPE_WEIGHTS[a.Type] || 0;
             const weightB = TYPE_WEIGHTS[b.Type] || 0;
             
             if (weightA !== weightB) {
                return weightB - weightA;
             }
             
             const timeA = new Date(a.Timestamp).getTime();
             const timeB = new Date(b.Timestamp).getTime();
             return timeB - timeA;
          });

          const topN = allNotifications.slice(0, limit);
          setNotifications(topN);
          logFrontend('info', 'hook', `Computed top ${limit} priority notifications`);
        } else if (mounted) {
          setNotifications([]);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load priority notifications');
          logFrontend('error', 'hook', `usePriorityInbox failed: ${err.message}`);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [limit, filterType]);

  return { notifications, loading, error };
};
