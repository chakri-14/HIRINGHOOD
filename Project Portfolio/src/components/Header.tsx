import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Moon, Sun, Code, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from './ui/Button';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  background-color: var(--color-header-bg);
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.3s ease;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-primary);
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 24rem;
  margin: 0 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.75rem;
  background-color: var(--color-input-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  color: var(--color-text);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-lighter);
  }
  
  &::placeholder {
    color: var(--color-text-muted);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-background);
  z-index: 100;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileSearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
`;

const Header = ({ onSearch }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event to update header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <>
      <HeaderContainer style={{ 
        boxShadow: isScrolled ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
      }}>
        <HeaderContent>
          <Logo>
            <Code size={24} />
            <span>Chakri's Portfolio</span>
          </Logo>
          
          <SearchContainer>
            <form onSubmit={handleSearchSubmit}>
              <SearchInput
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <SearchIcon>
                <Search size={18} />
              </SearchIcon>
            </form>
          </SearchContainer>
          
          <Actions>
            <Button
              variant="ghost"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              onClick={toggleTheme}
              icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            />
            
            <MobileMenuToggle 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </MobileMenuToggle>
            
            <Button variant="primary" className="hidden md:flex">
              Contact Me
            </Button>
          </Actions>
        </HeaderContent>
      </HeaderContainer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <MobileMenuHeader>
              <Logo>
                <Code size={24} />
                <span>Portfolio</span>
              </Logo>
              <Button
                variant="ghost"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                icon={<X size={24} />}
              />
            </MobileMenuHeader>
            
            <MobileSearchContainer>
              <form onSubmit={handleSearchSubmit}>
                <SearchInput
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <SearchIcon>
                  <Search size={18} />
                </SearchIcon>
              </form>
            </MobileSearchContainer>
            
            <MobileMenuItems>
              <Button 
                variant="ghost" 
                fullWidth 
                onClick={toggleTheme}
                icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
              <Button variant="primary" fullWidth>
                Contact Me
              </Button>
            </MobileMenuItems>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;