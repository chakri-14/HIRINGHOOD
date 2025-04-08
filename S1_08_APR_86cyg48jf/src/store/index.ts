import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;