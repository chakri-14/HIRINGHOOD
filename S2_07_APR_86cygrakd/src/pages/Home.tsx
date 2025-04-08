import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskFilters } from '../types';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import { Button } from '@mui/material';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TaskFilters>({});
  const filteredTasks = useFilteredTasks(filters);

  return (
    <div>
      <div className="header">
        <h1>Task Manager</h1>
        <Button
          variant="contained"
          sx={{ 
            background: 'var(--accent-color)',
            '&:hover': { 
              background: 'darken(var(--accent-color), 10%)' 
            }
          }}
          onClick={() => navigate('/task/new')}
        >
          Add Task
        </Button>
      </div>
      <FilterBar filters={filters} setFilters={setFilters} />
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default Home;