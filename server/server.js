import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import apiRouter from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:3001')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin) || process.env.VERCEL) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    }
  })
);
app.use(express.json());

// Ensure MongoDB is connected (cached across serverless invocations)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api', apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Server] Royella API running on http://localhost:${PORT}`);
  });
}

export default app;
