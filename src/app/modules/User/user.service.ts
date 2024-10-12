import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserSearchableFields } from './user.constant';
import { User } from './user.model';

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

const addFollowingIntoDB = async (
  fid: string,
  userId: string,
  actionType: 'follow' | 'unfollow'
) => {
  const userCollection = await User.findById(userId);
  const followerCollection = await User.findById(fid);

  if (!userCollection) {
    throw new Error('Recipe not found');
  }

  if (!followerCollection) {
    throw new Error('Recipe not found');
  }

  const updatedUser = userCollection.toObject();
  const updatedFollowerCollection = followerCollection.toObject();
  updatedUser.followings = updatedUser.followings || [];
  updatedFollowerCollection.followers =
    updatedFollowerCollection.followers || [];

  if (actionType === 'follow') {
    updatedUser.followings.push(fid);
    updatedFollowerCollection?.followers.push(userId);
  }

  if (actionType === 'unfollow') {
    updatedUser.followings = updatedUser.followings.filter(
      (voter: string) => voter !== fid
    );
    updatedFollowerCollection.followers =
      updatedFollowerCollection.followers.filter(
        (voter: string) => voter !== userId
      );
  }
  try {
    await User.findByIdAndUpdate(
      userId,
      { followings: updatedUser.followings },
      { new: true }
    );
    await User.findByIdAndUpdate(
      fid,
      { followers: updatedFollowerCollection?.followers },
      { new: true }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error saving follower:', error);
    throw new Error('Error saving follower');
  }
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

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  addFollowingIntoDB,
  updateUserStatusIntoDB,
  deleteUserFromDB,
};
