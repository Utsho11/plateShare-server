import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { VoteControllers } from './vote.controllers';

const router = express.Router();

export const VoteRoutes = router;

router.patch(
  '/up-vote/:postId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  VoteControllers.toggleUpVote
);
router.patch(
  '/down-vote/:postId',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  VoteControllers.toggleDownVote
);
