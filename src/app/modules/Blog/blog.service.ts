import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import type { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import type { TUser } from '../User/user.interface';

const BlogSearchableFields = ['title', 'content', 'category', 'tags'];

const createBlogIntoDB = async (
  payload: TBlog,
  authorId: string
): Promise<TBlog> => {
  const result = await Blog.create({ ...payload, author: authorId });
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogs = new QueryBuilder(
    Blog.find({ isDeleted: false })
      .populate('author', '_id firstName lastName email profilePhoto'),
    query
  )
    .filter()
    .search(BlogSearchableFields)
    .sort()
    .paginate()
    .fields();

  const result = await blogs.modelQuery;
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const blog = await Blog.findOne({ _id: id, isDeleted: false }).populate(
    'author',
    '_id firstName lastName email profilePhoto'
  );
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }
  return blog;
};

const updateBlogIntoDB = async (
  id: string,
  updateData: Partial<TBlog>,
  userEmail: string,
  isAdmin: boolean
) => {
  const blog = await Blog.findOne({ _id: id, isDeleted: false })
    .populate<{ author: Pick<TUser, 'email'> }>('author', 'email')
    .lean();

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }

  const authorEmail =
    typeof blog.author === 'object' && 'email' in blog.author
      ? blog.author.email
      : null;

  // Only author or admin can update
  if (!isAdmin && userEmail && authorEmail !== userEmail) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this blog!'
    );
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return updatedBlog;
};

const deleteBlogFromDB = async (
  id: string,
  userEmail: string,
  isAdmin: boolean
) => {
  const blog = await Blog.findOne({ _id: id, isDeleted: false })
    .populate<{ author: Pick<TUser, 'email'> }>('author', 'email')
    .lean();

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }

  const authorEmail =
    typeof blog.author === 'object' && 'email' in blog.author
      ? blog.author.email
      : null;

  if (!isAdmin && userEmail && authorEmail !== userEmail) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this blog!'
    );
  }

  await Blog.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return null;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
