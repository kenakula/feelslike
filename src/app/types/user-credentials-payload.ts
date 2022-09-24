import { PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';

export type CredentialsPayloadAction<T> = PayloadAction<
  UserCredential,
  string,
  {
    arg: T;
    requestId: string;
    requestStatus: 'fulfilled';
  },
  never
>;
