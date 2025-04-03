import { Recipe } from '../types';
import RecipeCard from './RecipeCard';

interface Props {
  recipes: Recipe[];
}

const RecipeList: React.FC<Props> = ({ recipes }) => (
  <div className="recipe-list">
    {recipes.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ))}
  </div>
);

export default RecipeList;