/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthorizedStates } from 'app/constants/authStates';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { addDocument } from 'app/utils/firebaseHelpers';

export interface ISignUpData {
  login: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export class LoginPageStore {
  inited: boolean;
  currentUser: User;
  authState: AuthorizedStates = AuthorizedStates.None;
  firebaseAuth: Auth;
  database;

  constructor(database: any) {
    this.database = database;

    makeAutoObservable(this);
  }

  get isAuthorized(): boolean {
    return this.authState === AuthorizedStates.Authorized;
  }

  setAuthState(state: AuthorizedStates): void {
    this.authState = state;
  }

  signUp(data: ISignUpData) {
    createUserWithEmailAndPassword(this.firebaseAuth, data.email, data.password)
      .then(userCredential => {
        const user = userCredential.user;
        addDocument(this.database, 'users', data.login, {
          uid: user.uid,
          name: data.login,
          authProvider: 'local',
          email: user.email,
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode:', errorCode);
        console.log('errorMessage:', errorMessage);
      });
  }

  signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(userCredential => {
        console.log(userCredential);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode:', errorCode);
        console.log('errorMessage:', errorMessage);
      });
  }

  signOut() {
    this.firebaseAuth.signOut();
  }

  async init() {
    this.firebaseAuth = getAuth();
    this.firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.setAuthState(AuthorizedStates.Authorized);
      } else {
        this.setAuthState(AuthorizedStates.NotAuthorized);
      }
    });
    this.inited = true;
  }
}

export const LoginPageStoreContext = createContext<LoginPageStore | undefined>(
  undefined,
);
