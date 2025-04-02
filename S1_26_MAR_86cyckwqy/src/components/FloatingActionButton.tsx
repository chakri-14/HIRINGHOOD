import React from 'react';
import styled from 'styled-components';

const FAB = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #6200ea;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

interface FABProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FABProps> = ({ onClick }) => {
  return <FAB onClick={onClick}>+</FAB>;
};

export default FloatingActionButton;