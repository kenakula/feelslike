import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from 'app/models';
import { BootState } from 'app/types';

interface SliceState {
  userInfo: UserModel | null;
  bootState: BootState;
  errorMessage: string;
  errorCode: string;
}

const initialState: SliceState = {
  userInfo: null,
  bootState: 'none',
  errorCode: '',
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
});

export const { resetUserState } = userSlice.actions;
