import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Recipe } from '../Recipe/recipe.model';
import { Bookmark } from './bookmark.model';

const toggleBookmarkIntoDB = async (userId: string, recipeId: string) => {
  // Verify recipe exists
  const recipeExists = await Recipe.findOne({ _id: recipeId, isDeleted: false });
  if (!recipeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found!');
  }

  // Check if bookmark exists
  const existingBookmark = await Bookmark.findOne({
    user: userId,
    recipe: recipeId,
  });

  if (existingBookmark) {
    // Remove bookmark
    await Bookmark.findByIdAndDelete(existingBookmark._id);
    return { isBookmarked: false, message: 'Recipe removed from bookmarks' };
  } else {
    // Add bookmark
    await Bookmark.create({ user: userId, recipe: recipeId });
    return { isBookmarked: true, message: 'Recipe saved to bookmarks' };
  }
};

const getMyBookmarksFromDB = async (userId: string) => {
  const bookmarks = await Bookmark.find({ user: userId })
    .populate({
      path: 'recipe',
      match: { isDeleted: false },
      populate: [
        { path: 'author', select: '_id firstName lastName email profilePhoto' },
        { path: 'upvoteCount' },
        { path: 'downvoteCount' },
      ],
    })
    .sort('-createdAt');

  // Filter out any bookmarks where recipe might be null (deleted)
  const validRecipes = bookmarks
    .filter((b) => b.recipe !== null)
    .map((b) => b.recipe);

  return validRecipes;
};

const getUserBookmarkIdsFromDB = async (userId: string) => {
  const bookmarks = await Bookmark.find({ user: userId }).select('recipe');
  const recipeIds = bookmarks.map((b) => b.recipe.toString());
  return recipeIds;
};

export const BookmarkServices = {
  toggleBookmarkIntoDB,
  getMyBookmarksFromDB,
  getUserBookmarkIdsFromDB,
};
