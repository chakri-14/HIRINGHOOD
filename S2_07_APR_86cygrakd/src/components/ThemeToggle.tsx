import { useTheme } from '../context/ThemeContext';
import { Switch, FormControlLabel } from '@mui/material';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <FormControlLabel
        control={
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            icon={<MdLightMode />}
            checkedIcon={<MdDarkMode />}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: 'var(--accent-color)',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'var(--accent-color)',
              },
            }}
          />
        }
        label={theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      />
    </div>
  );
};

export default ThemeToggle;