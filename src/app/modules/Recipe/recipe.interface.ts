export type IVote = {
  email: string;
  voteType: 'upvote' | 'downvote';
};

export type TRecipe = {
  _id: string;
  name: string;
  category: string;
  cookingTime: string;
  description: string;
  email: string;
  recipeType: 'FREE' | 'PREMIUM';
  recipeStatus: 'PUBLISH' | 'BLOCK';
  ingredients: string[];
  images?: string[];
  isDeleted?: boolean;
  upvotes?: string[];
  downvotes?: string[];
};
