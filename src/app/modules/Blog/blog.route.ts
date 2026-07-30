import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BlogControllers } from './blog.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

export const BlogRoutes = router;

// Public
router.get('/', BlogControllers.getAllBlogs);
router.get('/:id', BlogControllers.getSingleBlog);

// Authenticated
router.post(
  '/create',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  BlogControllers.createBlog
);

router.patch(
  '/update/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  BlogControllers.updateBlog
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  BlogControllers.deleteBlog
);
