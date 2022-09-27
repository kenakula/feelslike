import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from 'app/firebase';
import { RecoverPasswordEmailModel, SignInModel } from 'app/models';
import { AuthState, BootState } from 'app/types';
import { CredentialsPayloadAction } from 'app/types/user-credentials-payload';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

interface SliceState {
  bootState: BootState;
  authState: AuthState;
  errorMessage: string;
  errorCode: string;
  user: null | User;
}

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

const initialState: SliceState = {
  bootState: 'none',
  authState: 'NotAuthorized',
  user: null,
  errorCode: '',
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.bootState = 'success';
      state.authState = 'Authorized';
    },
    setUserBootState: (state, action: PayloadAction<BootState>) => {
      state.bootState = action.payload;
    },
    setUserAuthState: (state, action: PayloadAction<AuthState>) => {
      state.authState = action.payload;
    },
  },
  extraReducers: builder => {
    // email and pass
    builder
      .addCase(signInWithEmail.pending, state => {
        state.bootState = 'loading';
      })
      .addCase(
        signInWithEmail.fulfilled,
        (state, action: CredentialsPayloadAction<SignInModel>) => {
          state.bootState = 'success';
          state.authState = 'Authorized';
          state.user = action.payload.user;
        },
      )
      .addCase(
        signInWithEmail.rejected,
        (state, { error: { message, code } }) => {
          state.bootState = 'error';

          if (message && code) {
            state.errorCode = code;
            state.errorMessage = message;
          }
        },
      );
    // google
    builder
      .addCase(signInWithGoogle.pending, state => {
        state.bootState = 'loading';
      })
      .addCase(
        signInWithGoogle.fulfilled,
        (state, action: CredentialsPayloadAction<void>) => {
          state.bootState = 'success';
          state.authState = 'Authorized';
          state.user = action.payload.user;
        },
      )
      .addCase(
        signInWithGoogle.rejected,
        (state, { error: { message, code } }) => {
          state.bootState = 'error';
          state.authState = 'NotAuthorized';

          if (message && code) {
            state.errorCode = code;
            state.errorMessage = message;
          }
        },
      );
    // logout
    builder.addCase(logout.fulfilled, state => {
      state.bootState = 'none';
      state.authState = 'NotAuthorized';
      state.user = null;
    });
    // signup
    builder
      .addCase(signUpWithEmail.pending, state => {
        state.bootState = 'loading';
      })
      .addCase(
        signUpWithEmail.fulfilled,
        (state, action: CredentialsPayloadAction<SignInModel>) => {
          state.bootState = 'success';
          state.authState = 'Authorized';
          state.user = action.payload.user;
        },
      )
      .addCase(
        signUpWithEmail.rejected,
        (state, { error: { message, code } }) => {
          state.bootState = 'error';

          if (message && code) {
            state.errorCode = code;
            state.errorMessage = message;
          }
        },
      );
    builder
      .addCase(resetPasswordEmail.pending, state => {
        state.bootState = 'loading';
      })
      .addCase(resetPasswordEmail.fulfilled, state => {
        state.bootState = 'success';
      })
      .addCase(
        resetPasswordEmail.rejected,
        (state, { error: { message, code } }) => {
          state.bootState = 'error';

          if (message && code) {
            state.errorCode = code;
            state.errorMessage = message;
          }
        },
      );
  },
});

export const { setUserData, setUserAuthState, setUserBootState } =
  userSlice.actions;
