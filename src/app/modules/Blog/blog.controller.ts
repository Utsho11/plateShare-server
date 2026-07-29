import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const authorId = req.user?.id;
  const blog = await BlogServices.createBlogIntoDB(req.body, authorId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Blog created successfully',
    data: blog,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const blogs = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blogs retrieved successfully',
    data: blogs,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const blog = await BlogServices.getSingleBlogFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog retrieved successfully',
    data: blog,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const userEmail = req.user?.email;
  const isAdmin = req.user?.role === 'ADMIN';
  const blog = await BlogServices.updateBlogIntoDB(
    req.params.id,
    req.body,
    userEmail,
    isAdmin
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog updated successfully',
    data: blog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const userEmail = req.user?.email;
  const isAdmin = req.user?.role === 'ADMIN';
  await BlogServices.deleteBlogFromDB(req.params.id, userEmail, isAdmin);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
    data: null,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
