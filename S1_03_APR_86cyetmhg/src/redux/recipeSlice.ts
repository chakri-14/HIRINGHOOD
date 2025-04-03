import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types';

interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [
    {
      id: '1',
      title: 'Pasta',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'A simple pasta dish',
      ingredients: ['Pasta', 'Tomato Sauce', 'Cheese'],
      instructions: 'Boil pasta, mix with sauce, top with cheese.',
    },
  ],
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) state.recipes[index] = action.payload;
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addRecipe, updateRecipe, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;