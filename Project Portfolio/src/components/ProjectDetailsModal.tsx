import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Check } from 'lucide-react';
import { FrontendProject } from '../types';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface ProjectDetailsModalProps {
  project: FrontendProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-text);
`;

const Description = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
`;

const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TechBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--color-tech-badge-bg);
  color: var(--color-tech-badge-text);
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-text);
`;

const ScreenshotsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Screenshot = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  object-fit: cover;
  aspect-ratio: 16/9;
  border: 1px solid var(--color-border);
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
`;

const ListItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 0.125rem;
`;

const ListItemText = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
`;

const ProjectDetailsModal = ({ project, isOpen, onClose }: ProjectDetailsModalProps) => {
  if (!project) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      maxWidth="56rem"
    >
      <Container>
        <Header>
          <div>
            <Title>{project.title}</Title>
            <Description>{project.description}</Description>
            
            <TechStackContainer>
              {project.techStack.map((tech, index) => (
                <TechBadge key={index}>{tech}</TechBadge>
              ))}
            </TechStackContainer>
            
            <LinksContainer>
              <Button
                variant="primary"
                icon={<ExternalLink size={16} />}
                onClick={() => window.open(project.liveDemoUrl, '_blank')}
              >
                Live Demo
              </Button>
              <Button
                variant="outline"
                icon={<Github size={16} />}
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                Source Code
              </Button>
            </LinksContainer>
          </div>
        </Header>
        
        <Section>
          <SectionTitle>Screenshots</SectionTitle>
          <ScreenshotsContainer>
            {project.screenshots.map((screenshot, index) => (
              <Screenshot
                key={index}
                src={screenshot}
                alt={`${project.title} screenshot ${index + 1}`}
                loading="lazy"
              />
            ))}
          </ScreenshotsContainer>
        </Section>
        
        <Section>
          <SectionTitle>Key Features</SectionTitle>
          <ListContainer>
            {project.features.map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Check size={16} />
                </ListItemIcon>
                <ListItemText>{feature}</ListItemText>
              </ListItem>
            ))}
          </ListContainer>
        </Section>
        
        <Section>
          <SectionTitle>Challenges & Solutions</SectionTitle>
          {project.challenges.map((challenge, index) => (
            <div key={index}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>
                Challenge {index + 1}:
              </h3>
              <p style={{ fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
                {challenge}
              </p>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0.5rem 0 0.5rem 0' }}>
                Solution:
              </h3>
              <p style={{ fontSize: '0.875rem', margin: '0 0 1rem 0' }}>
                {project.solutions[index] || "Solution in progress"}
              </p>
            </div>
          ))}
        </Section>
      </Container>
    </Modal>
  );
};

export default ProjectDetailsModal;