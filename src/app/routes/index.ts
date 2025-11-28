import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { RecipeRoutes } from '../modules/Recipe/recipe.route';
import { CommentRoutes } from '../modules/Comment/comment.route';
import { RatingRoutes } from '../modules/Rating/rating.route';
import { VoteRoutes } from '../modules/Vote/vote.routes';
import { CommunityRoutes } from '../modules/Community/community.routes';
import { FollowerRoutes } from '../modules/Follower/followers.routes';

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
  {
    path: '/voting',
    route: VoteRoutes,
  },
  {
    path: '/community',
    route: CommunityRoutes,
  },
  {
    path: '/followers',
    route: FollowerRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
