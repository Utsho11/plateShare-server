import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RecipeValidation } from './recipe.validation';
import { RecipeControllers } from './recipe.controller';

import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import { ImageFilesArrayZodSchema } from '../../zod/image.validation';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = express.Router();

export const RecipeRoutes = router;

router.post(
  '/create-recipe',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.PREMIUM),
  multerUpload.fields([{ name: 'recipeImages' }]),
  parseBody,
  validateImageFileRequest(ImageFilesArrayZodSchema),
  validateRequest(RecipeValidation.createRecipeValidationSchema),
  RecipeControllers.createRecipe
);

router.get('/', RecipeControllers.getAllRecipe);

router.get('/:id', RecipeControllers.getSingleRecipe);

router.put(
  '/update-recipe/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.PREMIUM),
  validateRequest(RecipeValidation.updateRecipeValidationSchema),
  RecipeControllers.updateRecipe
);

router.delete(
  '/delete-recipe/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.PREMIUM),
  RecipeControllers.deleteRecipe
);
