import { z } from 'zod';

export const createRatingValidationSchema = z.object({
  body: z.object({
    rating: z.number({
      required_error: 'Rating is required',
    }),
    recipeId: z.string({
      required_error: 'Rating is required',
    }),
  }),
});
