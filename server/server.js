import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import projectsRouter from './routes/projects.js';
import videosRouter from './routes/videos.js';
import contactsRouter from './routes/contacts.js';
import thumbnailsRouter from './routes/thumbnails.js';
import contactInfoRouter from './routes/contactInfo.js';

// Initialize database
import './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow frontend URL from environment variable
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:8080',  // Local development
      'http://localhost:5173',  // Vite default port
    ].filter(Boolean); // Remove undefined values

    if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now, can restrict later
    }
  },
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (define before other routes)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/videos', videosRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/thumbnails', thumbnailsRouter);
app.use('/api/contact-info', contactInfoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
