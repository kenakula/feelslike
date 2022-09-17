import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { firebaseSlice } from './firebase';

export const store = configureStore({
  reducer: {
    firebase: firebaseSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
