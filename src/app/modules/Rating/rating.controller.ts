import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RatingServices } from './rating.service';

const addRating = catchAsync(async (req, res) => {
  const { rating, recipeId } = req.body;

  const { _id } = req.user;
  const result = await RatingServices.addRatingIntoDB(recipeId, _id, rating);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rating Added Successfully',
    data: result,
  });
});

const getRecipe = catchAsync(async (req, res) => {
  const result = await RatingServices.getRatingFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rating Retrieved Successfully',
    data: result,
  });
});

export const RatingController = {
  addRating,
  getRecipe,
};
