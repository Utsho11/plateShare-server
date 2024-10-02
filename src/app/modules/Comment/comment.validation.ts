import { z } from 'zod';

const createCommentValidationSchema = z.object({
  body: z.object({
    recipeId: z.string({
      required_error: 'Recipe ID is required',
    }),
    userId: z.string({
      required_error: 'User ID is required',
    }),
    comment: z
      .string({
        required_error: 'Comment is required',
      })
      .min(1, 'Comment cannot be empty'),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
    comment: z.string().min(1, 'Comment cannot be empty').optional(), // The comment field is optional in updates
  }),
});

export const CommentValidation = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
};
