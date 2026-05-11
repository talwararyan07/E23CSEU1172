import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Notification } from '../types';
import { useNotificationContext } from '../context/NotificationContext';
import { m3 } from '../styles/theme';
import { MIcon } from './Layout';
import { logFrontend } from '../utils/logger';

interface Props {
  notification: Notification;
}

/* ── Colors & icons per notification type ── */
const typeConfig: Record<string, { icon: string; chipBg: string; chipColor: string; iconBg: string; iconColor: string; label: string }> = {
  Placement: {
    icon: 'work',
    chipBg: 'rgba(0, 6, 102, 0.1)',
    chipColor: m3.primary,
    iconBg: m3.primaryContainer,
    iconColor: m3.onPrimaryContainer,
    label: 'Placement',
  },
  Result: {
    icon: 'school',
    chipBg: 'rgba(81, 95, 116, 0.1)',
    chipColor: m3.secondary,
    iconBg: m3.secondaryContainer,
    iconColor: m3.onSecondaryContainer,
    label: 'Academic Result',
  },
  Event: {
    icon: 'event_available',
    chipBg: 'rgba(0, 6, 102, 0.1)',
    chipColor: m3.primary,
    iconBg: m3.primaryContainer,
    iconColor: m3.onPrimaryContainer,
    label: 'Event',
  },
};

const formatTimestamp = (timestamp: string) => {
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return timestamp;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  } catch {
    return timestamp;
  }
};

export const NotificationCard: React.FC<Props> = ({ notification }) => {
  const { viewedIds, markAsViewed } = useNotificationContext();
  const isViewed = viewedIds.has(notification.ID);
  const config = typeConfig[notification.Type] || typeConfig['Event'];

  const handleClick = () => {
    if (!isViewed) {
      markAsViewed(notification.ID);
      logFrontend('info', 'component', `Notification ${notification.ID} marked as viewed`);
    }
  };

  return (
    <Box
      className="notification-card"
      onClick={handleClick}
      sx={{
        bgcolor: isViewed ? m3.surface : m3.surface,
        p: '20px',
        borderRadius: '12px',
        cursor: isViewed ? 'default' : 'pointer',
        border: isViewed ? `1px solid ${m3.outlineVariant}` : 'none',
        borderLeft: isViewed ? `1px solid ${m3.outlineVariant}` : `4px solid ${m3.primary}`,
        boxShadow: isViewed ? 'none' : '0 4px 12px rgba(0, 6, 102, 0.06)',
        opacity: isViewed ? 0.8 : 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          opacity: 1,
          boxShadow: isViewed ? 'none' : '0 8px 20px rgba(0, 6, 102, 0.1)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        {/* Type Icon */}
        <Box sx={{
          width: 48, height: 48, borderRadius: '12px',
          bgcolor: isViewed ? m3.surfaceContainer : config.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <MIcon
            icon={config.icon}
            sx={{
              color: isViewed ? m3.onSurfaceVariant : config.iconColor,
              fontSize: '24px',
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Header row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '4px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{
                fontSize: '22px', lineHeight: '28px', fontWeight: 500,
                color: m3.onBackground,
              }}>
                {notification.Message}
              </Typography>
              {!isViewed && (
                <Box sx={{
                  width: 8, height: 8, borderRadius: '50%',
                  bgcolor: m3.primary, flexShrink: 0,
                }} />
              )}
            </Box>
            <Typography sx={{
              fontSize: '12px', lineHeight: '16px', fontWeight: 600,
              color: m3.onSurfaceVariant,
              opacity: isViewed ? 1 : 0.7,
              flexShrink: 0, ml: 1,
            }}>
              {formatTimestamp(notification.Timestamp)}
            </Typography>
          </Box>

          {/* Type badge */}
          <Box sx={{ mb: '12px' }}>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                px: 1, py: 0.25,
                borderRadius: '6px',
                bgcolor: isViewed ? m3.surfaceContainer : config.chipBg,
                color: isViewed ? m3.onSurfaceVariant : config.chipColor,
                fontSize: '10px', fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 1,
              }}
            >
              {config.label}
            </Box>
            <Typography sx={{
              fontSize: '14px', lineHeight: '20px',
              color: m3.onSurfaceVariant,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              Notification ID: {notification.ID.slice(0, 8)}… — Type: {notification.Type}
            </Typography>
          </Box>

          {/* Action buttons */}
          {!isViewed && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Box
                component="button"
                onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleClick(); }}
                sx={{
                  bgcolor: m3.primary, color: m3.onPrimary,
                  px: 3, py: 1, borderRadius: '8px', border: 'none',
                  fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: '"Inter", sans-serif',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: '0 4px 12px rgba(0,6,102,0.3)' },
                }}
              >
                Mark as Read
              </Box>
              <Box
                component="button"
                sx={{
                  bgcolor: 'transparent', color: m3.onSurfaceVariant,
                  px: 3, py: 1, borderRadius: '8px', border: 'none',
                  fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: '"Inter", sans-serif',
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: m3.surfaceContainerHigh },
                }}
              >
                Dismiss
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
