import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = express.Router();

export const UserRoutes = router;

router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.patch(
  '/add-following',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.PREMIUM),
  UserControllers.addFollowing
);

router.put(
  '/update-user-status',
  auth(USER_ROLE.ADMIN),
  UserControllers.updateUserStatus
);

router.delete(
  '/delete-user/:id',
  auth(USER_ROLE.ADMIN),
  UserControllers.deleteUser
);

router.put(
  '/update-user/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.PREMIUM),
  multerUpload.fields([{ name: 'profilePhoto' }]),
  parseBody,
  UserControllers.updateUser
);
