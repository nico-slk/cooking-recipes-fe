import { useEffect } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import RecipeCard from './RecipeCard';

const RecipeListCards = () => {
  const { recipes, getRecipes } = useRecipe();

  useEffect(() => {
    getRecipes();
    // console.log(recipes);

  }, []);


  return (
    <div>
      RecipeListCards
      {recipes && recipes.map(recipe =>
        <div key={recipe.id}>
          <RecipeCard id={recipe.id!} />
        </div>
      )}
    </div>
  );
};

export default RecipeListCards;
