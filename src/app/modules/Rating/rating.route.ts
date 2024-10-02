import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RatingController } from './rating.controller';
import { createRatingValidationSchema } from './rating.validation';
const router = express.Router();

export const RatingRoutes = router;

router.post(
  '/:recipeId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.PREMIUM),
  validateRequest(createRatingValidationSchema),
  RatingController.addRating
);
