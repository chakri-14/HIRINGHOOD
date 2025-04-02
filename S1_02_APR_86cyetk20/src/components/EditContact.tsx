import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "../redux/contactSlice";
import { RootState } from "../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((c) => c.id === Number(id))
  );

  const [name, setName] = useState(contact?.name || "");
  const [phone, setPhone] = useState(contact?.phone || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [address, setAddress] = useState(contact?.address || "");
  const [error, setError] = useState("");

  if (!contact) return <Typography variant="h6">Contact not found.</Typography>;

  const handleUpdate = () => {
    if (!name.trim() || !phone.trim()) {
      setError("Name and Phone are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    dispatch(updateContact({ id: contact.id, name, phone, email, address, isFavorite: contact.isFavorite }));
    navigate("/");
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Edit Contact
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
          Update Contact
        </Button>
      </CardContent>
    </Card>
  );
};

export default EditContact;

