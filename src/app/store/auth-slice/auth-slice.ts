import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { auth, database } from 'app/firebase';
import { SignInModel, UserModel } from 'app/models';
import { AuthState, BootState } from 'app/types';
import { DatabaseCollection } from 'app/types/database-collection';
import { CredentialsPayloadAction } from 'app/types/user-credentials-payload';
import { addDocument } from 'app/utils';
import { userModelConverter } from 'app/utils/firestore-converters';
import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface SliceState {
  bootState: BootState;
  authState: AuthState;
  error: string | null;
  currentUser: null | User;
}

const initialState: SliceState = {
  bootState: 'none',
  authState: 'NotAuthorized',
  currentUser: null,
  error: null,
};

interface ThunkRejectValue {
  error: string;
}

const getUserModel = ({
  uid,
  displayName,
  email,
  photoURL,
}: User): UserModel => ({
  uid,
  email: email ?? '',
  name: displayName ?? 'Неопознанный енот',
  profileImage: photoURL ?? '',
});

export const signUpWithEmail = createAsyncThunk<
  UserModel,
  SignInModel,
  { rejectValue: ThunkRejectValue }
>(
  'auth/signUpWithEmail',
  async ({ email, password }: SignInModel, { rejectWithValue }) => {
    let result: UserModel;
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const docref = doc(
      database,
      DatabaseCollection.Users,
      response.user.uid,
    ).withConverter(userModelConverter);

    getDoc(docref)
      .then(snapshot => {
        if (!snapshot.exists()) {
          addDocument(
            DatabaseCollection.Users,
            getUserModel(response.user),
            response.user.uid,
          );
        }
      })
      .catch(err => {
        rejectWithValue({ error: err.message });
      });
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: () => initialState,
    setAuthState: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUpWithEmail.pending, state => {
        state.bootState = 'loading';
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.bootState = 'error';
        console.error(action.payload);
      });
  },
});

export const { resetAuthState, setAuthState } = authSlice.actions;
