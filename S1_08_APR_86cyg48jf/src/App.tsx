import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useTheme } from './hooks/useTheme';
import { Layout } from './components/Layout';
import { Home } from './pages/Home/index';
import { AddTransaction } from './pages/AddTransaction/index';

function ThemedApp() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function App() {
  return <ThemedApp />;
}