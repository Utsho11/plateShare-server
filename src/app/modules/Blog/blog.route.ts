import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BlogControllers } from './blog.controller';

const router = express.Router();

export const BlogRoutes = router;

// Public
router.get('/', BlogControllers.getAllBlogs);
router.get('/:id', BlogControllers.getSingleBlog);

// Authenticated
router.post(
  '/create',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BlogControllers.createBlog
);

router.patch(
  '/update/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BlogControllers.updateBlog
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BlogControllers.deleteBlog
);
