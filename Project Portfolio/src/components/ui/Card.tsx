import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  elevation?: 'low' | 'medium' | 'high';
  className?: string;
}

const StyledCard = styled(motion.div)<{ $elevation: string }>`
  background-color: var(--color-card-bg);
  border-radius: 0.5rem;
  overflow: hidden;
  height: 100%;
  
  ${props => {
    switch (props.$elevation) {
      case 'low':
        return `
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
          border: 1px solid var(--color-border);
        `;
      case 'high':
        return `
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        `;
      default: // medium
        return `
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        `;
    }
  }}

  transition: box-shadow 0.3s ease, transform 0.3s ease;
  
  &:hover {
    ${props => props.$elevation !== 'low' && `
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
    `}
  }
`;

const Card = ({ children, elevation = 'medium', className }: CardProps) => {
  return (
    <StyledCard
      $elevation={elevation}
      className={className}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </StyledCard>
  );
};

export default Card;