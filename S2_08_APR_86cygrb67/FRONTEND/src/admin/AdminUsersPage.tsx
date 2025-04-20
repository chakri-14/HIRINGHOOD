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
  Switch,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedUsers = res.data.data.sort((a: User, b: User) => a.name.localeCompare(b.name));
      setUsers(sortedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/${currentStatus ? 'disable' : 'enable'}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user => user._id === id ? { ...user, isActive: !currentStatus } : user));
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Users
      </Typography>

      <Paper elevation={3}>
        <List>
          {users.map((user) => (
            <React.Fragment key={user._id}>
              <ListItem>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      <Box>Email: {user.email}</Box>
                      <Box>Role: {user.role}</Box>
                      <Box>Status: <Switch checked={user.isActive} onChange={() => handleToggleActive(user._id, user.isActive)} /></Box>
                    </>
                  }
                />
                <IconButton>
                  <Edit />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default AdminUsersPage;