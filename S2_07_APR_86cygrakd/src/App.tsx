import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';
import TaskEdit from './pages/TaskEdit';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider>
          <BrowserRouter>
            <div className="task-manager">
              <ThemeToggle />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/task/:id" element={<TaskDetails />} />
                <Route path="/task/:id/edit" element={<TaskEdit />} />
                <Route path="/task/new" element={<TaskEdit />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;