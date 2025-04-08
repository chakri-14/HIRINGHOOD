import { useNavigate } from 'react-router-dom';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`task-item ${task.priority.toLowerCase()}`}
      onClick={() => navigate(`/task/${task.id}`)}
    >
      <h3>{task.title}</h3>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      {task.tags && (
        <div className="tags">
          Tags: {task.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskItem;