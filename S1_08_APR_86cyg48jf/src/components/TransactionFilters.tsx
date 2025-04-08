import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/transactionsSlice';
import { RootState } from '../store';

export function TransactionFilters() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.transactions.filter);

  return (
    <div className="flex items-center space-x-4 mb-6">
      <button
        onClick={() => dispatch(setFilter('all'))}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentFilter === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      <button
        onClick={() => dispatch(setFilter('income'))}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentFilter === 'income'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Income
      </button>
      <button
        onClick={() => dispatch(setFilter('expense'))}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentFilter === 'expense'
            ? 'bg-red-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Expenses
      </button>
    </div>
  );
}