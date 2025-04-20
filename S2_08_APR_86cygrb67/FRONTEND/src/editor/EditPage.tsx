import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [tags, setTags] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(res.data.title);
        setContent(res.data.content);
        setStatus(res.data.status);
        setTags(res.data.tags.join(","));
      } catch (err) {
        showSnackbar("Failed to load post", "error");
      }
    };
    fetchPost();
  }, [id]);

  const showSnackbar = (msg: string, severity: "success" | "error") => {
    setSnackbarMsg(msg);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { title, content, status, tags: tags.split(",").map((tag) => tag.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSnackbar("Post updated", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      showSnackbar(err?.response?.data?.message || "Update failed", "error");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        await axios.delete(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        showSnackbar("Post deleted", "success");
        setTimeout(() => navigate("/"), 1500);
      } catch (err: any) {
        showSnackbar(err?.response?.data?.message || "Delete failed", "error");
      }
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 6 }}>
      <Paper elevation={3} sx={{ maxWidth: 500, mx: "auto", p: 4 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Edit Post
        </Typography>

        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          multiline
          rows={5}
          variant="outlined"
        />

        <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
            label="Status"
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="published">Published</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)} sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditPage;