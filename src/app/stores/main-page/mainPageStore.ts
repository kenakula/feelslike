/* eslint-disable @typescript-eslint/no-explicit-any */
import { nanoid } from 'nanoid';
import { User } from '@firebase/auth';
import { doc, getDoc, Timestamp } from '@firebase/firestore';
import { BootState } from 'app/constants/boot-state';
import { Question } from 'app/constants/types/questions';
import { SecondaryFeel } from 'app/constants/types/secondaryFeel';
import { addJournalNote, queryForDocs } from 'app/utils/firebaseHelpers';
import { makeAutoObservable, runInAction } from 'mobx';
import * as React from 'react';
import { Note } from 'app/constants/types/note';
import { Answer } from 'app/constants/types/answer';
import { FirebaseStorage } from '@firebase/storage';

export class MainPageStore {
  bootState: BootState = BootState.Loading;
  database;
  storage: FirebaseStorage;
  questions: Question[] = [];
  primaryFeels: string[] = [];
  secondaryFeels: SecondaryFeel[] = [];
  selectedPrimaryFeel: string | null;
  selectedSecondaryFeels: string[] | string | null;
  saveNoteBootState: BootState;
  primaryFeelError: boolean;
  secondaryFeelError: boolean;
  note: Note;
  answers: Answer[] = [];

  constructor(database: any, storage: FirebaseStorage) {
    this.database = database;
    this.storage = storage;

    makeAutoObservable(this);
  }

  async saveNoteToDatabase(user: User, callback: any) {
    try {
      await addJournalNote(this.database, user.uid, this.note, this.note.id);
      callback(true);
    } catch (err) {
      console.log('failed to save: ', err);
    }
  }

  makeNote(): void {
    if (!this.selectedPrimaryFeel) {
      this.primaryFeelError = true;
      return;
    }

    if (!this.selectedSecondaryFeels) {
      this.secondaryFeelError = true;
      return;
    }

    this.note = {
      primaryFeel: this.selectedPrimaryFeel,
      secondaryFeels: this.selectedSecondaryFeels,
      answers: this.answers,
      date: Timestamp.now(),
      id: nanoid(),
    };
  }

  pushAnswer(answer: Answer) {
    this.answers.push(answer);
  }

  get getPrimaryFeel() {
    return this.selectedPrimaryFeel;
  }

  setPrimaryFeel(feel: string) {
    this.selectedPrimaryFeel = feel;
  }

  get getSecondaryFeels() {
    return this.selectedSecondaryFeels;
  }

  setSecondaryFeels(feels: string[] | string) {
    this.selectedSecondaryFeels = feels;
  }

  get getNoteBootState() {
    return this.saveNoteBootState;
  }

  setNoteBootState(state: BootState) {
    this.saveNoteBootState = state;
  }

  get getBootState() {
    return this.bootState;
  }

  async getQuestions() {
    try {
      const querySnapShot = await queryForDocs(this.database, 'questions');
      runInAction(() => {
        querySnapShot.forEach((snap: any) => {
          const dataObj = { id: snap.id, text: snap.data().text };
          this.questions.push(dataObj);
        });
      });
    } catch (err) {
      console.log(err);
      this.setBootState(BootState.Error);
    }
  }

  get getQuestionsData() {
    return this.questions;
  }

  async getFeels() {
    try {
      const primaryFeelsRef = doc(this.database, 'feels', 'primary');
      const primaryFeelsSnap = await getDoc(primaryFeelsRef);

      if (primaryFeelsSnap.exists()) {
        const data = primaryFeelsSnap.data();
        runInAction(() => {
          this.primaryFeels = data.list;
        });
      } else {
        console.log('No such document!');
      }

      const secondaryFeelsRef = doc(this.database, 'feels', 'secondary');
      const secondaryFeelsSnap = await getDoc(secondaryFeelsRef);

      if (secondaryFeelsSnap.exists()) {
        const data = secondaryFeelsSnap.data();
        runInAction(() => {
          this.secondaryFeels = data.list;
        });
      } else {
        console.log('no such document');
      }
    } catch (err) {
      console.log(err);
      this.setBootState(BootState.Error);
    }
  }

  private setBootState(state: BootState) {
    this.bootState = state;
  }

  public async init() {
    await this.getQuestions();
    await this.getFeels();
    this.setBootState(BootState.Success);
  }
}

export const MainPageStoreContext = React.createContext<
  MainPageStore | undefined
>(undefined);
