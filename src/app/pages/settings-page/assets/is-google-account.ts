import { User } from 'firebase/auth';

export const isGoogleAccount = (user: User): boolean | null =>
  user.providerData[0].providerId === 'google.com';
