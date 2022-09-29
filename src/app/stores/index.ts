import { auth } from 'app/firebase';
import React from 'react';
import { AuthStore } from './auth-store';

export class RootStore {
  public authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(auth);
  }
}

export const RootStoreContext = React.createContext<RootStore>(new RootStore());
export const useRootStore = (): RootStore => React.useContext(RootStoreContext);
