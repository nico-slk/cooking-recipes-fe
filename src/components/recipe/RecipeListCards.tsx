import { useEffect, useState } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import { Recipe } from '../../interfaces/recipe.interface';
import RecipeCard from './RecipeCard';
import style from './recipe.module.scss';

const RecipeListCards = ({ recipesProps }: { recipesProps: Recipe[] | null; }) => {
  const [recipesState, serRecipesState] = useState<Recipe[] | null>(null);
  const { recipes, getRecipes } = useRecipe();

  useEffect(() => {
    if (recipesProps === null || recipesProps.length <= 0) {
      getRecipes();
      serRecipesState(recipes);
    } else {
      serRecipesState(recipesProps);
    }
  }, []);

  return (
    <div className={`${style.recipe_list_container}`}>
      {recipesState?.map(recipe =>
        <RecipeCard recipe={recipe} create={false} key={recipe.id!} />
      )}
      <RecipeCard recipe={null} create={true} />
    </div>
  );
};

export default RecipeListCards;
