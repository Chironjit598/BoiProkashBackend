import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sendTokenResponse } from '../utils/jwt.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, city } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new ApiError('User already exists', 400);

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
    city,
  });

  sendTokenResponse(user, 201, res);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError('Please provide email and password', 400);

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ApiError('Invalid credentials', 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError('Invalid credentials', 401);

  sendTokenResponse(user, 200, res);
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  ApiResponse.success(res, { user }, 'Profile fetched successfully');
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  ApiResponse.success(res, null, 'Logged out successfully');
});
