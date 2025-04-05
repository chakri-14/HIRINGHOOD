import { Button } from '@mui/material';
import { WiDaySunny, WiNightClear } from 'react-icons/wi'; 
import styled from '@emotion/styled';

const ToggleContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

interface ThemeToggleProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeToggle = ({ toggleTheme, isDarkMode }: ThemeToggleProps) => {
  return (
    <ToggleContainer>
      <Button
        onClick={toggleTheme}
        variant="outlined"
        startIcon={isDarkMode ? <WiNightClear size={24} /> : <WiDaySunny size={24} />}
      >
        {isDarkMode ? 'Dark' : 'Light'}
      </Button>
    </ToggleContainer>
  );
};

export default ThemeToggle;
