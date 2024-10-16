import { Types } from 'mongoose';

export type TRating = {
  recipeId?: Types.ObjectId;
  userId?: Types.ObjectId;
  rating: number;
};
