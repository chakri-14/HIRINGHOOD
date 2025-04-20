import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#3f51b5' },
            secondary: { main: '#f50057' },
            background: { default: '#f5f5f5', paper: '#ffffff' },
            text: { primary: '#333', secondary: '#666' },
          }
        : {
            primary: { main: '#90caf9' },
            secondary: { main: '#f48fb1' },
            background: { default: '#121212', paper: '#1e1e1e' },
            text: { primary: '#fff', secondary: '#bbb' },
          }),
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h4: { fontWeight: 700 },
      h6: { fontWeight: 500 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none' },
        },
      },
    },
  });