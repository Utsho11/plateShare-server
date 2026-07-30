import type { Schema } from 'mongoose';

export type TBookmark = {
  _id?: string;
  user: Schema.Types.ObjectId;
  recipe: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
