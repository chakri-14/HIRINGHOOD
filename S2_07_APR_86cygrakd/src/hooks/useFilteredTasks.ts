import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Task, TaskFilters } from '../types';

export const useFilteredTasks = (filters: TaskFilters): Task[] => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return tasks.filter(task => {
    const statusMatch = !filters.status || task.status === filters.status;
    const priorityMatch = !filters.priority || task.priority === filters.priority;
    const searchMatch = !filters.search || 
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.tags?.some(tag => tag.toLowerCase().includes((filters.search ?? '').toLowerCase()));

    return statusMatch && priorityMatch && searchMatch;
  });
};