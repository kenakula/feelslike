import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInModel } from 'app/models';
import { AuthState, BootState } from 'app/types';
import { CredentialsPayloadAction } from 'app/types/user-credentials-payload';
import { User } from 'firebase/auth';
import {
  logout,
  resetPasswordEmail,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from './thunks';

interface SliceState {
  bootState: BootState;
  authState: AuthState;
  errorMessage: string;
  errorCode: string;
  user: null | User;
}

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
    // recover password email
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
