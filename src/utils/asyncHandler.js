/**
 * Async handler wrapper to avoid try-catch in every controller
 * Catches async errors and passes them to the error handler middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
