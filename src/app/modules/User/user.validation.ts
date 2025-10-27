import { z } from 'zod';
import { USER_ROLE, USER_STATUS, USER_TYPE } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    role: z.nativeEnum(USER_ROLE).optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    status: z.nativeEnum(USER_STATUS).optional(),
    type: z.nativeEnum(USER_TYPE).optional(),
    mobileNumber: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    status: z.nativeEnum(USER_STATUS).optional(),
    type: z.nativeEnum(USER_TYPE).optional(),
    mobileNumber: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
