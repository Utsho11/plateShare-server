import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

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
  updatedUser.following = updatedUser.following || [];
  updatedFollowerCollection.followers =
    updatedFollowerCollection.followers || [];

  if (actionType === 'follow') {
    updatedUser.following.push(fid);
    updatedFollowerCollection?.followers.push(userId);
  }

  if (actionType === 'unfollow') {
    updatedUser.following = updatedUser.following.filter(
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
      { following: updatedUser.following },
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

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  addFollowingIntoDB,
};
