import { model, Schema } from 'mongoose';
import type { TVote } from './vote.interface';

const UpVoteSchema = new Schema<TVote>(
  {
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Recipe',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

const DownVoteSchema = new Schema<TVote>(
  {
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Recipe',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const UpVote = model<TVote>('UpVote', UpVoteSchema);
export const DownVote = model<TVote>('DownVote', DownVoteSchema);
