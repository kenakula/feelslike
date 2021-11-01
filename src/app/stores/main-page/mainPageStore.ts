/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, getDoc } from "@firebase/firestore";
import { BootState } from "app/constants/boot-state";
import { Question } from "app/constants/types/questions";
import { SecondaryFeel } from "app/constants/types/secondaryFeel";
import { queryForDocs } from "app/utils/firebaseHelpers";
import { makeAutoObservable, runInAction } from "mobx";
import * as React from "react";

export class MainPageStore {
  bootState: BootState = BootState.Loading;
  database;
  questions: Question[] = [];
  primaryFeels: string[] = [];
  secondaryFeels: SecondaryFeel[] = [];

  constructor(database: any) {
    this.database = database;

    makeAutoObservable(this);
  }

  get getBootState() {
    return this.bootState;
  }

  async getQuestions() {
    try {
      const querySnapShot = await queryForDocs(this.database, "questions");
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
      const primaryFeelsRef = doc(this.database, "feels", "primary");
      const primaryFeelsSnap = await getDoc(primaryFeelsRef);

      if (primaryFeelsSnap.exists()) {
        const data = primaryFeelsSnap.data();
        runInAction(() => {
          this.primaryFeels = data.list;
        });
      } else {
        console.log("No such document!");
      }

      const secondaryFeelsRef = doc(this.database, "feels", "secondary");
      const secondaryFeelsSnap = await getDoc(secondaryFeelsRef);

      if (secondaryFeelsSnap.exists()) {
        const data = secondaryFeelsSnap.data();
        runInAction(() => {
          this.secondaryFeels = data.list;
        });
      } else {
        console.log("no such document");
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
