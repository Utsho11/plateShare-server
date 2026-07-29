import type { Schema } from 'mongoose';

export type TBlog = {
  _id?: string;
  title: string;
  content: string;
  coverImage?: string;
  category: string;
  tags?: string[];
  author: Schema.Types.ObjectId;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
