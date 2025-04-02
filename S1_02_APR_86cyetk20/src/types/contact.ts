export interface Contact {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    isFavorite: boolean;
  }
  
  export interface ContactState {
    contacts: Contact[];
  }