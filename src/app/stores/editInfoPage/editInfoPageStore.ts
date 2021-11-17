/* eslint-disable @typescript-eslint/no-explicit-any */
import { BootState } from './../../constants/boot-state';
import React from 'react';
import { FirebaseStorage } from '@firebase/storage';
import { makeAutoObservable } from 'mobx';
import { updateProfile, User } from '@firebase/auth';

export class EditInfoPageStore {
  storage: FirebaseStorage;
  avatarUrl: string;
  bootState = BootState.None;
  imageLoading = BootState.None;

  constructor(storage: FirebaseStorage) {
    this.storage = storage;

    makeAutoObservable(this);
  }

  async updateName(user: User, newName: string) {
    try {
      await updateProfile(user, {
        displayName: newName,
      });
      console.log('name updated');
    } catch (error) {
      console.log(error);
    }
  }

  async init() {
    this.bootState = BootState.Success;
  }
}

export const EditInfoPageStoreContext = React.createContext<
  EditInfoPageStore | undefined
>(undefined);
