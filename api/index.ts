import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import app from '../src/app';
import config from '../src/app/config';
import { seed } from '../src/app/utils/seeding';

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  if (config.db_url) {
    await mongoose.connect(config.db_url as string);
    isConnected = true;
    console.log('🛢 MongoDB connected successfully for Vercel Serverless');
    await seed();
  }
}

export default async function handler(req: Request, res: Response) {
  await connectDB();
  return app(req, res);
}
