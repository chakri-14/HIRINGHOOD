import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import NoteItem from './components/NoteItem';
import FloatingActionButton from './components/FloatingActionButton';
import AddTaskModal from './components/AddTaskModal';
import { Note } from './types';
import { useTheme } from './ThemeContext';
import { themes } from './themes';

const AppContainer = styled.div`
  background: ${(props) => props.theme.background};
  min-height: 100vh;
  width: 100vw;
  padding: 20px;
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
`;

const TaskList = styled.div`
  width: 100%;
  max-width: 1200px;
  flex: 1;
`;

const App: React.FC = () => {
  const { theme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: 'NOTE #1', completed: false },
    { id: 2, title: 'NOTE #2', completed: true },
    { id: 3, title: 'NOTE #3', completed: false },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('ALL');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleToggle = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const handleAddNote = (title: string) => {
    const newNote: Note = {
      id: notes.length ? Math.max(...notes.map((note) => note.id)) + 1 : 1,
      title,
      completed: false,
    };
    setNotes([...notes, newNote]);
  };

  const handleUpdateNote = (id: number, title: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, title } : note))
    );
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((note) => {
      if (filter === 'COMPLETED') return note.completed;
      if (filter === 'PENDING') return !note.completed;
      return true; // ALL
    });

  return (
    <AppContainer theme={themes[theme]}>
      <Title>TODO LIST</Title>
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        currentFilter={filter}
      />
      <TaskList>
        {filteredNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onToggle={handleToggle}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
          />
        ))}
      </TaskList>
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AddTaskModal
          onAdd={handleAddNote}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </AppContainer>
  );
};

export default App;