import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((r) => r.id === id)
  );

  if (!recipe) return <div>Recipe not found</div>;

  return <RecipeDetails recipe={recipe} />;
};

export default RecipeDetailPage;