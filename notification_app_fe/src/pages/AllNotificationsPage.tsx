import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationCard } from '../components/NotificationCard';
import { FilterBar } from '../components/FilterBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import { useNotificationContext } from '../context/NotificationContext';
import type { NotificationTypeFilter } from '../types';
import { logFrontend } from '../utils/logger';
import { m3 } from '../styles/theme';
import { MIcon } from '../components/Layout';

export const AllNotificationsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterType, setFilterType] = useState<NotificationTypeFilter>('All');

  const { notifications, loading, error } = useNotifications(page, limit, filterType);
  const { markAllAsViewed, viewedIds } = useNotificationContext();

  useEffect(() => {
    logFrontend('info', 'page', 'All Notifications Page Mounted');
  }, []);

  const handleMarkAll = () => {
    const unviewedIds = notifications.map((n) => n.ID).filter((id) => !viewedIds.has(id));
    if (unviewedIds.length > 0) {
      markAllAsViewed(unviewedIds);
      logFrontend('info', 'page', `Marked ${unviewedIds.length} as viewed on All Notifications`);
    }
  };

  const totalPages = 10;

  return (
    <Box>
      {/* Page header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography sx={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600, color: m3.primary }}>
          All Notifications
        </Typography>
        <Box
          component="button"
          onClick={handleMarkAll}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            color: m3.primary, bgcolor: 'transparent',
            border: 'none', cursor: 'pointer',
            fontSize: '12px', fontWeight: 600,
            fontFamily: '"Inter", sans-serif',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Mark all as read
        </Box>
      </Box>

      {/* Filter chips */}
      <FilterBar
        filterType={filterType}
        setFilterType={(val) => { setFilterType(val); setPage(1); logFrontend('info', 'page', `Filter changed to ${val}`); }}
        limit={limit}
        setLimit={(val) => { setLimit(val); setPage(1); }}
        showLimitSelector={false}
      />

      {/* Notification list */}
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      {!loading && !error && notifications.length === 0 && (
        <Typography sx={{ textAlign: 'center', py: 8, color: m3.onSurfaceVariant }}>
          No notifications found.
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!loading && !error && notifications.map((n) => (
          <NotificationCard key={n.ID} notification={n} />
        ))}
      </Box>

      {/* Pagination */}
      {!loading && !error && notifications.length > 0 && (
        <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Box
            component="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            sx={{
              p: 1, borderRadius: '50%', border: 'none', cursor: page <= 1 ? 'default' : 'pointer',
              bgcolor: 'transparent', opacity: page <= 1 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              '&:hover': { bgcolor: page <= 1 ? 'transparent' : m3.surfaceContainerHigh },
            }}
          >
            <MIcon icon="chevron_left" />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === page;
              return (
                <Box
                  key={pageNum}
                  component="button"
                  onClick={() => setPage(pageNum)}
                  sx={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: 'none', cursor: 'pointer',
                    bgcolor: isActive ? m3.primary : 'transparent',
                    color: isActive ? m3.onPrimary : m3.onSurface,
                    fontSize: '12px', fontWeight: 600,
                    fontFamily: '"Inter", sans-serif',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    '&:hover': { bgcolor: isActive ? m3.primary : m3.surfaceContainerHigh },
                  }}
                >
                  {pageNum}
                </Box>
              );
            })}
            {totalPages > 5 && (
              <>
                <Typography sx={{ px: 1, color: m3.onSurfaceVariant }}>...</Typography>
                <Box
                  component="button"
                  onClick={() => setPage(totalPages)}
                  sx={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: 'none', cursor: 'pointer',
                    bgcolor: page === totalPages ? m3.primary : 'transparent',
                    color: page === totalPages ? m3.onPrimary : m3.onSurface,
                    fontSize: '12px', fontWeight: 600,
                    fontFamily: '"Inter", sans-serif',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    '&:hover': { bgcolor: m3.surfaceContainerHigh },
                  }}
                >
                  {totalPages}
                </Box>
              </>
            )}
          </Box>

          <Box
            component="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            sx={{
              p: 1, borderRadius: '50%', border: 'none', cursor: 'pointer',
              bgcolor: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              '&:hover': { bgcolor: m3.surfaceContainerHigh },
            }}
          >
            <MIcon icon="chevron_right" />
          </Box>
        </Box>
      )}
    </Box>
  );
};
