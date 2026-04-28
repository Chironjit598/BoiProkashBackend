import ApiError from '../utils/ApiError.js';

/**
 * Validate request body fields
 * @param {string[]} requiredFields - Array of required field names
 */
export const validateRequired = (requiredFields) => {
  return (req, res, next) => {
    const missing = requiredFields.filter((field) => {
      const value = req.body[field];
      return value === undefined || value === null || value === '';
    });

    if (missing.length > 0) {
      throw new ApiError(
        `Missing required fields: ${missing.join(', ')}`,
        400
      );
    }

    next();
  };
};

/**
 * Validate email format
 */
export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (email) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError('Invalid email format', 400);
    }
  }
  next();
};

/**
 * Validate MongoDB ObjectId in params
 */
export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new ApiError(`Invalid ${paramName} format`, 400);
    }
    next();
  };
};
