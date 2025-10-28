import type { Request } from 'express';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserSearchableFields } from './user.constant';
import type { TUser } from './user.interface';
import { User } from './user.model';

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  // console.log({ query });

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

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return user;
};

const updateUserProfile = async (id: string, req: Request) => {
  const data: Partial<TUser> = { ...req.body };

  if (req.file) {
    data.profilePhoto = req.file.path;
  }

  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(id, data);

  return updatedUser;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserProfile,
};
