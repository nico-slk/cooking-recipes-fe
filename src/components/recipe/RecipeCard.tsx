import { useEffect } from 'react';
import { useRecipe } from '../../context/RecipeContext';

const RecipeCard = ({ id }: { id: string; }) => {
  const { getRecipeById, recipe } = useRecipe();

  useEffect(() => {
    getRecipeById(id);

  }, []);


  return (
    <div>
      RecipeCard
      {recipe?.title}
    </div>
  );
};

export default RecipeCard;
