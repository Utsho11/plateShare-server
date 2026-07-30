import { model, Schema } from 'mongoose';
import type { TBookmark } from './bookmark.interface';

const bookmarkSchema = new Schema<TBookmark>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true },
  }
);

// Compound index to ensure a user can only bookmark a recipe once
bookmarkSchema.index({ user: 1, recipe: 1 }, { unique: true });

export const Bookmark = model<TBookmark>('Bookmark', bookmarkSchema);
