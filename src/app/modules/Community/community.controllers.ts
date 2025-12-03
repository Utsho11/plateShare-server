import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommunityServices } from './community.services';

const createCommunity = catchAsync(async (req, res) => {
  const result = await CommunityServices.createCommunityIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Community Created Successfully',
    data: result,
  });
});

const createCommunityMember = catchAsync(async (req, res) => {
  const result = await CommunityServices.createCommunityMemberIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Community Member Created Successfully',
    data: result,
  });
});

const acceptCommunityMember = catchAsync(async (req, res) => {
  const result = await CommunityServices.acceptCommunityMemberIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Community Member Accepted Successfully',
    data: result,
  });
});

const getAllCommunities = catchAsync(async (req, res) => {
  const result = await CommunityServices.getAllCommunitiesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Community Fetched Successfully',
    data: result,
  });
});

const getAllMembersByCommunity = catchAsync(async (req, res) => {
  const result = await CommunityServices.getAllMembersByCommunityFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Community Members Fetched Successfully',
    data: result,
  });
});

const leaveCommunity = catchAsync(async (req, res) => {
  const result = await CommunityServices.leaveCommunityFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Community Member Left Successfully',
    data: result,
  });
});

export const CommunityControllers = {
  createCommunity,
  createCommunityMember,
  acceptCommunityMember,
  getAllCommunities,
  getAllMembersByCommunity,
  leaveCommunity
};
