import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { deleteContact, toggleFavorite } from "../redux/contactSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete, ArrowBack, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ViewContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((c) => c.id === Number(id))
  );

  if (!contact) return <Typography variant="h6">Contact not found.</Typography>;

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {contact.name}
        </Typography>
        <Typography variant="body1">📞 {contact.phone}</Typography>
        <Typography variant="body1">📧 {contact.email || "Not provided"}</Typography>
        <Typography variant="body1">🏠 {contact.address || "Not provided"}</Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <IconButton onClick={() => dispatch(toggleFavorite(contact.id))}>
            {contact.isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>

          <Link to={`/edit/${contact.id}`}>
            <Button variant="contained" startIcon={<Edit />}>
              Edit
            </Button>
          </Link>

          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={() => {
              dispatch(deleteContact(contact.id));
              navigate("/");
            }}
          >
            Delete
          </Button>
        </Box>

        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Contacts
        </Button>
      </CardContent>
    </Card>
  );
};

export default ViewContact;

