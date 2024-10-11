import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidation } from './comment.validation';
import { CommentController } from './comment.controller';

const router = express.Router();

export const CommentRoutes = router;

router.post(
  '/add-comment',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.PREMIUM),
  validateRequest(CommentValidation.createCommentValidationSchema),
  CommentController.createComment
);

router.get('/:recipeId', CommentController.getCommentsForRecipe);

router.put(
  '/edit-comment',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.PREMIUM),
  validateRequest(CommentValidation.updateCommentValidationSchema),
  CommentController.editComment
);

router.delete(
  '/delete-comment/:commentId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.PREMIUM),
  CommentController.deleteComment
);
