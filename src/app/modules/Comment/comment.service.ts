import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Comment } from './comment.model';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../../utils/verifyJWT';

// Add comment
const addComment = async (
  recipeId: string,
  userId: string,
  comment: string
) => {
  const newComment = await Comment.create({ recipeId, userId, comment });
  return newComment;
};

// Edit comment
const editComment = async (newComment: string, commentId: string) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: commentId },
    { comment: newComment, updatedAt: Date.now() },
    { new: true }
  );
  if (!comment) throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  return comment;
};

// Delete comment
const deleteComment = async (commentId: string, token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  const { _id } = decoded;

  const result = await Comment.findByIdAndDelete({
    _id: commentId,
    userId: _id,
  });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  return result;
};

// Get all comments for a recipe
const getCommentsForRecipe = async (recipeId: string) => {
  return await Comment.find({ recipeId })
    .sort({ createdAt: -1 })
    .populate('userId'); // Sort by createdAt in ascending order (oldest first)
};

export const CommentService = {
  addComment,
  editComment,
  deleteComment,
  getCommentsForRecipe,
};
