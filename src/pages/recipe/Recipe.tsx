import { useEffect, useState } from 'react';
import { FaDotCircle } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/common/CustomButton';
import { useRecipe } from '../../context/RecipeContext';
import style from './recipe.module.scss';

const Recipe = () => {
  const [loading, setLoading] = useState(true);

  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { getRecipeById, deleteRecipe, recipe } = useRecipe();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (recipeId) {
        setLoading(true);
        await getRecipeById(recipeId);
        setLoading(false);
      }

    };

    fetchRecipe();
  }, [recipeId]);

  const handleDelete = (recipeId: string) => {
    deleteRecipe(recipeId);
    navigate('/');
  };

  if (loading) {
    return (
      <div className={`${style.loading_container}`}>
        <p>Cargando receta...</p>
      </div>
    );
  }


  return (
    <div className={`${style.recipe_container}`}>
      <div className={`${style.ingredient_title_container}`} >
        <h4>Receta:</h4> <p>{recipe?.title}</p>
      </div>
      <div className={`${style.ingredient_description_container}`} >
        <h4>Descripcion: </h4>
        <p>{recipe?.description}</p>
      </div>
      <div>
        <ul className={`${style.ingredient_list_container}`} >
          {recipe?.ingredients.map(ingredient => (
            <li className={`${style.ingredient_item}`} key={ingredient.id} >
              <div className={`${style.ingredient_item_dot}`}><FaDotCircle /><p> {ingredient.name}</p></div>
              <p>{ingredient.quantity} {ingredient.unit}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${style.image_recipe_container}`}>
        <img src={recipe?.image} alt={`${recipe?.title} imagen`} className={`${style.image_recipe}`} />
      </div>
      <CustomButton style={`${style.delete_recipe_button}`} text='Eliminar receta' fn={() => handleDelete(recipeId as string)} type='button' />
    </div>
  );
};

export default Recipe;
