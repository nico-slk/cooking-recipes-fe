import { useRecipe } from '../../context/RecipeContext';

import { ChangeEvent, FormEvent, useState } from 'react';
import { FaImage } from "react-icons/fa";
import CustomButton from '../../components/common/CustomButton';
import Ingredient from '../../components/common/Ingredient';
import { Ingredient as IngredientIterface } from '../../interfaces/ingredients.interface';
import style from './create_recipe.module.scss';

const CreateRecipe = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DESAYUNO');
  const [description, setDescription] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [ingredients, setIngredients] = useState<IngredientIterface[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState({
    name: '',
    quantity: null,
    unit: 'L',
  });
  const maxChars = 200;
  const { createRecipe } = useRecipe();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipe = {
      title,
      category,
      description,
      image: base64Image,
      ingredients
    };

    if (recipe.title === "") {
      console.log('El titulo no puede estar vacio');

      return;
    }
    if (recipe.category === "") {
      console.log('El titulo no puede estar vacio');
      return;
    }
    if (recipe.description === "") {
      console.log('Escibe una descripción');
      return;
    }
    if (recipe.image === "") {
      console.log('Debes elegir una imagen de perfil');
      return;
    }
    if (recipe.ingredients.length === 0) {
      console.log('Agrega al menos un ingrediente');
      return;
    }

    setTitle('');
    setCategory('');
    setIngredients([]);
    setCurrentIngredient({ name: '', quantity: null, unit: 'L' });
    setBase64Image('');
    setDescription('');

    createRecipe(recipe);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecipeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleRecipeSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);;
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setDescription(e.target.value);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentIngredient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    if (currentIngredient.name && currentIngredient.quantity && currentIngredient.unit) {
      setIngredients((prev) => [...prev, currentIngredient]);
      setCurrentIngredient({ name: '', quantity: null, unit: 'L' });
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { files } = e.target;

    if (files === null) {
      return null;
    }

    const file = files[0];

    if (file && file.type.startsWith("image/") && file.size < 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor selecciona una imagen válida (máximo 5MB).");
      e.target.value = "";
    }
  };

  const handleDeletePhoto = () => {
    setBase64Image("");
  };

  const handleRemoveIngredient = (ingredientName: string) => {
    const filteredIngredients = ingredients.filter(Ingredient => Ingredient.name !== ingredientName);
    setIngredients(filteredIngredients);
  };

  return (
    <form onSubmit={handleSubmit} className={`${style.recipe_form}`}>

      <div className={`${style.recipe_photo_title}`}>
        {/* Tengo que manejar la lógica de agregarle el nombre y tipo a la receta */}
        <div>
          <div className={`${style.recipe_title_container}`} >
            <label className={`${style.recipe_label}`} htmlFor='titulo'>Titulo</label>
            <input id="titulo" type="text" className={`${style.recipe_title_input}`} placeholder="Nombre de la receta" value={title} onChange={handleRecipeChange} />
          </div>
          <div className={`${style.recipe_category_container}`}>
            <select id='category' name='category' onChange={handleRecipeSelectCategory} className={`${style.recipe_category_selector}`} >
              <option value="DESAYUNO">Desayuno</option>
              <option value="ALMUERZO">Almuerzo</option>
              <option value="MERIENDA">Merienda</option>
              <option value="CENA">Cena</option>
            </select>
          </div>
        </div>

        {/* Tengo que agregar la imagen y la lógica */}
        <div className={`${style.recipe_photo_container}`} >
          <div className={`${style.file_input_container}`}>

            {base64Image ? (
              <div className={`${style.image_preview}`}>
                <img src={base64Image} alt="Preview" onClick={handleDeletePhoto} />
              </div>
            ) : (
              <div className={`${style.image_preview_empty}`} >

                <label htmlFor="file-upload" className={`${style.file_label}`}>
                  <FaImage />
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`${style.file_input}`}
                  />
                </label>
              </div>
            )}

          </div>
        </div>
      </div>


      {/* Tengo que terminar esto */}
      <div className={`${style.recipe_input_container}`}>

        <div className={`${style.recipe_name_quantity}`}>

          <div className={`${style.recipe_label_input}`} >
            <label className={`${style.recipe_label}`} htmlFor="receta">Ingrediente</label>
            <input type="text" name="name" className={`${style.recipe_input} receta`} value={currentIngredient.name} onChange={handleChange} placeholder='Nombre del ingrediente' />
          </div>

          <div className={`${style.recipe_label_input}`} >
            <label className={`${style.recipe_label}`} htmlFor="cantidad">Cantidad</label>
            <input type="number" name="quantity" className={`${style.recipe_input} cantidad`} value={currentIngredient.quantity || ''} onChange={handleChange} placeholder='Cantidad del ingrediente' />
          </div>
        </div>


        <div className={`${style.recipe_unit_button}`}>

          <div className={`${style.recipe_label_input}`} >
            <label className={`${style.recipe_label}`} htmlFor='unit'>Unidad</label>
            <select id='unit' name='unit' onChange={handleSelect} className={`${style.recipe_unit_select}`}>
              <option value="L">Litro (L)</option>
              <option value="mL">mililitro (mL)</option>
              <option value="g">Gramo (g)</option>
              <option value="mg">Miligramo (mg)</option>
              <option value="Kg">Kilogramo (kg)</option>
              <option value="u">Unidades (u)</option>
            </select>
          </div>

          <div className={`${style.recipe_add_ingredient}`} >
            <CustomButton style={`${style.recipe_add_ingredient_button}`} text='Agregar' fn={handleAddIngredient} type='button' />
          </div>
        </div>


        <div className={`${style.recipe_ingredient_list}`} >
          {/* Tengo que agregar la lógica para editar una receta */}
          <p>Listado de ingredientes</p>
          {
            ingredients.map(ingredient => <Ingredient ingredient={ingredient} key={ingredient.name + ingredient.quantity} deleteFn={() => handleRemoveIngredient(ingredient.name)} />)
          }

        </div>


        <div className={`${style.recipe_label_textarea}`} >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              rows={5}
              maxLength={maxChars}
              placeholder={`Máximo ${maxChars} caracteres...`}
              className={`${style.recipe_description}`}
            />
            <div style={{ fontSize: "14px", color: "#666" }}>
              {description.length}/{maxChars} caracteres
            </div>
          </div>
        </div>

      </div>

      <div className={`${style.create_button_container}`}>
        <CustomButton type='submit' style={`${style.create_button}`} text='Crear receta' />

      </div>


    </form>
  );
};

export default CreateRecipe;
