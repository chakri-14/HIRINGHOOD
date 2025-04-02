import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact, ContactState } from "../types/contact";

const loadInitialState = (): ContactState => {
  const savedContacts = localStorage.getItem('contacts');
  return savedContacts ? { contacts: JSON.parse(savedContacts) } : { contacts: [] };
};

const contactSlice = createSlice({
  name: "contacts",
  initialState: loadInitialState(),
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, "id">>) => {
      const newId = state.contacts.length ? state.contacts[state.contacts.length - 1].id + 1 : 1;
      state.contacts.push({ id: newId, ...action.payload });
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const contact = state.contacts.find((c) => c.id === action.payload);
      if (contact) contact.isFavorite = !contact.isFavorite;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => [
        'contacts/addContact',
        'contacts/updateContact',
        'contacts/deleteContact',
        'contacts/toggleFavorite'
      ].includes(action.type),
      (state) => {
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      }
    );
  }
});

export const { addContact, updateContact, deleteContact, toggleFavorite } = contactSlice.actions;
export default contactSlice.reducer;