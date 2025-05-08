import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { FrontendProject, TechStack } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';

interface ProjectCardProps {
  project: FrontendProject;
  onClick: () => void;
}

const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 0;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--color-accent);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  z-index: 10;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0 0 1rem 0;
  line-height: 1.5;
  flex-grow: 1;
`;

const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const TechBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--color-tech-badge-bg);
  color: var(--color-tech-badge-text);
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
`;

// Function to determine badge color based on tech name
const getTechColor = (tech: TechStack) => {
  const colors: Record<string, string> = {
    React: 'var(--color-tech-react)',
    TypeScript: 'var(--color-tech-typescript)',
    JavaScript: 'var(--color-tech-javascript)',
    HTML: 'var(--color-tech-html)',
    CSS: 'var(--color-tech-css)',
    MUI: 'var(--color-tech-mui)',
    Tailwind: 'var(--color-tech-tailwind)',
    Bootstrap: 'var(--color-tech-bootstrap)',
    Redux: 'var(--color-tech-redux)',
    'Next.js': 'var(--color-tech-nextjs)',
  };
  
  return colors[tech] || 'var(--color-tech-default)';
};

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <CardContainer>
      <ImageContainer>
        {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
        <Image 
          src={project.thumbnail} 
          alt={project.title} 
          loading="lazy"
        />
      </ImageContainer>
      <Content>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        
        <TechStackContainer>
          {project.techStack.map((tech, index) => (
            <TechBadge
              key={index}
              style={{ backgroundColor: getTechColor(tech) }}
            >
              {tech}
            </TechBadge>
          ))}
        </TechStackContainer>
        
        <ActionsContainer>
          <Button 
            variant="primary" 
            onClick={onClick}
          >
            View Details
          </Button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant="outline"
              aria-label="View source code"
              onClick={() => window.open(project.githubUrl, '_blank')}
              icon={<Github size={16} />}
            />
            <Button
              variant="outline"
              aria-label="View live demo"
              onClick={() => window.open(project.liveDemoUrl, '_blank')}
              icon={<ExternalLink size={16} />}
            />
          </div>
        </ActionsContainer>
      </Content>
    </CardContainer>
  );
};

export default ProjectCard;