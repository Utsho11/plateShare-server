import { model, Schema } from 'mongoose';
import type { TBlog } from './blog.interface';

export const BLOG_CATEGORY = {
  FOOD_SCIENCE: 'FOOD_SCIENCE',
  KITCHEN_TIPS: 'KITCHEN_TIPS',
  NUTRITION: 'NUTRITION',
  SUSTAINABILITY: 'SUSTAINABILITY',
  CULTURE: 'CULTURE',
  TRAVEL: 'TRAVEL',
  GENERAL: 'GENERAL',
} as const;

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: Object.values(BLOG_CATEGORY),
      default: BLOG_CATEGORY.GENERAL,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true },
  }
);

export const Blog = model<TBlog>('Blog', blogSchema);
