import React from 'react';
import { useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactions } from '../../hooks/useTransactions';
import { deleteTransaction } from '../../store/transactionsSlice';
import { TransactionChart } from '../../components/TransactionChart';
import { TransactionFilters } from '../../components/TransactionFilters';

export function Home() {
  const dispatch = useDispatch();
  const { transactions, getTotalBalance, getTotalIncome, getTotalExpense, formatAmount } = useTransactions();

  const handleDelete = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  const exportToCSV = () => {
    const headers = 'ID,Title,Amount,Type,Date\n';
    const csv = headers + transactions.map(t =>
      `${t.id},${t.title},${t.amount},${t.type},${t.date}`
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Balance</h2>
          <p className={`text-2xl font-bold ${getTotalBalance() >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {formatAmount(getTotalBalance())}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Income</h2>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatAmount(getTotalIncome())}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatAmount(getTotalExpense())}</p>
          <button
            onClick={exportToCSV}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Export to CSV
          </button>
        </div>
      </div>
      <TransactionChart />
      <TransactionFilters />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Transactions</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No transactions found</p>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{transaction.title}</h3>
                      <div className="flex items-center space-x-4">
                        <p className={`text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {transaction.type === 'income' ? '+' : '-'} {formatAmount(transaction.amount)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="ml-4 p-2 text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      aria-label="Delete transaction"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}