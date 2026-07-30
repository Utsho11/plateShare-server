import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookmarkServices } from './bookmark.service';

const toggleBookmark = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { recipeId } = req.params;

  const result = await BookmarkServices.toggleBookmarkIntoDB(userId, recipeId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: result,
  });
});

const getMyBookmarks = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  const result = await BookmarkServices.getMyBookmarksFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookmarked recipes retrieved successfully',
    data: result,
  });
});

const getUserBookmarkIds = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  const result = await BookmarkServices.getUserBookmarkIdsFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookmark IDs retrieved successfully',
    data: result,
  });
});

export const BookmarkControllers = {
  toggleBookmark,
  getMyBookmarks,
  getUserBookmarkIds,
};
