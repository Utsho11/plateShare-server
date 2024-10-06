import { model, Schema } from 'mongoose';
import { TRecipe } from './recipe.interface';

const recipeSchema = new Schema<TRecipe>(
  {
    images: {
      type: [String],
      default: [],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    cookingTime: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    premium: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: [String],
      default: [],
    },
    downvotes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const Recipe = model<TRecipe>('Recipe', recipeSchema);
