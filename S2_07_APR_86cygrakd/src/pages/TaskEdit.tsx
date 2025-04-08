import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTask, updateTask } from '../store/tasksSlice';
import { TaskForm } from '../components/TaskForm';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';

const TaskEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  
  const task = useSelector((state: RootState) => 
    id ? state.tasks.tasks.find(t => t.id === id) : undefined
  );

  const initialValues: Task = task || {
    id: uuidv4(),
    title: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    status: 'To Do',
  };

  const handleSubmit = (values: Task) => {
    try {
      if (task) {
        dispatch(updateTask(values));
        enqueueSnackbar('Task updated successfully', { variant: 'success' });
      } else {
        dispatch(addTask(values));
        enqueueSnackbar('Task created successfully', { variant: 'success' });
      }
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Error saving task', { variant: 'error' });
    }
  };

  return (
    <div className="task-edit">
      <h1>{task ? 'Edit Task' : 'New Task'}</h1>
      <TaskForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default TaskEdit;