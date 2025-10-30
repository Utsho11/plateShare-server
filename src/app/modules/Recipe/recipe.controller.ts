import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RecipeServices } from './recipe.service';
import { TImageFiles } from '../../interfaces/image.interface';

const createRecipe = catchAsync(async (req, res) => {
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
  const u_email = req.user?.email;
  const { id } = req.params;
  const updatedItem = await RecipeServices.updateRecipeIntoDB(
    id,
    req.body,
    u_email
  );

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

const changeRecipeStatus = catchAsync(async (req, res) => {
  const { recipeStatus } = req.body;
  const { id } = req.params;
  const updatedItem = await RecipeServices.changeRecipeStatusIntoDB(
    id,
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
  changeRecipeStatus,
};
