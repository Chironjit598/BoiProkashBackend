import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { verifyToken } from '../utils/jwt.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError('Not authorized, no token provided', 401);
  }

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      throw new ApiError('User not found', 401);
    }

    next();
  } catch (error) {
    throw new ApiError('Not authorized, invalid token', 401);
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        `Role '${req.user.role}' is not authorized to access this route`,
        403
      );
    }
    next();
  };
};
