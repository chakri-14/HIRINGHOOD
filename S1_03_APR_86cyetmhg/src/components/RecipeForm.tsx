import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Recipe } from '../types';
import { useRecipeForm } from '../hooks/useRecipeForm';

interface Props {
  initialRecipe?: Recipe;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  imageUrl: Yup.string().url('Invalid URL').required('Required'),
  description: Yup.string().required('Required'),
  ingredients: Yup.string().required('Required'),
  instructions: Yup.string().required('Required'),
});

const RecipeForm: React.FC<Props> = ({ initialRecipe }) => {
  const { handleSubmit } = useRecipeForm(initialRecipe);

  const initialValues = {
    id: initialRecipe?.id || '',
    title: initialRecipe?.title || '',
    imageUrl: initialRecipe?.imageUrl || '',
    description: initialRecipe?.description || '',
    ingredients: initialRecipe?.ingredients.join(', ') || '',
    instructions: initialRecipe?.instructions || '',
  };

  return (
    <div className="recipe-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const recipe: Recipe = {
            ...values,
            ingredients: values.ingredients.split(',').map((i) => i.trim()),
          };
          handleSubmit(recipe);
        }}
      >
        <Form className="recipe-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" className="form-input" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <Field name="imageUrl" type="text" className="form-input" />
            <ErrorMessage name="imageUrl" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field name="description" type="text" className="form-input" />
            <ErrorMessage name="description" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <Field name="ingredients" type="text" className="form-input" />
            <ErrorMessage name="ingredients" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="instructions">Instructions</label>
            <Field name="instructions" as="textarea" className="form-textarea" />
            <ErrorMessage name="instructions" component="div" className="error" />
          </div>
          <button type="submit" className="submit-btn">Save</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RecipeForm;