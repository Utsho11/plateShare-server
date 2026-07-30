/* eslint-disable no-console */
import config from '../config';
import {
  USER_ROLE,
  USER_STATUS,
  USER_TYPE,
} from '../modules/User/user.constant';
import { User } from '../modules/User/user.model';

export const seed = async () => {
  try {
    const adminEmail = config.admin_email || 'admin@gmail.com';
    const adminPassword = config.admin_password || 'password123';

    // 1. Seed Demo Admin
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      console.log('Seeding demo admin account...');
      await User.create({
        name: 'Demo Admin',
        role: USER_ROLE.ADMIN,
        email: adminEmail,
        password: adminPassword,
        profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        mobileNumber: '01700000000',
        status: USER_STATUS.ACTIVE,
        type: USER_TYPE.PREMIUM,
      });
      console.log(`Demo Admin created (${adminEmail})`);
    }

    // 2. Seed Demo User
    const demoUserEmail = 'user@gmail.com';
    const userExists = await User.findOne({ email: demoUserEmail });
    if (!userExists) {
      console.log('Seeding demo user account...');
      await User.create({
        name: 'Demo User',
        role: USER_ROLE.USER,
        email: demoUserEmail,
        password: 'password123',
        profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        mobileNumber: '01800000000',
        status: USER_STATUS.ACTIVE,
        type: USER_TYPE.REGULAR,
      });
      console.log(`Demo User created (${demoUserEmail})`);
    }
  } catch (error) {
    console.log('Error in seeding demo accounts:', error);
  }
};
