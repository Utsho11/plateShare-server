import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest, {
  validateRequestCookies,
} from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = express.Router();

router.post(
  '/register',
  multerUpload.fields([{ name: 'profilePhoto' }]),
  parseBody,
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.registerUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  '/change-password',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
);

router.post(
  '/refresh-token',
  validateRequestCookies(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
);

router.post(
  '/reset-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.resetPassword
);

router.post('/subscribe', auth(USER_ROLE.USER), AuthControllers.subscribeUser);

router.post('/confirmation', AuthControllers.confirmationController);

router.post('/send-mail', AuthControllers.sendEmail);

export const AuthRoutes = router;
