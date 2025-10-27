import httpStatus from 'http-status';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { Request, Response } from 'express';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: result,
  });
});

const sendEmail = catchAsync(async (req, res) => {
  const { email, message, subject } = req.body;

  const result = await AuthServices.sendEmailToAdmin(email, message, subject);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token retrieved successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const email = req.body.email;
  const result = await AuthServices.forgetPassword(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }

  //http://localhost:3000/reset-password?id=68ffc3b1acb5a8ac6e2e37f1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZmZjM2IxYWNiNWE4YWM2ZTJlMzdmMSIsIm5hbWUiOiJVdHNobyBSb3kiLCJlbWFpbCI6InV0c2hvcm95NTIyQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzYxNTkzNDQ1LCJleHAiOjE3NjE1OTM3NDV9.aXhyXRu7Y2uwmC-xGuum_Vcq9rpkEi3Q8eyTshs06RQ

  const result = await AuthServices.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesfully!',
    data: result,
  });
});

const subscribeUser = catchAsync(async (req, res) => {
  const userId = req.body;

  const result = await AuthServices.subscribeUserIntoDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User has Subscribed successfully!',
    data: result,
  });
});

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId, userId } = req.query;
  const result = await AuthServices.controllerService(
    transactionId as string,
    userId as string
  );
  res.send(result);
};

export const paymentController = {
  confirmationController,
};

export const AuthControllers = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  subscribeUser,
  confirmationController,
  sendEmail,
};
