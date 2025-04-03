import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addRecipe, updateRecipe } from '../redux/recipeSlice';
import { Recipe } from '../types';

export const useRecipeForm = (initialRecipe?: Recipe) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: Recipe) => {
    const recipe = { ...values, id: initialRecipe?.id || Date.now().toString() };
    if (initialRecipe) {
      dispatch(updateRecipe(recipe));
    } else {
      dispatch(addRecipe(recipe));
    }
    navigate('/');
  };

  return { handleSubmit };
};