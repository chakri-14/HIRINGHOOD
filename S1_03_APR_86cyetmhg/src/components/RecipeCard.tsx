import { Recipe } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => (
  <div className="recipe-card">
    <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
    <div className="recipe-content">
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <Link to={`/recipe/${recipe.id}`} className="recipe-link">
        View Details
      </Link>
    </div>
  </div>
);

export default RecipeCard;