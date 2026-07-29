/* eslint-disable @typescript-eslint/no-unused-vars */

import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import routes from './app/routes';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(express.static(path.join(__dirname, 'public')));

// console.log(process.env.FRONTEND_URL);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive fallback for dev flexibility
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());

// Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Welcome endpoint for testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome to the PlateShare API',
  });
});

// Handle 404 errors (not found)
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
