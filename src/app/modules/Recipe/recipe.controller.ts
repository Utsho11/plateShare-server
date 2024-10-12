import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RecipeServices } from './recipe.service';
import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interfaces/image.interface';

const createRecipe = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(400, 'Please upload an image');
  }

  const recipe = await RecipeServices.createRecipeIntoDB(
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe Item Created Successfully',
    data: recipe,
  });
});

const getAllRecipe = catchAsync(async (req, res) => {
  const item = await RecipeServices.getAllRecipesFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Recipe retrieved successfully',
    data: item,
  });
});

const getSingleRecipe = catchAsync(async (req, res) => {
  const itemId = req.params.id;
  const item = await RecipeServices.getSingleRecipeFromDB(itemId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe retrieved successfully',
    data: item,
  });
});

const updateRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedItem = await RecipeServices.updateRecipeIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe updated successfully',
    data: updatedItem,
  });
});

const deleteRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  await RecipeServices.deleteRecipeFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe deleted successfully',
    data: null,
  });
});

const voteOnRecipe = catchAsync(async (req, res) => {
  const { recipeId, voteType } = req.body;

  const email = req.user?.email;

  if (!email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  await RecipeServices.voteOnRecipe(
    recipeId,
    email,
    voteType as 'upvotes' | 'downvotes'
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe vote updated successfully',
    data: null,
  });
});

const updateRecipeStatus = catchAsync(async (req, res) => {
  const { recipeId, recipeStatus } = req.body;
  const updatedItem = await RecipeServices.updateRecipeStatusIntoDB(
    recipeId,
    recipeStatus
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe updated successfully',
    data: updatedItem,
  });
});

export const RecipeControllers = {
  createRecipe,
  getAllRecipe,
  deleteRecipe,
  updateRecipe,
  getSingleRecipe,
  voteOnRecipe,
  updateRecipeStatus,
};
