import { useEffect, useState } from 'react';
import RecipeListCards from '../../components/recipe/RecipeListCards';
import { useAuth } from '../../context/AuthContext';
import { useRecipe } from '../../context/RecipeContext';
import style from './profile.module.scss';

const MyProfile = () => {
  const [recipeCount, setRecipeCount] = useState(0);
  const { getAllRecipeByUserId, recipes } = useRecipe();
  const { user } = useAuth();

  useEffect(() => {
    if (recipes !== null) {
      setRecipeCount(recipes?.length);
    }

  }, []);

  useEffect(() => {
    getAllRecipeByUserId();
  }, []);

  return (
    <div className={`${style.profile_container}`}>
      <div className={`${style.profile_info}`}>
        <div className={`${style.profile_info_img}`}>
          <img src="https://i.ibb.co/WGCzCQJ/860034bb042cf9aa8d65d796b16b24d9.jpg" alt="" className={`${style.profile_photo}`} />
        </div>
        <div className={`${style.profile_info_data}`}>
          <p>Nombre: <span className={`${style.profile_info_text}`}>{user?.name}</span></p>
          <p>Apellido: <span className={`${style.profile_info_text}`}>{user?.lastname}</span></p>
          <p>Email: <span className={`${style.profile_info_text}`}>{user?.email}</span></p>
          <p>Cantidad de recetas: <span className={`${style.profile_info_text}`}>{recipeCount}</span></p>
        </div>
      </div>
      <p>Mis recetas</p>
      <div className={`${style.recipe_list_cards}`}>
        <RecipeListCards recipesProps={recipes} />
      </div>
    </div>
  );
};

export default MyProfile;
