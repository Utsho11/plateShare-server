import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const category = await Category.create(payload);

  return category;
};

const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
  const items = new QueryBuilder(Category.find({ isDeleted: false }), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await items.modelQuery;
  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  updateData: Partial<TCategory>
) => {
  const isCategoryExists = await Category.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }

  const category = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return category;
};

const deleteCategoryFromDB = async (id: string) => {
  const isCategoryExists = await Category.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!isCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
  }

  const category = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return category;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
