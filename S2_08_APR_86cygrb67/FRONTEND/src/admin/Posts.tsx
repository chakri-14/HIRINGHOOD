import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

interface Author {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  status: string;
  author: Author;
}

  const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:5000/api/admin/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const postsData = Array.isArray(res.data.posts) ? res.data.posts : [];
      setPosts(postsData);
    } catch (error: any) {
      console.error('Error fetching posts:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(posts.filter(post => post._id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Post Details
        </Typography>

        <Paper elevation={3}>
          {loading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {posts.map((post) => (
                <React.Fragment key={post._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="h6" fontWeight="bold">
                          {post.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            <b>Status:</b> {post.status}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <b>Content:</b> {post.content}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <b>Author Name:</b> {post.author?.name || 'Unknown'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <b>Created At:</b> {dayjs(post.createdAt).format('DD MMM YYYY, HH:mm')}
                          </Typography>
                        </>
                      }
                    />
                    <IconButton onClick={() => navigate(`/edit/${post._id}`)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(post._id)} color="error">
                      <Delete />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
};



export default Posts;