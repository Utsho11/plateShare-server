import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { CommunityControllers } from './community.controllers';

const router = express.Router();

export const CommunityRoutes = router;

router.post(
  '/create',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  CommunityControllers.createCommunity
);
