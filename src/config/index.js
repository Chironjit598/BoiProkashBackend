import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralized environment configuration
 * All env variables are accessed through this module
 */
const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/boi-prokash',
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret_change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

export default config;
