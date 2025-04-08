const express = require('express');
const { fromEnv } = require('./utils');
const { logger } = require('./utils');
const connectDB = require('./config/connection');  
const routes = require('./routes');
const cors = require('cors');
const agenda = require('./config/agenda'); 

const app = express();
const PORT = fromEnv('PORT') || 3002;

connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: fromEnv('ALLOWED_ORIGINS')?.split(',') || '*', 
  optionsSuccessStatus: 200
}));

app.use('/api', routes); 

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running at PORT: ${PORT}`);
});

const gracefulShutdown = async () => {
  logger.info('Shutting down gracefully...');
  
  try {
    await agenda.stop();
    logger.info('Agenda stopped successfully');
    
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });
    
    // Force close if hanging
    setTimeout(() => {
      logger.warn('Forcing shutdown...');
      process.exit(1);
    }, 5000);
    
  } catch (err) {
    logger.error('Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);