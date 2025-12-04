import type { Request } from 'express';
import mongoose from 'mongoose';
import { Community, CommunityMember } from './community.model';
import { COMMUNITY_ROLES, JOIN_STATUS } from './community.constant';
import type { TCommunityMember } from './community.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCommunityIntoDB = async (req: Request) => {
  const u_id = req.user?.id;
  const payload = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const community = await Community.create(
      [
        {
          name: payload.name,
          creator: u_id,
        },
      ],
      { session }
    );
    await CommunityMember.create(
      [
        {
          community_id: community[0]._id,
          user_id: u_id,
          role: COMMUNITY_ROLES.ADMIN,
          join_status: JOIN_STATUS.ACCEPT,
        },
      ],
      { session }
    );
    await session.commitTransaction();
    return community[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const createCommunityMemberIntoDB = async (req: Request) => {
  const payload = req.body;
  const id = req.user?.id;

  // console.log(payload);

  const communityMember = await CommunityMember.create({
    community_id: payload.community_id,
    user_id: id,
    role: COMMUNITY_ROLES.MEMBER,
    join_status: JOIN_STATUS.PENDING,
  });
  return communityMember;
};

const acceptCommunityMemberIntoDB = async (req: Request) => {
  const { c_id, u_id } = req.body;
  const admin_id = req.user?.id;

  const communityRole = await CommunityMember.findOne({
    community_id: c_id,
    user_id: admin_id,
  });

  if (
    [COMMUNITY_ROLES.ADMIN, COMMUNITY_ROLES.MODERATOR].includes(
      communityRole?.role as TCommunityMember['role']
    )
  ) {
    const updatedMember = await CommunityMember.findOneAndUpdate(
      { community_id: c_id, user_id: u_id },
      { join_status: JOIN_STATUS.ACCEPT, joinedAt: new Date() },
      { new: true }
    );
    return updatedMember;
  } else return null;
};

const getAllCommunitiesFromDB = async () => {
  const communities = await Community.find();
  return communities;
}

const getAllMyCommunitiesFromDB = async (req:Request) => {
  const user_id = req.user?.id;
  const communities = await CommunityMember.find().where({
    user_id,
  }).populate('community_id');
  return communities;
}

const getAllMembersByCommunityFromDB = async (req:Request) => {

  const { c_id } = req.params;
  const user_id = req.user?.id;

  const isUserExists = await CommunityMember.findOne({
    community_id: c_id,
    user_id: user_id,
    join_status: JOIN_STATUS.ACCEPT,
  });

  if(isUserExists){
const communityMembers = await CommunityMember.find().where({
  community_id:c_id
})
    return communityMembers;
  }else{
    throw new AppError(httpStatus.NOT_FOUND,"Something went wrong!!")
  }

  // const communities = await Community.find();
}

const leaveCommunityFromDB = async (req:Request) => {
  const { c_id } = req.body;

  const isAdmin = await CommunityMember.findById(c_id)

  // console.log(isAdmin);
  

  if(isAdmin?.role === COMMUNITY_ROLES.ADMIN){
    throw new AppError(httpStatus.BAD_REQUEST,"Admin can't leave the community!!")
  }

  const res = await CommunityMember.findByIdAndDelete(c_id)

  return res;
}

export const CommunityServices = {
  createCommunityIntoDB,
  createCommunityMemberIntoDB,getAllMyCommunitiesFromDB,
  acceptCommunityMemberIntoDB,getAllCommunitiesFromDB,getAllMembersByCommunityFromDB,leaveCommunityFromDB
};
