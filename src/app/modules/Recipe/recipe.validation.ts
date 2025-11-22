import { z } from 'zod';
import { RECIPE_CATEGORY, RECIPE_STATUS, RECIPE_TYPE } from './recipe.constant';

// ✅ Ingredient schema
export const ingredientValidationSchema = z.object({
  name: z.string({ required_error: 'Ingredient name is required' }).trim(),
  quantity: z
    .string({ required_error: 'Ingredient quantity is required' })
    .trim(),
});

export const instructionValidationSchema = z.object({
  step: z.string({ required_error: 'Instruction step is required' }).trim(),
});

// ✅ Recipe schema
export const createRecipeValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Recipe title is required' }).trim(),
    description: z.string({ required_error: 'Description is required' }).trim(),
    cookingTime: z
      .string({ required_error: 'Cooking time is required' })
      .trim(),

    category: z.nativeEnum(RECIPE_CATEGORY, {
      required_error: 'Category is required',
      invalid_type_error: 'Invalid recipe category',
    }),

    recipeStatus: z.nativeEnum(RECIPE_STATUS, {
      required_error: 'Recipe status is required',
      invalid_type_error: 'Invalid recipe status',
    }),

    recipeType: z.nativeEnum(RECIPE_TYPE, {
      required_error: 'Recipe type is required',
      invalid_type_error: 'Invalid recipe type',
    }),

    ingredients: z
      .array(ingredientValidationSchema, {
        required_error: 'At least one ingredient is required',
      })
      .nonempty('Recipe must have at least one ingredient'),

    instructions: z
      .array(instructionValidationSchema, {
        required_error: 'At least one instruction is required',
      })
      .nonempty('Recipe must have at least one instruction'),


    images: z.array(z.string().url('Invalid image URL')).optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const RecipeValidation = {
  createRecipeValidationSchema,
};
