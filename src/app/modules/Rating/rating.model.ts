import { Schema, model, Types } from 'mongoose';

const ratingSchema = new Schema(
  {
    recipeId: { type: Types.ObjectId, ref: 'Recipe', required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

export const Rating = model('ratings', ratingSchema);
