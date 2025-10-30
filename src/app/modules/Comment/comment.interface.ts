import { Types } from 'mongoose';

export type TComment = {
  recipeId: Types.ObjectId;
  userId?: Types.ObjectId;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/*

*/
