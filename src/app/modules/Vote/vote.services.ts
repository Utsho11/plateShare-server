import type { Request } from 'express';
import { DownVote, UpVote } from './vote.model';

const UpVoteToDB = async (req: Request) => {
  const { postId } = req.params;
  const userId = req.user?.id;

  const existingUpVote = await UpVote.findOne({ post: postId, user: userId });
  const existingDownVote = await DownVote.findOne({
    post: postId,
    user: userId,
  });

  if (existingUpVote) {
    await UpVote.deleteOne({ _id: existingUpVote._id });
  } else {
    if (existingDownVote) {
      await DownVote.deleteOne({ _id: existingDownVote._id });
    }
    await UpVote.create({ post: postId, user: userId });
  }
  return null;
};

const DownVoteToDB = async (req: Request) => {
  const { postId } = req.params;
  const userId = req.user?.id;

  const existingDownVote = await DownVote.findOne({
    post: postId,
    user: userId,
  });

  const existingUpVote = await UpVote.findOne({ post: postId, user: userId });

  if (existingDownVote) {
    await DownVote.deleteOne({ _id: existingDownVote._id });
  } else {
    if (existingUpVote) {
      await UpVote.deleteOne({ _id: existingUpVote._id });
    }
    await DownVote.create({ post: postId, user: userId });
  }
  return null;
};

export const VoteServices = {
  UpVoteToDB,
  DownVoteToDB,
};
