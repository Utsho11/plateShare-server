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
  voteType: 'upvote' | 'downvote'
) => {
  // Find the recipe
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  // Initialize downvotes and upvotes if undefined (not necessary if the default is set)
  recipe.upvotes = recipe.upvotes || 0;
  recipe.downvotes = recipe.downvotes || 0;

  // Check if the user (by email) has already voted
  const existingVote = recipe.votedUsers?.find(
    (voter) => voter.email === email
  );

  if (existingVote) {
    // If the vote is the same, remove the vote (undo action)
    if (existingVote.voteType === voteType) {
      recipe.votedUsers = recipe.votedUsers?.filter(
        (voter) => voter.email !== email
      );
      if (voteType === 'upvote') {
        recipe.upvotes--;
      } else {
        recipe.downvotes--;
      }
    } else {
      // If the vote is different, change the vote
      existingVote.voteType = voteType;
      if (voteType === 'upvote') {
        recipe.upvotes++;
        recipe.downvotes--;
      } else {
        recipe.downvotes++;
        recipe.upvotes--;
      }
    }
  } else {
    // Add new vote with email
    recipe.votedUsers?.push({ email, voteType });
    if (voteType === 'upvote') {
      recipe.upvotes++;
    } else {
      recipe.downvotes++;
    }
  }

  await recipe.save();
  return recipe;
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
};
