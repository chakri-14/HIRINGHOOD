import React, { useEffect, useState } from 'react';
import {
  TextField,
  Card,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface Category {
  _id: string;
  name: string;
}

const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/categories')
      .then((response) => {
        const fetchedCategories: Category[] = response?.data?.data || [];
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      category: '',
      tags: '',
      status: 'draft',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      category: Yup.string().required('Category is required'),
      tags: Yup.string(),
      status: Yup.string().oneOf(['draft', 'published'], 'Invalid status'),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add a post.');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          'http://localhost:5000/api/posts/create',
          {
            ...values,
            tags: values.tags.split(',').map((tag) => tag.trim()),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response?.data?.status) {
          setOpenSnackbar(true);
          formik.resetForm();
          setTimeout(() => navigate('/'), 2000);
        } else {
          alert(response.data.message);
        }
      } catch (error: any) {
        alert(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      sx={{ p: 2, bgcolor: theme.palette.background.default }}
    >
      <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
        <Paper elevation={10} sx={{ p: 4, borderRadius: 4, bgcolor: theme.palette.background.paper }}>
          <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
            Create a New Post
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#fff' } }}
            />

            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              multiline
              rows={5}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#fff' } }}
            />

            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Category"
                error={formik.touched.category && Boolean(formik.errors.category)}
                sx={{ '& .MuiSelect-select': { bgcolor: '#fff' } }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {formik.errors.category}
                </Typography>
              )}
            </FormControl>

            <TextField
              fullWidth
              label="Tags (comma-separated)"
              variant="outlined"
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tags && Boolean(formik.errors.tags)}
              helperText={formik.touched.tags && formik.errors.tags}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#fff' } }}
            />

            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Status"
                error={formik.touched.status && Boolean(formik.errors.status)}
                sx={{ '& .MuiSelect-select': { bgcolor: '#fff' } }}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
              </Select>
              {formik.touched.status && formik.errors.status && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {formik.errors.status}
                </Typography>
              )}
            </FormControl>

            <Box textAlign="right" mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={loading}
                endIcon={loading && <CircularProgress size={20} />}
                sx={{
                  backgroundColor: '#3f51b5',
                  '&:hover': { backgroundColor: '#283593' },
                  color: '#fff',
                }}
              >
                {loading ? 'Posting...' : 'Add Post'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Post added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddPost;