import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { RecipeRoutes } from '../modules/Recipe/recipe.route';
import { CommentRoutes } from '../modules/Comment/comment.route';
import { RatingRoutes } from '../modules/Rating/rating.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/recipe',
    route: RecipeRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/rating',
    route: RatingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
