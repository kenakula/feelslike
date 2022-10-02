import { auth } from 'app/firebase';
import React from 'react';
import { AuthStore } from './auth-store';
import { NotesStore } from './notes-store';

export class RootStore {
  public authStore: AuthStore;
  public notesStore: NotesStore;

  constructor() {
    this.authStore = new AuthStore(auth);
    this.notesStore = new NotesStore();
  }
}

export const RootStoreContext = React.createContext<RootStore>(new RootStore());
export const useRootStore = (): RootStore => React.useContext(RootStoreContext);
