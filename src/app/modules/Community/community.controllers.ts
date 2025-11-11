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

export const CommunityControllers = {
  createCommunity,
  createCommunityMember,
};
