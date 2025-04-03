import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './pages/Home';
import RecipeDetailPage from './pages/RecipeDetailPage';
import AddEditRecipePage from './pages/AddEditRecipePage';

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/add" element={<AddEditRecipePage />} />
        <Route path="/edit/:id" element={<AddEditRecipePage />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;