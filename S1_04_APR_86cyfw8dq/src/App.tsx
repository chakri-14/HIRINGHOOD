import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { lightTheme, darkTheme } from './styles/theme';
import store from './redux/store';
import Home from './pages/Home';
import WeatherDetails from './pages/WeatherDetails';
import ThemeToggle from './components/ThemeToggle';
import { CssBaseline } from '@mui/material';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <ThemeToggle toggleTheme={() => setIsDarkMode(!isDarkMode)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<WeatherDetails />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;