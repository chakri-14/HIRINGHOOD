import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, toggleFavorite } from "../redux/contactSlice";
import { RootState } from "../redux/store";
import { Link as RouterLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Edit, Delete, Favorite, FavoriteBorder, Add } from "@mui/icons-material";

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredContacts = contacts
    .filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const displayedContacts = filteredContacts.filter((contact) =>
    showFavorites ? contact.isFavorite : true
  );

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
        <TextField
          label="Search Contacts"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            component={RouterLink}
            to="/add"
          >
            Add Contact
          </Button>
          <IconButton
            onClick={() => setShowFavorites(!showFavorites)}
            sx={{ ml: 2 }}
            aria-label="Toggle favorite filter"
          >
            {showFavorites ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </Box>
      <List>
        {displayedContacts.length > 0 ? (
          displayedContacts.map((contact) => (
            <ListItem
              key={contact.id}
              component={RouterLink}
              to={`/view/${contact.id}`}
            >
              <ListItemText primary={contact.name} secondary={contact.phone} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => dispatch(toggleFavorite(contact.id))}>
                  {contact.isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <IconButton component={RouterLink} to={`/edit/${contact.id}`}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => dispatch(deleteContact(contact.id))}>
                  <Delete color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Typography textAlign="center" sx={{ mt: 2 }}>
            {search ? "No contacts found" : "No contacts available"}
          </Typography>
        )}
      </List>
    </div>
  );
};

export default ContactList;