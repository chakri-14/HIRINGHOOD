import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';
import { themes } from '../themes';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.searchBackground};
  border-radius: 5px;
  padding: 5px 10px;
  flex: 1;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.text};
  flex: 1;
  outline: none;
  font-size: 16px;
  &::placeholder {
    color: ${(props) => props.theme.placeholderColor};
  }
`;

const SearchIcon = styled.span`
  color: ${(props) => props.theme.placeholderColor};
  margin-right: 10px;
`;

const DropdownSelect = styled.select`
  background: ${(props) => props.theme.dropdownBackground};
  color: ${(props) => props.theme.text};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const ThemeToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.actionIconColor};
  cursor: pointer;
  font-size: 16px;
`;

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange, currentFilter }) => {
  const { theme, toggleTheme } = useTheme();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchInputWrapper theme={themes[theme]}>
        <SearchIcon theme={themes[theme]}>🔍</SearchIcon>
        <SearchInput
          theme={themes[theme]}
          type="text"
          placeholder="Search notes..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </SearchInputWrapper>
      <DropdownSelect
        theme={themes[theme]}
        value={currentFilter}
        onChange={handleFilterChange}
      >
        <option value="ALL">ALL</option>
        <option value="COMPLETED">Completed</option>
        <option value="PENDING">Pending</option>
      </DropdownSelect>
      <ThemeToggleButton theme={themes[theme]} onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </ThemeToggleButton>
    </SearchContainer>
  );
};

export default SearchBar;