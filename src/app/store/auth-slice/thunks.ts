import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecoverPasswordEmailModel, SignInModel, UserModel } from 'app/models';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { auth } from 'app/firebase';
import { addDocument, readDocument } from 'app/utils';
import { DatabaseCollection } from 'app/types/database-collection';

const googleProvider = new GoogleAuthProvider();

const saveNewUser = (credentials: UserCredential): void => {
  readDocument(DatabaseCollection.Users, credentials.user.uid).then(res => {
    if (!res) {
      const userDoc: UserModel = {
        name: credentials.user.displayName ?? 'Неопознанный Енот',
        uid: credentials.user.uid,
        email: credentials.user.email ?? '',
        profileImage: credentials.user.photoURL ?? '',
      };

      addDocument<UserModel>(
        DatabaseCollection.Users,
        userDoc,
        credentials.user.uid,
      );
    }
  });
};

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password }: SignInModel) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      credentials => {
        saveNewUser(credentials);
        return credentials;
      },
    );
  },
);

export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }: SignInModel) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithPopup',
  async () => {
    return signInWithPopup(auth, googleProvider).then(credentials => {
      saveNewUser(credentials);
      return credentials;
    });
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

export const resetPasswordEmail = createAsyncThunk(
  'auth/resetPasswordEmail',
  async ({ email }: RecoverPasswordEmailModel) => {
    return sendPasswordResetEmail(auth, email);
  },
);
