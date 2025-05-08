import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FrontendProject } from '../types';
import ProjectCard from './ProjectCard';
import ProjectDetailsModal from './ProjectDetailsModal';

interface ProjectGridProps {
  projects: FrontendProject[];
  searchQuery: string;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  padding: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  grid-column: 1 / -1;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--color-text);
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 32rem;
  margin: 0 auto;
`;

// Animation variants for grid items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }),
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
};

const ProjectGrid = ({ projects, searchQuery }: ProjectGridProps) => {
  const [selectedProject, setSelectedProject] = useState<FrontendProject | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<FrontendProject[]>(projects);

  // Filter projects when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = projects.filter(project => {
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techStack.some(tech => tech.toLowerCase().includes(query))
      );
    });
    
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  return (
    <>
      <Grid>
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  layoutId={`project-${project.id}`}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState>
                <EmptyTitle>No projects found</EmptyTitle>
                <EmptyDescription>
                  No projects match your search criteria. Try adjusting your search term or explore other technologies.
                </EmptyDescription>
              </EmptyState>
            </motion.div>
          )}
        </AnimatePresence>
      </Grid>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default ProjectGrid;