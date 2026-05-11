
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import { NotificationProvider } from './context/NotificationContext';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;