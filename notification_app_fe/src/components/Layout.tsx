import React, { useState } from 'react';
import {
  Box, AppBar, Toolbar, Typography, Drawer, IconButton,
  useMediaQuery, useTheme, BottomNavigation, BottomNavigationAction, Paper
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { m3 } from '../styles/theme';

const DRAWER_WIDTH = 320;

/** Material Symbol helper */
const MIcon = ({ icon, filled, sx }: { icon: string; filled?: boolean; sx?: any }) => (
  <span
    className="material-symbols-outlined"
    style={{
      fontVariationSettings: filled
        ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
        : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
      ...sx,
    }}
  >
    {icon}
  </span>
);

export { MIcon };

/* ── Sidebar nav items ── */
const navItems = [
  { text: 'All Feed', icon: 'rss_feed', path: '/' },
  { text: 'Priority Inbox', icon: 'priority_high', path: '/priority' },
];

/* ── Bottom nav items (mobile) ── */
const bottomItems = [
  { label: 'Feed', icon: 'notifications', path: '/' },
  { label: 'Priority', icon: 'star', path: '/priority' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  /* ── Sidebar content ── */
  const sidebar = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', pt: '80px' }}>
      {/* Profile section */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box sx={{
            width: 48, height: 48, borderRadius: '12px',
            bgcolor: m3.primaryContainer,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MIcon icon="person" sx={{ color: m3.onPrimaryContainer, fontSize: '24px' }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '22px', lineHeight: '28px', fontWeight: 500, color: m3.onSurface }}>
              Academic Profile
            </Typography>
            <Typography sx={{ fontSize: '12px', lineHeight: '16px', fontWeight: 600, color: m3.onSurfaceVariant, letterSpacing: '0.1px' }}>
              B.Tech Computer Science
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: m3.primary, mt: 0.5, ml: '64px' }}>
          Batch 2024
        </Typography>
      </Box>

      {/* Nav links */}
      <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Box
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => isMobile && setMobileOpen(false)}
              sx={{
                display: 'flex', alignItems: 'center', gap: '12px',
                py: '12px', px: '16px', mx: 1,
                borderRadius: '9999px',
                textDecoration: 'none',
                bgcolor: isActive ? m3.secondaryContainer : 'transparent',
                color: isActive ? m3.onSecondaryContainer : m3.onSurfaceVariant,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: isActive ? m3.secondaryContainer : m3.surfaceContainerHighest,
                },
              }}
            >
              <MIcon icon={item.icon} filled={isActive} />
              <Typography sx={{ fontSize: '12px', lineHeight: '16px', fontWeight: 600, letterSpacing: '0.1px' }}>
                {item.text}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Bottom info card */}
      <Box sx={{ mt: 'auto', p: 3 }}>
        <Box sx={{
          p: 2, borderRadius: '12px',
          bgcolor: m3.primaryContainer,
          color: m3.onPrimaryContainer,
        }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 600, mb: 1 }}>Campus Alert</Typography>
          <Typography sx={{ fontSize: '10px', opacity: 0.9 }}>
            Semester registrations end in 2 days. Complete your profile now.
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: m3.surface }}>
      {/* ── Top App Bar ── */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: m3.surface,
          borderBottom: `1px solid ${m3.outlineVariant}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          zIndex: (t) => t.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 }, height: 64 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ color: m3.primary }}>
                <MIcon icon="menu" />
              </IconButton>
            )}
            <Typography sx={{
              fontSize: '32px', lineHeight: '40px', fontWeight: 600,
              color: m3.primary, letterSpacing: '-0.5px',
            }}>
              Campus Portal
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isMobile && (
              <Box sx={{
                display: 'flex', alignItems: 'center',
                bgcolor: m3.surfaceContainer, px: 2, py: 1,
                borderRadius: '9999px', width: 320,
              }}>
                <MIcon icon="search" sx={{ color: m3.onSurfaceVariant, fontSize: '18px' }} />
                <input
                  placeholder="Search notifications..."
                  style={{
                    border: 'none', outline: 'none', background: 'transparent',
                    fontSize: '14px', lineHeight: '20px', width: '100%', marginLeft: '8px',
                    fontFamily: '"Inter", sans-serif', color: m3.onSurface,
                  }}
                />
              </Box>
            )}
            <IconButton sx={{ color: m3.primary, position: 'relative' }}>
              <MIcon icon="notifications" />
              <Box sx={{
                position: 'absolute', top: 8, right: 8,
                width: 8, height: 8, bgcolor: m3.error,
                borderRadius: '50%',
              }} />
            </IconButton>
            <Box sx={{
              width: 40, height: 40, borderRadius: '50%',
              bgcolor: m3.secondaryContainer, border: `1px solid ${m3.outlineVariant}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 1,
            }}>
              <MIcon icon="person" sx={{ color: m3.onSecondaryContainer, fontSize: '20px' }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Sidebar (desktop) ── */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              bgcolor: m3.surfaceContainer,
              borderRight: `1px solid ${m3.outlineVariant}`,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          {sidebar}
        </Drawer>
      )}

      {/* ── Sidebar (mobile) ── */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              bgcolor: m3.surfaceContainer,
              boxSizing: 'border-box',
            },
          }}
        >
          {sidebar}
        </Drawer>
      )}

      {/* ── Main Content ── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${DRAWER_WIDTH}px` },
          pt: '64px',
          pb: { xs: '80px', md: 3 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
          {children}
        </Box>
      </Box>

      {/* ── Bottom Navigation (mobile) ── */}
      {isMobile && (
        <Paper
          sx={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            borderTop: `1px solid ${m3.outlineVariant}`,
            zIndex: (t) => t.zIndex.drawer + 1,
          }}
          elevation={0}
        >
          <BottomNavigation
            value={location.pathname}
            sx={{ bgcolor: m3.surface, height: 64 }}
          >
            {bottomItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <BottomNavigationAction
                  key={item.path}
                  component={Link as any}
                  to={item.path}
                  value={item.path}
                  label={item.label}
                  icon={<MIcon icon={item.icon} filled={isActive} />}
                  sx={{
                    color: isActive ? m3.onPrimaryContainer : m3.onSurfaceVariant,
                    '&.Mui-selected': { color: m3.onPrimaryContainer },
                    ...(isActive && {
                      bgcolor: m3.primaryContainer,
                      borderRadius: '12px',
                      mx: 0.5,
                    }),
                  }}
                />
              );
            })}
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
};
