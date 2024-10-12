import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TRecipe } from './recipe.interface';
import { Recipe } from './recipe.model';
import { RecipeSearchableFields } from './recipe.constant';
import { TImageFiles } from '../../interfaces/image.interface';

// Create a new recipe in the database
const createRecipeIntoDB = async (payload: TRecipe, images: TImageFiles) => {
  const { recipeImages } = images;

  payload.images = recipeImages.map((image) => image.path);

  const result = await Recipe.create(payload);

  return result;
};

// Get all recipes from the database with query options (filter, sort, paginate, etc.)
const getAllRecipesFromDB = async (query: Record<string, unknown>) => {
  const items = new QueryBuilder(Recipe.find({ isDeleted: false }), query)
    .filter()
    .search(RecipeSearchableFields)
    .sort()
    .paginate()
    .fields();
  const result = await items.modelQuery;
  return result;
};

const getSingleRecipeFromDB = async (itemId: string) => {
  const result = await Recipe.findById(itemId);
  return result;
};

const voteOnRecipe = async (
  recipeId: string,
  email: string,
  voteType: 'upvotes' | 'downvotes'
) => {
  // Find the recipe by ID

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new Error('Recipe not found');
  }

  // Convert the Mongoose document into a plain object
  const updatedRecipe = recipe.toObject();

  // Initialize upvotes and downvotes if they are undefined
  updatedRecipe.upvotes = updatedRecipe.upvotes || [];
  updatedRecipe.downvotes = updatedRecipe.downvotes || [];

  if (voteType === 'upvotes') {
    // Remove from downvotes if the user is switching vote
    if (updatedRecipe.downvotes.includes(email)) {
      updatedRecipe.downvotes = updatedRecipe.downvotes.filter(
        (voter: string) => voter !== email
      );
    }

    // Toggle upvote: add if not present, remove if already present
    if (updatedRecipe.upvotes.includes(email)) {
      updatedRecipe.upvotes = updatedRecipe.upvotes.filter(
        (voter: string) => voter !== email
      );
    } else {
      updatedRecipe.upvotes.push(email);
    }
  }

  if (voteType === 'downvotes') {
    // Remove from upvotes if the user is switching vote
    if (updatedRecipe.upvotes.includes(email)) {
      updatedRecipe.upvotes = updatedRecipe.upvotes.filter(
        (voter: string) => voter !== email
      );
    }

    // Toggle downvote: add if not present, remove if already present
    if (updatedRecipe.downvotes.includes(email)) {
      updatedRecipe.downvotes = updatedRecipe.downvotes.filter(
        (voter: string) => voter !== email
      );
    } else {
      updatedRecipe.downvotes.push(email);
    }
  }

  // Save the updated recipe
  try {
    await Recipe.findByIdAndUpdate(
      recipeId,
      { upvotes: updatedRecipe.upvotes, downvotes: updatedRecipe.downvotes },
      { new: true }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error saving recipe:', error);
    throw new Error('Error saving recipe');
  }
};

// Update an existing recipe by ID
const updateRecipeIntoDB = async (id: string, updateData: Partial<TRecipe>) => {
  const isRecipeExists = await Recipe.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isRecipeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found!');
  }

  const recipe = await Recipe.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return recipe;
};

const updateRecipeStatusIntoDB = async (
  recipeId: string,
  recipeStatus: string
) => {
  const isRecipeExists = await Recipe.findOne({
    _id: recipeId,
    isDeleted: false,
  });

  if (!isRecipeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found!');
  }

  const recipe = await Recipe.findByIdAndUpdate(
    recipeId,
    { recipeStatus },
    {
      new: true,
    }
  );
  return recipe;
};

// Soft delete a recipe by marking it as deleted
const deleteRecipeFromDB = async (id: string) => {
  const isRecipeExists = await Recipe.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isRecipeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found!');
  }

  const recipe = await Recipe.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return recipe;
};

export const RecipeServices = {
  createRecipeIntoDB,
  getAllRecipesFromDB,
  getSingleRecipeFromDB,
  updateRecipeIntoDB,
  deleteRecipeFromDB,
  voteOnRecipe,
  updateRecipeStatusIntoDB,
};
