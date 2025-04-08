import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Transaction } from '../types';

export const useTransactions = () => {
  const transactions = useSelector((state: RootState) => state.transactions.items);
  const filter = useSelector((state: RootState) => state.transactions.filter);

  const sortTransactions = (items: Transaction[], sortBy: 'date' | 'type' = 'date'): Transaction[] => {
    return [...items].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.type.localeCompare(b.type);
    });
  };

  const filteredTransactions = sortTransactions(
    transactions.filter(transaction => filter === 'all' || transaction.type === filter)
  );

  const getTotalBalance = (): number => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
  };

  const getTotalIncome = (): number => {
    return transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  };

  const getTotalExpense = (): number => {
    return transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense,
    formatAmount,
    sortTransactions,
  };
};