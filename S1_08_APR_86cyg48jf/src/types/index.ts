export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

export interface ThemeMode {
  mode: 'light' | 'dark';
}