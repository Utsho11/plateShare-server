import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FollowerService } from "./followers.services";

const createFollower = catchAsync(async (req, res) => {

  const result = await FollowerService.createFollowerIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Follower Added Successfully',
    data: result,
  });
});

const removeFollower = catchAsync(async (req, res) => {

  const result = await FollowerService.removeFollowerFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Follower Removed Successfully',
    data: result,
  });
});

const getMyFollowers = catchAsync(async (req, res) => {

  const result = await FollowerService.getMyFollowersFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Followers Retrieved Successfully',
    data: result,
  });
});

const getMyFollowings = catchAsync(async (req, res) => {

  const result = await FollowerService.getMyFollowingFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Followings Retrieved Successfully',
    data: result,
  });
});


export const FollowerController = {
    createFollower, removeFollower, getMyFollowers, getMyFollowings
}