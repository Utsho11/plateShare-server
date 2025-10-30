import httpStatus from 'http-status';
import { CommentService } from './comment.service';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const createComment = catchAsync(async (req, res) => {
  const { recipeId, comment } = req.body;
  const userId = req.user.id;
  // console.log(req.user);

  const result = await CommentService.addComment(recipeId, userId, comment);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Added Successfully',
    data: result,
  });
});

const editComment = catchAsync(async (req, res) => {
  const { comment } = req.body;
  const userId = req.user.id;
  const commentId = req.params.id;

  const result = await CommentService.editComment(comment, commentId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment edited Successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  // const token = req.headers.authorization as string;
  const userId = req.user.id;
  const { id: commentId } = req.params;
  const result = await CommentService.deleteComment(commentId, userId);

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
