import { createTheme } from '@mui/material/styles';

/**
 * Material Design 3 inspired theme — light mode.
 * Color tokens taken directly from the reference design.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000666',
      light: '#4c56af',
      dark: '#000453',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#515f74',
      light: '#d5e3fc',
      dark: '#3a485b',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ba1a1a',
      light: '#ffdad6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fbf8ff',
      paper: '#fbf8ff',
    },
    text: {
      primary: '#1b1b21',
      secondary: '#454652',
    },
    divider: '#c6c5d4',
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h4: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 600,
    },
    h5: {
      fontSize: '22px',
      lineHeight: '28px',
      fontWeight: 500,
    },
    h6: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
    },
    caption: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 600,
      letterSpacing: '0.1px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fbf8ff',
          fontFamily: '"Inter", sans-serif',
        },
        '.material-symbols-outlined': {
          fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '12px',
          borderRadius: '8px',
          padding: '8px 24px',
        },
      },
    },
  },
});

export default theme;

/* ── Extended M3 color tokens (for use via sx prop) ── */
export const m3 = {
  primary: '#000666',
  primaryContainer: '#1a237e',
  onPrimaryContainer: '#8690ee',
  secondary: '#515f74',
  secondaryContainer: '#d5e3fc',
  onSecondaryContainer: '#57657a',
  tertiaryContainer: '#5c1800',
  onTertiaryContainer: '#e17c5a',
  surface: '#fbf8ff',
  surfaceDim: '#dbd9e1',
  surfaceContainer: '#efecf5',
  surfaceContainerLow: '#f5f2fb',
  surfaceContainerHigh: '#eae7ef',
  surfaceContainerHighest: '#e4e1ea',
  onBackground: '#1b1b21',
  onSurface: '#1b1b21',
  onSurfaceVariant: '#454652',
  outlineVariant: '#c6c5d4',
  outline: '#767683',
  error: '#ba1a1a',
  onPrimary: '#ffffff',
  inverseSurface: '#303036',
  inverseOnSurface: '#f2eff8',
};
