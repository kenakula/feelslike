import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecoverPasswordEmailModel, SignInModel } from 'app/models';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from 'app/firebase';

const googleProvider = new GoogleAuthProvider();

export const signUpWithEmail = createAsyncThunk(
  'user/signUpWithEmail',
  async ({ email, password }: SignInModel) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },
);

export const signInWithEmail = createAsyncThunk(
  'user/signInWithEmail',
  async ({ email, password }: SignInModel) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
);

export const signInWithGoogle = createAsyncThunk(
  'user/signInWithPopup',
  async () => {
    return signInWithPopup(auth, googleProvider);
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  await signOut(auth);
});

export const resetPasswordEmail = createAsyncThunk(
  'user/resetPasswordEmail',
  async ({ email }: RecoverPasswordEmailModel) => {
    return sendPasswordResetEmail(auth, email);
  },
);
