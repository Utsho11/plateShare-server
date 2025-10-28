export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
} as const;

export const USER_TYPE = {
  REGULAR: 'REGULAR',
  PREMIUM: 'PREMIUM',
} as const;

export const UserSearchableFields = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'role',
  'status',
];
