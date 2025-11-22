import type { Schema } from 'mongoose';
import type {
  RECIPE_CATEGORY,
  RECIPE_STATUS,
  RECIPE_TYPE,
} from './recipe.constant';

export type TIngredient = {
  name: string;
  quantity: string;
};

export type TInstruction= {
  step: string;
}

export type TRecipe = {
  _id: string;
  title: string;
  description: string;
  category: keyof typeof RECIPE_CATEGORY;
  ingredients: TIngredient[];
  recipeStatus: keyof typeof RECIPE_STATUS;
  recipeType: keyof typeof RECIPE_TYPE;
  cookingTime: string;
  instructions: TInstruction[];
  author: Schema.Types.ObjectId;
  images?: string[];
  isDeleted?: boolean;
};

export const VOTE_TYPE = {
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
};

/*
  "title": "Spicy Chicken Curry",
  "description":
    "A flavorful Bangladeshi-style chicken curry cooked with aromatic spices, onions, and tomatoes. Perfect with rice or naan.",
  "ingredients": [
    { "name": "Chicken", "quantity": "1 kg" },
    { "name": "Onion", "quantity": "3 medium (sliced)" },
    { "name": "Garlic paste", "quantity": "2 tbsp" },
    { "name": "Ginger paste", "quantity": "1 tbsp" },
    { "name": "Cumin powder", "quantity": "1 tsp" },
    { "name": "Coriander powder", "quantity": "1 tsp" },
    { "name": "Chili powder", "quantity": "1 tsp" },
    { "name": "Turmeric powder", "quantity": "½ tsp" },
    { "name": "Salt", "quantity": "to taste" },
    { "name": "Oil", "quantity": "3 tbsp" },
    { "name": "Water", "quantity": "2 cups" },
  ],
  "cookingTime": "45 minutes",
  "category": "LUNCH",
  "recipeStatus": "REGULAR",
  "recipeType": "NON_VEG",
  "instructions": [
    "Heat oil in a pan and fry onions until golden brown.",
    "Add garlic and ginger paste, then stir for 1–2 minutes.",
    "Add all the spices and cook until aromatic.",
    "Add chicken pieces and cook until lightly browned.",
    "Pour in water, cover, and simmer for 30–35 minutes.",
    "Garnish with fresh coriander leaves and serve hot.",
  ],
  "author": "68ffc3b1acb5a8ac6e2e37f1",
 
*/
