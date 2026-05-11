import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { usePriorityInbox } from '../hooks/usePriorityInbox';
import { NotificationCard } from '../components/NotificationCard';
import { FilterBar } from '../components/FilterBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import type { NotificationTypeFilter } from '../types';
import { logFrontend } from '../utils/logger';
import { m3 } from '../styles/theme';
import { MIcon } from '../components/Layout';

export const PriorityInboxPage: React.FC = () => {
  const [limit, setLimit] = useState(10);
  const [filterType, setFilterType] = useState<NotificationTypeFilter>('All');

  const { notifications, loading, error } = usePriorityInbox(limit, filterType);

  useEffect(() => {
    logFrontend('info', 'page', 'Priority Inbox Page Mounted');
  }, []);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <MIcon icon="auto_awesome" filled sx={{ color: m3.primary, fontSize: '20px' }} />
          <Typography sx={{
            fontSize: '12px', fontWeight: 600, color: m3.primary,
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            Intelligent Sorter
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600, color: m3.onBackground }}>
          Priority Inbox
        </Typography>
        <Typography sx={{ fontSize: '16px', lineHeight: '24px', color: m3.onSurfaceVariant, mt: 0.5 }}>
          Focus on what matters most for your career and academics.
        </Typography>
      </Box>

      {/* Filters + Limit selector */}
      <FilterBar
        filterType={filterType}
        setFilterType={(val) => { setFilterType(val); logFrontend('info', 'page', `Priority filter → ${val}`); }}
        limit={limit}
        setLimit={(val) => { setLimit(val); logFrontend('info', 'page', `Priority limit → ${val}`); }}
        showLimitSelector={true}
      />

      {/* List */}
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      {!loading && !error && notifications.length === 0 && (
        <Typography sx={{ textAlign: 'center', py: 8, color: m3.onSurfaceVariant }}>
          No priority notifications available.
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!loading && !error && notifications.map((n) => (
          <NotificationCard key={n.ID} notification={n} />
        ))}
      </Box>

      {/* Bento suggestion cards */}
      {!loading && !error && (
        <Box sx={{ mt: 6, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Resume Review card */}
          <Box sx={{
            bgcolor: m3.tertiaryContainer,
            borderRadius: '24px',
            p: 4, position: 'relative', overflow: 'hidden',
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography sx={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600, color: m3.onTertiaryContainer, mb: 1 }}>
                Resume Review
              </Typography>
              <Typography sx={{ color: m3.onTertiaryContainer, opacity: 0.8, mb: 3, fontSize: '16px', lineHeight: '24px' }}>
                Boost your placement chances with an AI-powered resume analysis.
              </Typography>
              <Box
                component="button"
                sx={{
                  bgcolor: m3.onTertiaryContainer, color: m3.tertiaryContainer,
                  px: 3, py: 1.5, borderRadius: '12px', border: 'none',
                  fontWeight: 700, cursor: 'pointer',
                  fontFamily: '"Inter", sans-serif', fontSize: '14px',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                Get Started
              </Box>
            </Box>
            <MIcon icon="description" sx={{
              position: 'absolute', bottom: -16, right: -16,
              fontSize: '120px', opacity: 0.1, color: m3.onTertiaryContainer,
            }} />
          </Box>

          {/* Next Seminar card */}
          <Box sx={{
            bgcolor: m3.secondaryContainer,
            borderRadius: '24px',
            p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <Box>
              <Typography sx={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600, color: m3.onSecondaryContainer, mb: 1 }}>
                Next Seminar
              </Typography>
              <Typography sx={{ color: m3.onSecondaryContainer, opacity: 0.8, fontSize: '14px' }}>
                Advanced Cloud Architectures
              </Typography>
            </Box>
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex' }}>
                {[1, 2].map((i) => (
                  <Box key={i} sx={{
                    width: 40, height: 40, borderRadius: '50%',
                    bgcolor: m3.surfaceContainer,
                    border: `2px solid ${m3.secondaryContainer}`,
                    ml: i > 1 ? '-12px' : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <MIcon icon="person" sx={{ fontSize: '16px', color: m3.onSurfaceVariant }} />
                  </Box>
                ))}
                <Box sx={{
                  width: 40, height: 40, borderRadius: '50%',
                  bgcolor: m3.surfaceContainer,
                  border: `2px solid ${m3.secondaryContainer}`,
                  ml: '-12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700, color: m3.onSurfaceVariant,
                }}>
                  +24
                </Box>
              </Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, color: m3.onSecondaryContainer }}>
                Joining today
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
