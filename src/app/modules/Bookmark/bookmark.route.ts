import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BookmarkControllers } from './bookmark.controller';

const router = express.Router();

export const BookmarkRoutes = router;

router.post(
  '/toggle/:recipeId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BookmarkControllers.toggleBookmark
);

router.get(
  '/my-bookmarks',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BookmarkControllers.getMyBookmarks
);

router.get(
  '/my-bookmark-ids',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BookmarkControllers.getUserBookmarkIds
);
