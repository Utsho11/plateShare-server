export const RecipeSearchableFields = [
  'name',
  'category',
  'ingredients',
  'cookingTime',
  'recipeType',
  'recipeStatus',
  'category',
];

export const noImage =
  'https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg';

export const RECIPE_TYPE = {
  VEG: 'VEG',
  NON_VEG: 'NON_VEG',
  VEGAN: 'VEGAN',
};

export const RECIPE_CATEGORY = {
  BREAKFAST: 'BREAKFAST',
  LUNCH: 'LUNCH',
  DINNER: 'DINNER',
  SNACKS: 'SNACKS',
  DESSERT: 'DESSERT',
};

export const RECIPE_STATUS = {
  REGULAR: 'REGULAR',
  PREMIUM: 'PREMIUM',
} as const;
