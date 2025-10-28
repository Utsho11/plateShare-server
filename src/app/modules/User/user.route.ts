import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { multerUpload } from '../../config/multer.config';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

export const UserRoutes = router;

router.get('/', UserControllers.getAllUsers);

router.get('/me', auth(USER_ROLE.ADMIN, USER_ROLE.USER), UserControllers.getMe);

router.get('/:id', auth(USER_ROLE.ADMIN), UserControllers.getSingleUser);

router.patch(
  '/update-my-profile',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateMyProfile
);
