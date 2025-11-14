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

router.post(
  '/create-member',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  CommunityControllers.createCommunityMember
);

router.patch(
  '/accept-member',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  CommunityControllers.acceptCommunityMember
);

router.get(
  '/get-all',
  // auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  CommunityControllers.getAllCommunities
);

router.get('/get-all-members/:c_id',auth(USER_ROLE.ADMIN,USER_ROLE.USER),CommunityControllers.getAllMembersByCommunity)