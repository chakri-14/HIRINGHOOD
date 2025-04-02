export interface ThemeStyles {
  background: string;
  text: string;
  noteBackground: string;
  noteBackgroundCompleted: string;
  searchBackground: string;
  dropdownBackground: string;
  actionIconColor: string;
  placeholderColor: string;
}

export const themes: Record<'light' | 'dark', ThemeStyles> = {
  light: {
    background: '#f5f5f5',
    text: '#333',
    noteBackground: '#fff',
    noteBackgroundCompleted: '#e0e0e0',
    searchBackground: '#ddd',
    dropdownBackground: '#ccc',
    actionIconColor: '#666',
    placeholderColor: '#999',
  },
  dark: {
    background: '#222',
    text: '#fff',
    noteBackground: '#333',
    noteBackgroundCompleted: '#444',
    searchBackground: '#333',
    dropdownBackground: '#444',
    actionIconColor: '#888',
    placeholderColor: '#888',
  },
};