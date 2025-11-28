import { Types } from "mongoose";

export type  TFollower = {
  chefId: Types.ObjectId;
  followerId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};