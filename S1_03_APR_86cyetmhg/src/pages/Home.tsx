import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RecipeList from '../components/RecipeList';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  return (
    <div className="container">
      <header className="home-header">
        <h1>Recipe Book</h1>
        <Link to="/add" className="add-btn">Add Recipe</Link>
      </header>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Home;