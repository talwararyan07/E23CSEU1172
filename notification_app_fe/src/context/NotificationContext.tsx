import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { logFrontend } from '../utils/logger';

interface NotificationContextProps {
  viewedIds: Set<string>;
  markAsViewed: (id: string) => void;
  markAllAsViewed: (ids: string[]) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem('viewed_notifications');
      if (stored) {
        setViewedIds(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      logFrontend('error', 'state', 'Failed to parse viewed notifications from local storage');
    }
  }, []);

  const saveViewedIds = (newSet: Set<string>) => {
    setViewedIds(newSet);
    localStorage.setItem('viewed_notifications', JSON.stringify(Array.from(newSet)));
  };

  const markAsViewed = useCallback((id: string) => {
    setViewedIds(prev => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev).add(id);
      saveViewedIds(newSet);
      logFrontend('debug', 'state', `Marked notification ${id} as viewed`);
      return newSet;
    });
  }, []);

  const markAllAsViewed = useCallback((ids: string[]) => {
    setViewedIds(prev => {
      const newSet = new Set(prev);
      let changed = false;
      ids.forEach(id => {
        if (!newSet.has(id)) {
          newSet.add(id);
          changed = true;
        }
      });
      if (changed) {
        saveViewedIds(newSet);
        logFrontend('info', 'state', `Marked ${ids.length} notifications as viewed`);
      }
      return newSet;
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ viewedIds, markAsViewed, markAllAsViewed }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
