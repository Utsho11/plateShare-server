import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { VoteServices } from './vote.services';
const toggleUpVote = catchAsync(async (req, res) => {
  await VoteServices.UpVoteToDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vote Up Successfully',
    data: null,
  });
});

const toggleDownVote = catchAsync(async (req, res) => {
  await VoteServices.DownVoteToDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Vote Down Successfully',
    data: null,
  });
});

export const VoteControllers = {
  toggleUpVote,
  toggleDownVote,
};
