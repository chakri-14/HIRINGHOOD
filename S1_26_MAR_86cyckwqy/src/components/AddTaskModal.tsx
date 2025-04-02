import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';
import { themes } from '../themes';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.noteBackground};
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  color: ${(props) => props.theme.text};
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background: ${(props) => props.theme.searchBackground};
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.text};
  outline: none;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #6200ea;
  color: #fff;
`;

const CancelButton = styled(Button)`
  background: #888;
`;

interface AddTaskModalProps {
  onAdd: (title: string) => void;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onAdd, onClose }) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title);
      onClose();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent theme={themes[theme]}>
        <ModalInput
          theme={themes[theme]}
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ModalButtons>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <Button onClick={handleAdd}>Add</Button>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddTaskModal;