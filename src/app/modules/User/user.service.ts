import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserSearchableFields } from './user.constant';
import { User } from './user.model';
import { TUser } from './user.interface';
import { TImageFiles } from '../../interfaces/image.interface';

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const updateUserStatusIntoDB = async (userId: string, status: string) => {
  const isUserExists = await User.findOne({
    _id: userId,
  });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { status },
    {
      new: true,
    }
  );
  return user;
};

const deleteUserFromDB = async (id: string) => {
  const isUserExists = await User.findOne({
    _id: id,
  });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const user = await User.findByIdAndDelete(id);

  return user;
};

const updateUserIntoDB = async (
  userId: string,
  payload: TUser,
  images: TImageFiles
) => {
  // Fetch the user by ID
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Handle profile photo upload if provided
  const { profilePhoto } = images;

  if (profilePhoto && profilePhoto.length > 0) {
    // Assuming multiple profile photos are allowed
    payload.profilePhoto = profilePhoto.map((image) => image.path);
  }

  // Update the user fields in the database and return the updated user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: payload }, // Merging only the provided fields into the user object
    { new: true, runValidators: true } // Return the updated document and run schema validations
  );

  if (!updatedUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user'
    );
  }

  return updatedUser;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserStatusIntoDB,
  deleteUserFromDB,
  updateUserIntoDB,
};
