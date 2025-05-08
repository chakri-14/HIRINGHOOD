import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ProjectGrid from './components/ProjectGrid';
import SkillsRadarChart from './components/SkillsRadarChart';
import { projects } from './data/projects';
import { skills } from './data/skills';
import './styles/globals.css';

const Main = styled.main`
  padding-bottom: 4rem;
`;

const HeroSection = styled.section`
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0 0 1rem 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  max-width: 48rem;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 2rem 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 0 0 1.5rem 0;
  }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SkillsSection = styled.section`
  background-color: var(--color-background-alt);
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SkillsContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider>
      <div className="app">
        <Header onSearch={setSearchQuery} />
        
        <Main>
          <HeroSection>
            <Title>Projects Showcase</Title>
            <Subtitle>
           These are some of my projects that I have worked on as an intern at Hiringhood. You can find more details about each project by clicking on the project cards below.
            </Subtitle>
          </HeroSection>
          
          <Section>
            <SectionTitle>Featured Projects</SectionTitle>
            <ProjectGrid projects={projects} searchQuery={searchQuery} />
          </Section>
          
          <SkillsSection>
            <SkillsContent>
              <SectionTitle>Technical Skills</SectionTitle>
              <SkillsRadarChart skills={skills} />
            </SkillsContent>
          </SkillsSection>
          
        
        </Main>
      </div>
    </ThemeProvider>
  );
}

export default App;