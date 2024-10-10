import { z } from 'zod';

const createRecipeValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Recipe name is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    cookingTime: z.string({
      required_error: 'Cooking time is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    ingredients: z.array(
      z.string({
        required_error: 'Ingredients are required',
      })
    ),
    email: z.string().email({
      message: 'Invalid email address',
    }),
  }),
});

const updateRecipeValidationSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    name: z.string().optional(),
    category: z.string().optional(),
    cookingTime: z.string().optional(),
    description: z.string().optional(),
    ingredients: z.string().optional(),
    email: z
      .string()
      .email({
        message: 'Invalid email address',
      })
      .optional(),
  }),
});

export const RecipeValidation = {
  createRecipeValidationSchema,
  updateRecipeValidationSchema,
};
