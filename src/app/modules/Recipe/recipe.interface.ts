export type IVote = {
  email: string;
  voteType: 'upvote' | 'downvote';
};

export type TRecipe = {
  _id: string;
  images?: string[];
  name: string;
  category: string;
  cookingTime: string;
  description: string;
  ingredients: string;
  premium: boolean;
  email: string;
  isDeleted?: boolean;
  upvotes?: number;
  downvotes?: number;
  votedUsers?: IVote[];
};
