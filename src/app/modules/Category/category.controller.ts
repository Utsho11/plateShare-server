import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';
import { catchAsync } from '../../utils/catchAsync';

const createCategory = catchAsync(async (req, res) => {
  const category = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: category,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const category = await CategoryServices.getAllCategoryFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category Retrieved Successfully',
    data: category,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await CategoryServices.updateCategoryIntoDB(
    id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    data: itemCategory,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await CategoryServices.deleteCategoryFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category Deleted Successfully',
    data: itemCategory,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
