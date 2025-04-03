import { Recipe } from '../types';
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../redux/recipeSlice';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface Props {
  recipe: Recipe;
}

const RecipeDetails: React.FC<Props> = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteRecipe(recipe.id));
    navigate('/');
  };

  return (
    <div className="recipe-details">
      <img src={recipe.imageUrl} alt={recipe.title} className="details-image" />
      <h2>{recipe.title}</h2>
      <p className="description">{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p className="instructions">{recipe.instructions}</p>
      <div className="button-group">
        <button onClick={handleDelete} className="delete-btn">
          <FaTrash /> Delete
        </button>
        <Link to={`/edit/${recipe.id}`} className="edit-btn">
          <FaEdit /> Edit
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetails;