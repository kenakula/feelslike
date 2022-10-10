import {
  collection,
  database,
  deleteDeepDocument,
  getDocumentsByQuery,
  getDocumentsFromDeepCollection,
  query,
  readDocument,
  where,
  writeDocToDeepCollection,
} from 'app/firebase';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  BootState,
  DatabaseCollection,
  DatabaseSubSollection,
  NoteType,
} from 'app/shared/types';
import { FeelsModel, NoteModel } from 'app/models';

export class NotesStore {
  public modalOpen = false;
  public bootState: BootState = 'none';
  public processing = false;
  public notes: NoteModel[] = [];
  public feels: FeelsModel | null = null;
  public editorNoteType: NoteType = 'feel';
  public editorNoteDate: Date = new Date();

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  public init = async (): Promise<void> => {
    await this.getFeels();
  };

  public getNotesByMonth = async (
    userId: string,
    currentDate: Date,
  ): Promise<void> => {
    this.bootState = 'loading';

    const pastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
    );

    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 2,
      currentDate.getDate() - 1,
    );

    const colRef = collection(
      database,
      DatabaseCollection.Users,
      userId,
      DatabaseSubSollection.Journal,
    );

    const notesQuery = query(
      colRef,
      where('date', '>', pastMonth),
      where('date', '<', nextMonth),
    );

    getDocumentsByQuery<NoteModel>(notesQuery)
      .then(result => {
        runInAction(() => {
          this.notes = result;
          this.bootState = 'success';
          this.processing = false;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.bootState = 'error';
          this.processing = false;
        });
      });
  };

  public getNotes = async (userId: string): Promise<void> => {
    this.bootState = 'loading';

    getDocumentsFromDeepCollection<NoteModel>(DatabaseCollection.Users, [
      userId,
      DatabaseSubSollection.Journal,
    ])
      .then(value => {
        runInAction(() => {
          this.notes = value;
          this.bootState = 'success';
          this.processing = false;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.bootState = 'error';
          this.processing = false;
        });
      });
  };

  public getFeels = async (): Promise<void> => {
    readDocument(DatabaseCollection.Assets, 'Feels').then(value => {
      if (value) {
        runInAction(() => {
          this.feels = value.data() as FeelsModel;
        });
      }
    });
  };

  public saveNote = async (note: NoteModel, userId: string): Promise<void> => {
    runInAction(() => {
      this.bootState = 'loading';
      this.processing = true;
    });

    writeDocToDeepCollection(
      DatabaseCollection.Users,
      [userId, 'Journal'],
      note.id,
      note,
    )
      .then(() => {
        runInAction(() => {
          this.bootState = 'success';
          this.processing = false;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.bootState = 'error';
          this.processing = false;
        });
      });
  };

  public deleteNote = async (noteId: string, userId: string): Promise<void> => {
    runInAction(() => {
      this.bootState = 'loading';
      this.processing = true;
    });

    deleteDeepDocument(DatabaseCollection.Users, [userId, 'Journal'], noteId)
      .then(() => {
        runInAction(() => {
          this.bootState = 'success';
          this.processing = false;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.bootState = 'error';
          this.processing = false;
        });
      });
  };

  public setModalState = (value: boolean): void => {
    this.modalOpen = value;
  };

  public setEditorType = (type: NoteType): void => {
    this.editorNoteType = type;
  };

  public setEditorDate = (date: Date): void => {
    this.editorNoteDate = date;
  };
}
