import { MdOutlineDelete } from "react-icons/md";
import { Ingredient as IngredientIngerface } from '../../interfaces/ingredients.interface';
import style from './common.module.scss';

const Ingredient = ({ ingredient, deleteFn }: { ingredient: IngredientIngerface, deleteFn: () => void; }) => {
  return (
    <div className={`${style.ingredient_item_container}`}>
      <p className={`${style.ingredient_text} ${style.ingredient_text_name}`}>{ingredient.name}</p>
      <p className={`${style.ingredient_text}`}>
        {ingredient.quantity}<strong>{ingredient.unit}</strong>
        <button type="button" onClick={deleteFn} className={`${style.delete_button}`} ><MdOutlineDelete /></button>
      </p>
    </div>
  );
};

export default Ingredient;
