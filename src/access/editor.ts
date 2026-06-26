import { type AccessArgs } from 'payload';
import type { User } from '@/payload-types';

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const editor: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user && ['admin', 'editor'].includes(user.role));
};
