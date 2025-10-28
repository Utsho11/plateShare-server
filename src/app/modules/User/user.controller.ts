import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const getMe = catchAsync(async (req, res) => {
  // console.log('id', req);

  const user = await UserServices.getSingleUserFromDB(req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Profile Retrieved Successfully',
    data: user,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const user = await UserServices.updateUserProfile(req.user.id, req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile Updated Successfully',
    data: user,
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  getMe,
  updateMyProfile,
};
