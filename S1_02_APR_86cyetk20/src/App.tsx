import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import ViewContact from "./components/ViewContact";
import EditContact from "./components/EditContact";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => (
  <BrowserRouter>
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" marginTop={2}>
        Contacts
      </Typography>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/view/:id" element={<ViewContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;