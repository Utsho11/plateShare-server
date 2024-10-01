import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();

export const CategoryRoutes = router;

router.post(
  '/create-category',
  auth(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory
);

router.get('/', CategoryControllers.getAllCategories);

router.put(
  '/update-category/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoryControllers.updateCategory
);

router.delete(
  '/delete-category/:id',
  auth(USER_ROLE.ADMIN),
  CategoryControllers.deleteCategory
);
