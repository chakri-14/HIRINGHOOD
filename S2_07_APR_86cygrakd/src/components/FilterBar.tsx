import { TaskFilters } from '../types';
import { TextField, Select, MenuItem } from '@mui/material';

interface FilterBarProps {
  filters: TaskFilters;
  setFilters: (filters: TaskFilters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  return (
    <div className="filter-bar">
      <TextField
        label="Search"
        value={filters.search || ''}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        sx={{ minWidth: 200 }}
      />
      <Select
        value={filters.status || ''}
        onChange={(e) => setFilters({ ...filters, status: e.target.value || undefined })}
        displayEmpty
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All Statuses</MenuItem>
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </Select>
      <Select
        value={filters.priority || ''}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value || undefined })}
        displayEmpty
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All Priorities</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </Select>
    </div>
  );
};

export default FilterBar;