import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface AddCategoryProps {
  addCategory: boolean;
  setAddCategory: (value: boolean) => void;
}

const AddCategory = ({ addCategory, setAddCategory }: AddCategoryProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setErrorMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/categories/add",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        setAddCategory(false);
        setName("");
        setDescription("");
        setShowSuccess(true);
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to add category");
      setShowError(true);
    }
  };

  return (
    <>
      <Dialog open={addCategory} onClose={() => setAddCategory(false)} fullWidth>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            fullWidth
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Category Description"
            fullWidth
            margin="dense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddCategory(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Category added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCategory;