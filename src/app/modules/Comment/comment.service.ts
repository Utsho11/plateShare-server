import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Comment } from './comment.model';
import { User } from '../User/user.model';
import { USER_STATUS } from '../User/user.constant';
import { Recipe } from '../Recipe/recipe.model';

// Add comment
const addComment = async (
  recipeId: string,
  userId: string,
  comment: string
) => {
  const user = await User.findById(userId).where({
    status: USER_STATUS.ACTIVE,
  });

  // console.log({ userId });

  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to add comment'
    );
  }

  const recipeExists = await Recipe.findById(recipeId).where({
    isDeleted: false,
  });

  if (!recipeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  const newComment = await Comment.create({ recipeId, userId, comment });

  return newComment;
};

// Edit comment
const editComment = async (
  newComment: string,
  commentId: string,
  userId: string
) => {
  const user = await User.findById(userId).where({
    status: USER_STATUS.ACTIVE,
  });

  // console.log({ userId });

  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to add comment'
    );
  }

  const updatedComment = await Comment.findOneAndUpdate(
    { _id: commentId, userId },
    { comment: newComment, updatedAt: new Date() },
    { new: true }
  );

  if (!updatedComment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Comment not found or not owned by you'
    );
  }

  return updatedComment;
};

// Delete comment
const deleteComment = async (commentId: string, userId: string) => {
  const user = await User.findById(userId).where({
    status: USER_STATUS.ACTIVE,
  });

  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to add comment'
    );
  }

  const result = await Comment.findOneAndDelete({ _id: commentId, userId });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  return result;
};

// Get all comments for a recipe
const getCommentsForRecipe = async (recipeId: string) => {
  const comments = await Comment.find({ recipeId })
    .sort({ createdAt: -1 })
    .populate('userId', '_id firstName lastName email profilePhoto');

  return comments;
};

export const CommentService = {
  addComment,
  editComment,
  deleteComment,
  getCommentsForRecipe,
};
