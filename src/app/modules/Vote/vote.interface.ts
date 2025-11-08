import { Types } from 'mongoose';

export type TVote = {
  _id: Types.ObjectId;
  post: Types.ObjectId;
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
