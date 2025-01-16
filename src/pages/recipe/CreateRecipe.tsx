// import { useRecipe } from '../../context/RecipeContext';

import { useState } from 'react';
import { Ingredients } from '../../interfaces/ingredients.interface';
import style from './recipe.module.scss';

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState({
    name: '',
    quantity: 0,
    unit: 'L',
  });
  // const { createRecipe } = useRecipe();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // createRecipe({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(e.target.value);
  };

  const handleAddIngredient = () => {
    if (currentIngredient.name && currentIngredient.quantity && currentIngredient.unit) {
      setIngredients((prev) => [...prev, currentIngredient]);
      setCurrentIngredient({ name: '', quantity: 0, unit: 'L' }); // Reinicia los campos
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${style.auth_form}`}>

      {/* Tengo que agregar la imagen y la lógica */}
      <div>
        <input type="file" name="" id="" />
      </div>

      {/* Tengo que manejar la lógica de agregarle el nombre y tipo a la receta */}
      <div className={`${style.auth_input_container}`} >
        <label className={`${style.auth_label}`} htmlFor='titulo'>Titulo</label>
        <input id="titulo" type="text" className={`${style.auth_input}`} placeholder="Nombre" value={currentIngredient.name} onChange={handleChange} />
      </div>
      <div className={`${style.auth_input_container}`}>
        <select>
          <option value="DESAYUNO">Desayuno</option>
          <option value="ALMUERZO">Almuerzo</option>
          <option value="MERIENDA">Merienda</option>
          <option value="CENA">Cena</option>
        </select>
      </div>

      {/* Tengo que agregar la lógica para editar una receta */}
      {
        ingredients.map(ingredient => <p key={ingredient.name + ingredient.quantity}>{ingredient.name} - {ingredient.quantity} {ingredient.unit}</p>)
      }

      {/* Tengo que terminar esto */}
      <div className={`${style.auth_input_container}`}>
        <label className={`${style.auth_label}`} htmlFor="receta">Ingrediente</label>
        <input type="text" name="name" className={`${style.auth_input} receta`} value={currentIngredient.name} onChange={handleChange} />

        <label className={`${style.auth_label}`} htmlFor="cantidad">Cantidad</label>
        <input type="number" name="quantity" className={`${style.auth_input} cantidad`} value={currentIngredient.quantity} onChange={handleChange} />

        <label className={`${style.auth_label}`} htmlFor='unit'>Unidad</label>
        <select id='unit' name='unit' onChange={handleSelect}>
          <option value="L">Litro (L)</option>
          <option value="mL">mililitro (mL)</option>
          <option value="g">Gramo (g)</option>
          <option value="mg">Miligramo (mg)</option>
          <option value="Kg">Kilogramo (kg)</option>
          <option value="u">Unidades (u)</option>
        </select>

        <button type="button" onClick={handleAddIngredient}>Agregar</button>
      </div>


    </form>
  );
};

export default CreateRecipe;
