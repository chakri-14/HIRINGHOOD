import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';

const AddEditRecipePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const recipe = useSelector((state: RootState) =>
    id ? state.recipes.recipes.find((r) => r.id === id) : undefined
  );

  return (
    <div>
      <h1>{recipe ? 'Edit Recipe' : 'Add Recipe'}</h1>
      <RecipeForm initialRecipe={recipe} />
    </div>
  );
};

export default AddEditRecipePage;