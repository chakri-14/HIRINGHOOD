import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Switch,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../theme'; 

interface Post {
  _id: string;
  title: string;
  content: string;
  category: { _id: string; name: string };
  createdAt: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddPost = () => {
    navigate('/add-post');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPosts();
    else navigate('/login');
  }, [navigate, token]);

  return (
    <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light')}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>CMS</Typography>
          <Box>
            <Button onClick={handleAddPost} sx={{ mx: 1, color: theme.palette.text.primary }}>
              Add Post
            </Button>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <Button onClick={handleLogout} sx={{ mx: 1, color: theme.palette.text.primary }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          Welcome, {user.name || 'User'}
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : posts.length > 0 ? (
          <Box mt={3} display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
            {posts.map((post) => (
              <Card
                key={post._id}
                onClick={() => { localStorage.setItem('post', post._id); navigate(`/edit/${post._id}`); }}
                sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
              >
                <CardContent>
                  <Typography sx={{ color: theme.palette.text.primary }}>{post.title}</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary }}>{post.content}</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Category: {post.category?.name || 'N/A'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Created At: {new Date(post.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography mt={4} sx={{ color: theme.palette.text.secondary }}>No posts available.</Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Home;
