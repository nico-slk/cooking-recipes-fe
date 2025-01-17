import { Ingredient } from "./ingredients.interface";

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  category: string;
  updatedAt?: Date;
  createdAt?: Date;
  image: string;
  ingredients: Ingredient[];
}
