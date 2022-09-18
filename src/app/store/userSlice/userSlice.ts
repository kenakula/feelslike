import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from 'app/firebase';
import { SignInModel } from 'app/models';
import { AuthState, BootState } from 'app/types';
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

interface SliceState {
  bootState: BootState;
  authState: AuthState;
  errorMessage: string;
  errorCode: string;
  user: null | User;
}

export const signInWithEmail = createAsyncThunk(
  'user/signInWithEmail',
  async ({ email, password }: SignInModel, thunkApi) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  await signOut(auth);
});

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
    builder
      .addCase(signInWithEmail.pending, state => {
        state.bootState = 'loading';
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.bootState = 'success';
        state.user = action.payload.user;
      })
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
    builder.addCase(logout.fulfilled, state => {
      state.bootState = 'none';
      state.user = null;
    });
  },
});

export const { setUserData, setUserAuthState, setUserBootState } =
  userSlice.actions;
