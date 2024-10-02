import httpStatus from 'http-status';
import { CommentService } from './comment.service';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const createComment = catchAsync(async (req, res) => {
  const { recipeId, userId, comment } = req.body;
  const result = await CommentService.addComment(recipeId, userId, comment);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Added Successfully',
    data: result,
  });
});

const editComment = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const { userId, comment } = req.body;

  const { commentId } = req.params;
  const result = await CommentService.editComment(
    commentId,
    userId,
    comment,
    token as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment edited Successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const { commentId } = req.params;
  const result = await CommentService.deleteComment(commentId, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment deleted Successfully',
    data: result,
  });
});

const getCommentsForRecipe = catchAsync(async (req, res) => {
  const { recipeId } = req.params;

  const comments = await CommentService.getCommentsForRecipe(recipeId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments Retrieved Successfully',
    data: comments,
  });
});

export const CommentController = {
  createComment,
  editComment,
  deleteComment,
  getCommentsForRecipe,
};
