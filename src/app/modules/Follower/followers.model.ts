import { Schema, model } from 'mongoose';
import { TFollower } from './followers.interface';

const followerSchema = new Schema<TFollower>(
  {
    chefId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the chef
    followerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the follower
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

followerSchema.index({ chefId: 1, followerId: 1 }, { unique: true });

export const Follower = model<TFollower>('followers', followerSchema);