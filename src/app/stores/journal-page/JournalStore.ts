/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addJournalNoteAditionalNote,
  getJournalNotes,
  getAddedNotes,
} from 'app/utils/firebaseHelpers';
import { MainPageStore } from './../main-page/mainPageStore';
import { BootState } from 'app/constants/boot-state';
import React from 'react';
import { makeAutoObservable } from 'mobx';
import { User } from '@firebase/auth';
import { AddedNote, Note } from 'app/constants/types/note';

// TODO опустошать поля ввода после сохранения
// TODO валидация формы
// TODO аутентификация гугл и фейсбук
// TODO добавить пагинацию

export class JournalStore {
  mainPageStore: MainPageStore;
  bootState: BootState = BootState.Loading;
  notesList: Note[] = [];
  commentNotesList: AddedNote[] | undefined = [];

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

  setCommentNotes(notes: AddedNote[] | undefined) {
    this.commentNotesList = notes;
  }

  async fetchCommentNotes(user: User | undefined, noteId: string) {
    if (user) {
      try {
        const notes = await getAddedNotes(
          this.mainPageStore.database,
          user.uid,
          noteId,
        );
        this.setCommentNotes(notes);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async fetchNotes(user: User | undefined) {
    if (user) {
      try {
        const notes = await getJournalNotes(
          this.mainPageStore.database,
          user.uid,
          3,
        );
        this.setNotes(notes);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async addCommentNote(
    user: User | undefined,
    data: AddedNote,
    journalNoteId: string,
    commentId: string,
  ) {
    if (user) {
      try {
        await addJournalNoteAditionalNote(
          this.mainPageStore.database,
          user.uid,
          data,
          journalNoteId,
          commentId,
        );
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
