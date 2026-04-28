import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { generateToken } from '../utils/jwt.js';

class AuthService {
  /**
   * Register a new user
   */
  async register({ name, email, password, phone }) {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError('User with this email already exists', 400);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    // Generate token
    const token = generateToken(user._id);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      token,
    };
  }

  /**
   * Login user with email and password
   */
  async login({ email, password }) {
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new ApiError('Invalid email or password', 401);
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken(user._id);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      token,
    };
  }

  /**
   * Get user profile by ID
   */
  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId, updates) {
    // Don't allow password update through this method
    const { password, role, ...allowedUpdates } = updates;

    const user = await User.findByIdAndUpdate(userId, allowedUpdates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    return user;
  }
}

export default new AuthService();
