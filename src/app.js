import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import config from './config/index.js';
import errorHandler from './middlewares/errorHandler.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// ==========================================
// Security Middlewares
// ==========================================

// Helmet - set security HTTP headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increase for development
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// ==========================================
// Body Parsing Middlewares
// ==========================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ==========================================
// Logging
// ==========================================

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// ==========================================
// Health Check
// ==========================================

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BoiProkash API is running 📚',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// API Routes
// ==========================================

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);

// ==========================================
// 404 Handler
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ==========================================
// Global Error Handler
// ==========================================

app.use(errorHandler);

export default app;
