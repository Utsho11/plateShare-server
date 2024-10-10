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

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000/',
  })
);
app.use(cookieParser());

// Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

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
