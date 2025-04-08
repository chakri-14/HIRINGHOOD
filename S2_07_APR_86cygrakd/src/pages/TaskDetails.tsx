import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteTask } from '../store/tasksSlice';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

const TaskDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const task = useSelector((state: RootState) => 
    state.tasks.tasks.find(t => t.id === id)
  );

  if (!task) return <div>Task not found</div>;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
      enqueueSnackbar('Task deleted successfully', { variant: 'success' });
      navigate('/');
    }
  };

  return (
    <div className="task-details">
      <h1>{task.title}</h1>
      <div className="task-info">
        <p><strong>Description:</strong> {task.description || 'No description'}</p>
        <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.status}</p>
        {task.tags && (
          <p><strong>Tags:</strong> {task.tags.join(', ')}</p>
        )}
      </div>
      <div className="task-actions">
        <Button 
          variant="contained" 
          sx={{ 
            background: 'var(--accent-color)',
            '&:hover': { 
              background: 'darken(var(--accent-color), 10%)' 
            }
          }}
          onClick={() => navigate(`/task/${task.id}/edit`)}
        >
          Edit
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskDetails;