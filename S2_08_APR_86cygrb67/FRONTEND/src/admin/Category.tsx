import { Button, List, ListItem, ListItemText, Typography, Divider, Paper, Box, IconButton } from "@mui/material";
import { Delete } from '@mui/icons-material';
import axios from "axios";
import { useState, useEffect } from "react";
import AddCategory from "./AddCategory";

interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  createdAt: string;
  count: number;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState<boolean>(false);

  const fetchCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/categories/count/category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedCategories: Category[] = response?.data?.data || [];
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCategory();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <Box padding={3}>
      <Button
        variant="contained"
        color="warning"
        style={{ marginBottom: "20px" }}
        onClick={() => setAddCategory(true)}
      >
        Add Category
      </Button>

      <Paper elevation={3}>
        <List>
          {categories.map((category) => (
            <Box key={category.categoryId}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      {category.categoryName}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        <b>ID:</b> {category.categoryId}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <b>Description:</b> {category.categoryDescription || "-"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <b>Post Count:</b> {category.count}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <b>Created At:</b> {new Date(category.createdAt).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
                <IconButton onClick={() => handleDelete(category.categoryId)} color="error">
                  <Delete />
                </IconButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Paper>

      <AddCategory addCategory={addCategory} setAddCategory={setAddCategory} />
    </Box>
  );
};

export default Category;