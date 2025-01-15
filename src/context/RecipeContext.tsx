
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Recipe } from '../interfaces/recipe.interface';
import { RecipeService } from '../services/recipe.service';

interface RecipeContextProps {
  recipes: Recipe[] | null;
  recipe: Recipe | null;
  getRecipes: () => void;
  getRecipeById: (recipeId: string) => void;
  createRecipe: (recipe: Recipe) => void;
  getAllRecipeByUserId: () => void;
  getRecipeByCategories: (categories: { categories: string[]; }) => void;
  updateRecipe: (recipe: Recipe, recipeId: string) => void;
  deleteRecipe: (recipeId: string) => void;
}

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

export const RecipeProvider: FC<{ children: ReactNode; }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const getRecipes = async () => {
    try {
      const recipes = await RecipeService.getRecipes();

      setRecipes(recipes);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  const getRecipeById = async (recipeId: string) => {
    try {
      const recipe = await RecipeService.getRecipeById(recipeId);

      setRecipe(recipe);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  // const createRecipe = RecipeService.createRecipe;
  const createRecipe = async (recipe: Recipe) => {
    try {
      const newRecipe = await RecipeService.createRecipe(recipe);
      setRecipe(newRecipe);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  // const getAllRecipeByUserId = RecipeService.getAllRecipeByUserId;
  const getAllRecipeByUserId = async () => {
    try {
      const recipe = await RecipeService.getAllRecipeByUserId();
      setRecipe(recipe);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  const getRecipeByCategories = async (categories: { categories: string[]; }) => {
    try {
      const recipes = await RecipeService.getRecipeByCategories(categories);
      setRecipes(recipes);
    } catch (recipes) {
      console.error('Error: ' + recipes);
    }
  };

  // const updateRecipe = RecipeService.updateRecipe;
  const updateRecipe = async (recipe: Recipe, recipeId: string) => {
    try {
      const updatedRecipe = await RecipeService.updateRecipe(recipe, recipeId);
      setRecipe(updatedRecipe);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  // const deleteRecipe = RecipeService.deleteRecipe;
  const deleteRecipe = async (recipeId: string) => {
    try {
      const recipe = await RecipeService.deleteRecipe(recipeId);
      setRecipe(recipe);
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      recipe,
      getRecipes,
      getRecipeById,
      createRecipe,
      getAllRecipeByUserId,
      getRecipeByCategories,
      updateRecipe,
      deleteRecipe
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRecipe = (): RecipeContextProps => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within an RecipeProvider');
  }
  return context;
};
