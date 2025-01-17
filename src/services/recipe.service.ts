import { Recipe } from "../interfaces/recipe.interface";

const recipeURL = "http://localhost:3000/api/recipe";

export const RecipeService = {
  getRecipes: async () => {
    try {
      const fetchRecipes = await fetch(`${recipeURL}/`, {
        method: "GET",
      });

      if (!fetchRecipes.ok) {
        const { message } = await fetchRecipes.json();
        throw new Error(`Error al obtener las recetas: ${message}`);
      }

      const response = await fetchRecipes.json();

      return response;
    } catch (error: unknown) {
      console.error("Error al obtener las recetas:", error);
      return [];
    }
  },

  getRecipeById: async (recipeId: string) => {
    try {
      const fetchRecipe = await fetch(`${recipeURL}/${recipeId}`);
      const response = await fetchRecipe.json();

      return response;
    } catch (error) {
      console.error("Error al obtener las recetas:", error);
    }
  },

  createRecipe: async (recipe: Recipe) => {
    try {
      const fetchNewRecipe = await fetch(recipeURL, {
        method: "POST",
        body: JSON.stringify(recipe),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("token") || ""),
        },
      });

      if (!fetchNewRecipe.ok) {
        const { message } = await fetchNewRecipe.json();
        throw new Error(`Error al crear la receta: ${message}`);
      }

      const response = await fetchNewRecipe.json();

      return response;
    } catch (error) {
      console.error("Error al crear la receta:", error);
      return null;
    }
  },

  getAllRecipeByUserId: async () => {
    try {
      const fetchRecipe = await fetch(`${recipeURL}/user/recipe`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("token") || ""),
        },
      });
      const response = await fetchRecipe.json();

      return response;
    } catch (error) {
      console.error("Error al obtener la receta:", error);
      return [];
    }
  },

  getRecipeByCategories: async (categories: { categories: string[] }) => {
    try {
      const fetchRecipes = await fetch(`${recipeURL}/user/recipe`, {
        method: "POST",
        body: JSON.stringify(categories),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("token") || ""),
        },
      });
      const response = await fetchRecipes.json();

      return response;
    } catch (error) {
      console.error("Error al obtener las recetas:", error);
      return [];
    }
  },

  updateRecipe: async (recipe: Recipe, recipeId: string) => {
    try {
      const fetchRecipe = await fetch(`${recipeURL}/${recipeId}`, {
        method: "PUT",
        body: JSON.stringify(recipe),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("token") || ""),
        },
      });
      const response = await fetchRecipe.json();

      return response;
    } catch (error) {
      console.error("Error al actualizar la receta:", error);
    }
  },

  deleteRecipe: async (recipeId: string) => {
    try {
      const fetchRecipe = await fetch(`${recipeURL}/${recipeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("token") || ""),
        },
      });

      const response = await fetchRecipe.json();

      return response;
    } catch (error) {
      console.error("Error al obtener las recetas:", error);
    }
  },
};
