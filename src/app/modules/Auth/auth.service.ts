import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken, type TJwtPayload } from '../../utils/verifyJWT';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { EmailHelper } from '../../utils/emailSender';
import { TCustomerDetails } from '../../interfaces/customer.interface';
import { initiatePayment, verifyPayment } from '../../utils/payment';
import { readFileSync } from 'fs'; // Make sure fs is imported
import { join } from 'path';
import type { Request } from 'express';

const registerUser = async (req: Request) => {
  const payload = req.body;
  const file = req.file;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This user is already exist with this email!'
    );
  }

  payload['profilePhoto'] = file?.path;

  //create new user
  const newUser = await User.create(payload);

  // create token and sent to the  client

  const jwtPayload = {
    id: newUser._id,
    name: newUser.firstName + ' ' + newUser.lastName,
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload as TJwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload as TJwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
  // return payload;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    id: user._id,
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload as TJwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload as TJwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    id: user._id,
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload as TJwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (email: string) => {
  // checking if the user is exist
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    id: user._id,
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload as TJwtPayload,
    config.jwt_access_secret as string,
    '5m'
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `;

  EmailHelper.sendEmail(
    user.email,
    resetUILink,
    'Reset your password within five mins!'
  );

  // console.log(resetUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  // checking if the user is exist
  const user = await User.findById(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  if (payload.id !== decoded.id) {
    // console.log(payload.id, decoded.id);
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );
};

const sendEmailToAdmin = (email: string, message: string, subject: string) => {
  EmailHelper.sendEmailAdmin(email, message, subject);
};

const subscribeUserIntoDB = async (payload: TCustomerDetails) => {
  const transactionId = `TXN-${Date.now()}`;

  payload.tranId = transactionId;

  const paymentSession = await initiatePayment(payload);

  return paymentSession.payment_url;
};

const controllerService = async (transactionId: string, userId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  if (verifyResponse && verifyResponse?.pay_status === 'Successful') {
    await User.findByIdAndUpdate(
      userId,
      {
        role: 'PREMIUM',
      },
      { new: true }
    );
    const successfilePath = join(
      __dirname,
      '../../../../public/confirmation.html'
    );
    const template = readFileSync(successfilePath, 'utf-8');
    return template;
  } else {
    const failedFilePath = join(__dirname, '../../../../public/failed.html');
    const template = readFileSync(failedFilePath, 'utf-8');
    return template;
  }
};

export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  subscribeUserIntoDB,
  controllerService,
  sendEmailToAdmin,
};
