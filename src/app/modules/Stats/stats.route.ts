import express from 'express';
import { StatsControllers } from './stats.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

export const StatsRoutes = router;

// Platform statistics — accessible to both admin and logged-in users (used by admin dashboard)
router.get('/', auth(USER_ROLE.ADMIN, USER_ROLE.USER), StatsControllers.getPlatformStats);
