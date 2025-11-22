import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TRecipe } from './recipe.interface';
import { Recipe } from './recipe.model';
import { RecipeSearchableFields } from './recipe.constant';
import { TImageFiles } from '../../interfaces/image.interface';
import type { TUser } from '../User/user.interface';

// Create a new recipe in the database
const createRecipeIntoDB = async (payload: TRecipe, images: TImageFiles) => {
  const { files } = images;

  if (files && files.length > 0) {
    payload.images = files.map((image) => image.path);
  }

  const result = await Recipe.create(payload);

  return result;
};

// Get all recipes from the database with query options (filter, sort, paginate, etc.)
const getAllRecipesFromDB = async (query: Record<string, unknown>) => {
  const items = new QueryBuilder(
    Recipe.find({ isDeleted: false })
      .populate('author', '_id name email profilePhoto')
      .populate('upvoteCount')
      .populate('downvoteCount'),
    query
  )
    .filter()
    .search(RecipeSearchableFields)
    .sort()
    .paginate()
    .fields();

  const result = await items.modelQuery;
  return result;
};



const getSingleRecipeFromDB = async (itemId: string) => {
  const result = await Recipe.findById(itemId)
    .populate('author', '_id name email profilePhoto')
    .where({ isDeleted: false });
  return result;
};

// Update an existing recipe by ID

const updateRecipeIntoDB = async (
  id: string,
  updateData: Partial<TRecipe>,
  userEmail: string
) => {
  const recipe = await Recipe.findOne({ _id: id, isDeleted: false })
    .populate<{ author: Pick<TUser, 'email'> }>('author', 'email')
    .lean(); // makes it a plain JS object, faster read

  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found!');
  }

  const authorEmail =
    typeof recipe.author === 'object' && 'email' in recipe.author
      ? recipe.author.email
      : null;

  if (userEmail && authorEmail !== userEmail) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this recipe!'
    );
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updatedRecipe;
};

const changeRecipeStatusIntoDB = async (
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
  changeRecipeStatusIntoDB,
};
