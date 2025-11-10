import type { Request } from 'express';
import mongoose from 'mongoose';
import { Community, CommunityMember } from './community.model';
import { COMMUNITY_ROLES, JOIN_STATUS } from './community.constant';

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

export const CommunityServices = {
  createCommunityIntoDB,
};
