import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RecipeValidation } from './recipe.validation';
import { RecipeControllers } from './recipe.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = express.Router();

export const RecipeRoutes = router;

router.post(
  '/create',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  multerUpload.fields([{ name: 'files' }]),
  parseBody,
  validateRequest(RecipeValidation.createRecipeValidationSchema),
  RecipeControllers.createRecipe
);

router.get('/', RecipeControllers.getAllRecipe);

router.get('/:id', RecipeControllers.getSingleRecipe);

router.patch(
  '/update/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RecipeControllers.updateRecipe
);

router.patch(
  '/change-status/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RecipeControllers.changeRecipeStatus
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RecipeControllers.deleteRecipe
);
