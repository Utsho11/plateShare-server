import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { FollowerController } from './followers.controllers';

const router = express.Router();

export const FollowerRoutes = router;

router.get("/get-my-followers",auth(USER_ROLE.USER,USER_ROLE.ADMIN),FollowerController.getMyFollowers)
router.post("/create",auth(USER_ROLE.USER,USER_ROLE.ADMIN),FollowerController.createFollower)
router.delete("/remove",auth(USER_ROLE.USER,USER_ROLE.ADMIN),FollowerController.removeFollower)
router.get("/get-my-followings",auth(USER_ROLE.USER,USER_ROLE.ADMIN),FollowerController.getMyFollowings)