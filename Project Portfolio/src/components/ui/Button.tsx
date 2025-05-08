import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const StyledButton = styled(motion.button)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  cursor: pointer;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};

  /* Size styles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'lg':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        `;
      default: // md
        return `
          padding: 0.625rem 1.25rem;
          font-size: 1rem;
        `;
    }
  }}

  /* Variant styles */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: var(--color-primary);
          color: white;
          border: none;
          &:hover {
            background-color: var(--color-primary-dark);
          }
          &:active {
            background-color: var(--color-primary-darker);
          }
        `;
      case 'secondary':
        return `
          background-color: var(--color-secondary);
          color: white;
          border: none;
          &:hover {
            background-color: var(--color-secondary-dark);
          }
          &:active {
            background-color: var(--color-secondary-darker);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
          &:hover {
            background-color: var(--color-primary-lightest);
          }
          &:active {
            background-color: var(--color-primary-lighter);
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: var(--color-text);
          border: none;
          &:hover {
            background-color: var(--color-background-alt);
          }
          &:active {
            background-color: var(--color-border);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {icon && <span className="icon">{icon}</span>}
      {children}
    </StyledButton>
  );
};

export default Button;