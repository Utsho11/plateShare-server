import { model, Schema } from 'mongoose';
import { TRecipe, TIngredient, TInstruction } from './recipe.interface';
import { RECIPE_CATEGORY, RECIPE_STATUS, RECIPE_TYPE } from './recipe.constant';

const ingredientSchema = new Schema<TIngredient>(
  {
    name: { type: String, required: true },
    quantity: { type: String, required: true },
  },
  { _id: false }
);

const instructionSchema = new Schema<TInstruction>(
  {
    step: { type: String, required: true },
  },
  { _id: false }
);

const recipeSchema = new Schema<TRecipe>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    cookingTime: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: Object.values(RECIPE_CATEGORY),
      required: true,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true,
    },
    recipeStatus: {
      type: String,
      enum: Object.values(RECIPE_STATUS),
      required: true,
    },
    recipeType: {
      type: String,
      enum: Object.values(RECIPE_TYPE),
      required: true,
    },
    instructions: {
      type: [instructionSchema],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'User',
    },
    images: {
      type: [String],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
     timestamps: true,
    toJSON: { virtuals: true, versionKey: false, getters: true },
    toObject: { virtuals: true, getters: true },
    id: false
  }
);

recipeSchema.virtual("upvoteCount", {
  ref: "UpVote",
  localField: "_id",
  foreignField: "post",
  count: true,
});

recipeSchema.virtual("downvoteCount", {
  ref: "DownVote",
  localField: "_id",
  foreignField: "post",
  count: true,
});


export const Recipe = model<TRecipe>('Recipe', recipeSchema);
