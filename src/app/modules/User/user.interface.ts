import { Model } from 'mongoose';
import { USER_ROLE, USER_STATUS, type USER_TYPE } from './user.constant';

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  location?: string;
  mobileNumber?: string;
  profilePhoto?: string;
  status: keyof typeof USER_STATUS;
  role: keyof typeof USER_ROLE;
  type: keyof typeof USER_TYPE;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

/*
"firstName":"Utsho",
"lastName":"Roy",
"email":"utshoroy521@gmail.com",
"password":"123456",
"age":25,
"location":"Dhaka",
"mobileNumber":"01521793531"
*/
