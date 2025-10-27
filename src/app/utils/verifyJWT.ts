/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import type { Types } from 'mongoose';

// _id: user._id,
//     name: user.name,
//     email: user.email,
//     mobileNumber: user.mobileNumber,
//     role: user.role,
//     status: user.status,

export type TJwtPayload = {
  id: Types.ObjectId;
  name: string;
  email: string;
  mobileNumber?: string | undefined;
  role: 'ADMIN' | 'USER';
  status: 'ACTIVE' | 'BLOCKED';
};

export const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    console.log(error);

    throw new AppError(401, 'You are not authorized!');
  }
};
