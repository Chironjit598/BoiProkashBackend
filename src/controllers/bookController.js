import bookService from '../services/bookService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getBooks = asyncHandler(async (req, res) => {
  const data = await bookService.getBooks(req.query);
  ApiResponse.success(res, data, 'Books fetched successfully');
});

export const getBookById = asyncHandler(async (req, res) => {
  const data = await bookService.getBookById(req.params.id);
  ApiResponse.success(res, data, 'Book details fetched successfully');
});

export const getHomeData = asyncHandler(async (req, res) => {
  const data = await bookService.getHomeData();
  ApiResponse.success(res, data, 'Home data fetched successfully');
});

export const getCategories = asyncHandler(async (req, res) => {
  const data = await bookService.getCategoriesWithCount();
  ApiResponse.success(res, data, 'Categories fetched successfully');
});
