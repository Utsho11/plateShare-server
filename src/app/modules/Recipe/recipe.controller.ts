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

export const RecipeControllers = {
  createRecipe,
};
