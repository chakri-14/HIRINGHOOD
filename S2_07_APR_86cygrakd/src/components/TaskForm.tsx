import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Task } from '../types';
import { TextField, Button, Select, MenuItem } from '@mui/material';

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  dueDate: Yup.date()
    .min(new Date(), 'Date must be in the future')
    .required('Required'),
});

interface TaskFormProps {
  initialValues: Task;
  onSubmit: (values: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form className="task-form">
          <TextField
            name="title"
            label="Title"
            value={values.title}
            onChange={handleChange}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            multiline
            rows={4}
            value={values.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="dueDate"
            type="date"
            label="Due Date"
            value={values.dueDate}
            onChange={handleChange}
            error={touched.dueDate && !!errors.dueDate}
            helperText={touched.dueDate && errors.dueDate}
            fullWidth
            margin="normal"
          />
          <Select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
          <Select
            name="status"
            value={values.status}
            onChange={handleChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
          <TextField
            name="tags"
            label="Tags (comma-separated)"
            value={values.tags?.join(',') || ''}
            onChange={(e) => handleChange({
              target: {
                name: 'tags',
                value: e.target.value.split(',').map(tag => tag.trim())
              }
            })}
            fullWidth
            margin="normal"
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};