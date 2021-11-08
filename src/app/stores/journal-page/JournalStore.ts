/* eslint-disable @typescript-eslint/no-explicit-any */
import { getJournalNotes } from './../../utils/firebaseHelpers';
import { MainPageStore } from './../main-page/mainPageStore';
import { BootState } from 'app/constants/boot-state';
import React from 'react';
import { makeAutoObservable } from 'mobx';
import { User } from '@firebase/auth';
import { Note } from 'app/constants/types/note';

// TODO группировка по дате

// TODO опустошать поля ввода после сохранения
// TODO иконки эмоций
// TODO валидация формы

export class JournalStore {
  mainPageStore: MainPageStore;
  bootState: BootState = BootState.Loading;
  notesList: Note[] = [];

  constructor(mainPageStore: MainPageStore) {
    this.mainPageStore = mainPageStore;

    makeAutoObservable(this);
  }

  get isInited() {
    return this.bootState === BootState.Success;
  }

  setNotes(notes: Note[]) {
    this.notesList = notes;
  }

  async fetchNotes(user: User | undefined) {
    if (user) {
      try {
        const notes = await getJournalNotes(
          this.mainPageStore.database,
          user.displayName,
        );
        this.setNotes(notes);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async init() {
    if (this.isInited) return;
    this.bootState = BootState.Success;
  }
}

export const JournalStoreContext = React.createContext<
  JournalStore | undefined
>(undefined);
