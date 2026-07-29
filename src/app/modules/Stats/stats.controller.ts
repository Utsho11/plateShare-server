import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatsServices } from './stats.service';
import httpStatus from 'http-status';

const getPlatformStats = catchAsync(async (_req, res) => {
  const stats = await StatsServices.getPlatformStatsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Platform stats retrieved successfully',
    data: stats,
  });
});

export const StatsControllers = { getPlatformStats };
