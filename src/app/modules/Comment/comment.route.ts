import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidation } from './comment.validation';
import { CommentController } from './comment.controller';

const router = express.Router();

export const CommentRoutes = router;

router.post(
  '/create',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(CommentValidation.createCommentValidationSchema),
  CommentController.createComment
);

router.get('/:recipeId', CommentController.getCommentsForRecipe);

router.patch(
  '/edit/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(CommentValidation.updateCommentValidationSchema),
  CommentController.editComment
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  CommentController.deleteComment
);
