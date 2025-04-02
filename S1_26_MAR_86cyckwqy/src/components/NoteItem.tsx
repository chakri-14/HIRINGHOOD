import React, { useState } from 'react';
import styled from 'styled-components';
import { Note } from '../types';
import { useTheme } from '../ThemeContext';
import { themes } from '../themes';
import EditTaskModal from './EditTaskModal';

const NoteContainer = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${(props) =>
    props.completed ? props.theme.noteBackgroundCompleted : props.theme.noteBackground};
  border-radius: 5px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.text};
  width: 100%;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const NoteTitle = styled.span<{ completed: boolean }>`
  flex: 1;
  color: ${(props) => props.theme.text};
  font-size: 16px;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const NoteActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionIcon = styled.span`
  color: ${(props) => props.theme.actionIconColor};
  cursor: pointer;
`;

interface NoteItemProps {
  note: Note;
  onToggle: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onToggle, onUpdate, onDelete }) => {
  const { theme } = useTheme();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdate = (newTitle: string) => {
    onUpdate(note.id, newTitle);
  };

  return (
    <NoteContainer theme={themes[theme]} completed={note.completed}>
      <Checkbox
        type="checkbox"
        checked={note.completed}
        onChange={() => onToggle(note.id)}
      />
      <NoteTitle theme={themes[theme]} completed={note.completed}>
        {note.title}
      </NoteTitle>
      <NoteActions>
        <ActionIcon theme={themes[theme]} onClick={() => setIsEditModalOpen(true)}>
          ✏️
        </ActionIcon>
        <ActionIcon theme={themes[theme]} onClick={() => onDelete(note.id)}>
          🗑️
        </ActionIcon>
      </NoteActions>
      {isEditModalOpen && (
        <EditTaskModal
          title={note.title}
          onUpdate={handleUpdate}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </NoteContainer>
  );
};

export default NoteItem;