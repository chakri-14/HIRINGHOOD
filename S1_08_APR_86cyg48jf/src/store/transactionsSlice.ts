import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types';

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'income' | 'expense';
}

const loadStateFromLocalStorage = (): Transaction[] => {
  const saved = localStorage.getItem('transactions');
  return saved ? JSON.parse(saved) : [];
};

const initialState: TransactionsState = {
  items: loadStateFromLocalStorage(),
  loading: false,
  error: null,
  filter: 'all',
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.push(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.items));
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<'all' | 'income' | 'expense'>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTransaction, deleteTransaction, setLoading, setError, setFilter } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;