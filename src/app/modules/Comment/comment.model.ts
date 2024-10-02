import { Schema, model, Types } from 'mongoose';

const commentSchema = new Schema(
  {
    recipeId: { type: Types.ObjectId, ref: 'Recipe', required: true }, // Link to the recipe
    userId: { type: Types.ObjectId, ref: 'User', required: true }, // Link to the user
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

export const Comment = model('comments', commentSchema);
