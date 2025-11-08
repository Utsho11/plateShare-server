import type { Types } from 'mongoose';
import type { COMMUNITY_ROLES } from './community.constant';

export type TCommunity = {
  _id: Types.ObjectId;
  name: string;
  creator: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TCommunityMember = {
  community_id: Types.ObjectId;
  user_id: Types.ObjectId;
  role: keyof typeof COMMUNITY_ROLES;
  joinedAt?: Date;
  leftAt?: Date;
};
