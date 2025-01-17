import { useEffect, useState } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import { Recipe } from '../../interfaces/recipe.interface';
import RecipeCard from './RecipeCard';
import style from './recipe.module.scss';

const RecipeListCards = () => {
  const [recipesState, setRecipesState] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { recipes, getRecipes } = useRecipe();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      await getRecipes();
      setRecipesState(recipes);
      setLoading(false);
    };

    fetchRecipe();

  }, []);

  useEffect(() => {
    setRecipesState(recipes);
  }, [recipes]);

  if (loading) {
    console.log(loading);

    return (
      <div className={`${style.loading_container}`}>
        <p>Cargando receta...</p>
      </div>
    );
  }

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
