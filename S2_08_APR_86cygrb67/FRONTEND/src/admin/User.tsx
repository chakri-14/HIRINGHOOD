import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [newRole, setNewRole] = useState<string>('user');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateRole = async () => {
    if (selectedUser) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:5000/api/admin/access/${selectedUser}`, { role: newRole }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.map(user => user._id === selectedUser ? { ...user, role: newRole } : user));
        setSelectedUser('');
      } catch (error) {
        console.error('Error updating role:', error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage User Roles</Typography>
      <Box mt={2}>
        <Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value as string)} fullWidth>
          <MenuItem value="">Select User</MenuItem>
          {users.map(user => (
            <MenuItem key={user._id} value={user._id}>{user.name} ({user.role})</MenuItem>
          ))}
        </Select>
        <Select value={newRole} onChange={(e) => setNewRole(e.target.value as string)} fullWidth sx={{ mt: 2 }}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleUpdateRole} sx={{ mt: 2 }}>
          Update Role
        </Button>
      </Box>
    </Container>
  );
};

export default User;