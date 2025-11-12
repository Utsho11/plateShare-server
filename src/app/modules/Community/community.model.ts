import { model, Schema } from 'mongoose';
import type { TCommunity, TCommunityMember } from './community.interface';
import { COMMUNITY_ROLES, JOIN_STATUS } from './community.constant';

const CommunitySchema = new Schema<TCommunity>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

const CommunityMemberSchema = new Schema<TCommunityMember>(
  {
    community_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Community',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    role: {
      type: String,
      enum: Object.values(COMMUNITY_ROLES),
      required: true,
    },
    join_status: {
      type: String,
      enum: Object.values(JOIN_STATUS),
      required: true,
    },
    joinedAt: {
      type: Date,
      default: null,
    },
    leftAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const Community = model<TCommunity>('Community', CommunitySchema);
export const CommunityMember = model<TCommunityMember>(
  'CommunityMember',
  CommunityMemberSchema
);
