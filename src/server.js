import app from './app.js';
import config from './config/index.js';
import connectDB from './config/db.js';

/**
 * Start the server
 * 1. Connect to MongoDB
 * 2. Start Express server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    const server = app.listen(config.port, () => {
      console.log(`\n🚀 BoiProkash API Server running in ${config.nodeEnv} mode`);
      console.log(`📡 Server: http://localhost:${config.port}`);
      console.log(`💚 Health: http://localhost:${config.port}/api/health`);
      console.log(`📚 Books:  http://localhost:${config.port}/api/books`);
      console.log('');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('❌ UNHANDLED REJECTION:', err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('❌ UNCAUGHT EXCEPTION:', err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
