import React from 'react';
import { Box, Typography } from '@mui/material';
import type { NotificationTypeFilter } from '../types';
import { m3 } from '../styles/theme';

interface Props {
  filterType: NotificationTypeFilter;
  setFilterType: (type: NotificationTypeFilter) => void;
  limit: number;
  setLimit: (limit: number) => void;
  showLimitSelector?: boolean;
}

const filterOptions: { label: string; value: NotificationTypeFilter }[] = [
  { label: 'All', value: 'All' },
  { label: 'Placement', value: 'Placement' },
  { label: 'Result', value: 'Result' },
  { label: 'Event', value: 'Event' },
];

const limitOptions = [5, 10, 15, 20];

export const FilterBar: React.FC<Props> = ({ filterType, setFilterType, limit, setLimit, showLimitSelector = true }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', mb: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Filter chips */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', overflow: 'auto', pb: 0.5 }}>
        {filterOptions.map((opt) => {
          const isActive = filterType === opt.value;
          return (
            <Box
              key={opt.value}
              component="button"
              onClick={() => setFilterType(opt.value)}
              sx={{
                px: 3, py: 1,
                borderRadius: '9999px',
                border: isActive ? 'none' : `1px solid ${m3.outlineVariant}`,
                bgcolor: isActive ? m3.primary : m3.surfaceContainerHighest,
                color: isActive ? m3.onPrimary : m3.onSurfaceVariant,
                fontSize: '12px', lineHeight: '16px', fontWeight: 600,
                letterSpacing: '0.1px',
                cursor: 'pointer',
                fontFamily: '"Inter", sans-serif',
                transition: 'all 0.2s',
                boxShadow: isActive ? '0 2px 6px rgba(0,6,102,0.2)' : 'none',
                '&:hover': {
                  bgcolor: isActive ? m3.primary : m3.surfaceContainerHigh,
                },
              }}
            >
              {opt.label}
            </Box>
          );
        })}
      </Box>

      {/* Limit selector */}
      {showLimitSelector && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 600, color: m3.onSurfaceVariant }}>
            Show:
          </Typography>
          <Box
            component="select"
            value={limit}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLimit(parseInt(e.target.value, 10))}
            sx={{
              bgcolor: m3.surface,
              border: `1px solid ${m3.outline}`,
              borderRadius: '8px',
              px: 2, py: 1,
              color: m3.onSurface,
              fontSize: '12px', fontWeight: 600,
              fontFamily: '"Inter", sans-serif',
              cursor: 'pointer',
              outline: 'none',
              '&:focus': { borderColor: m3.primary },
            }}
          >
            {limitOptions.map((n) => (
              <option key={n} value={n}>Top {n} Items</option>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
