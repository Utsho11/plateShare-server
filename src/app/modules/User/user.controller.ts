import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interfaces/image.interface';

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

const addFollowing = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { actionType, id } = req.body;
  const result = await UserServices.addFollowingIntoDB(id, _id, actionType);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Following Added Successfully',
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const { userId, status } = req.body;
  const updatedItem = await UserServices.updateUserStatusIntoDB(userId, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe updated successfully',
    data: updatedItem,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  await UserServices.deleteUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe deleted successfully',
    data: null,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!req.files) {
    throw new AppError(400, 'Please upload an image');
  }
  const result = await UserServices.updateUserIntoDB(
    id,
    req.body,
    req.files as TImageFiles
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

export const UserControllers = {
  getSingleUser,
  getAllUsers,
  addFollowing,
  updateUserStatus,
  deleteUser,
  updateUser,
};
