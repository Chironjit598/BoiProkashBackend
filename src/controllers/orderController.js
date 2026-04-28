import orderService from '../services/orderService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.user._id, req.body);
  ApiResponse.success(res, { order }, 'Order placed successfully', 201);
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user._id);
  ApiResponse.success(res, { orders }, 'Orders fetched successfully');
});
