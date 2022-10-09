import {
  deleteDeepDocument,
  getDocumentsFromDeepCollection,
  readDocument,
  writeDocToDeepCollection,
} from 'app/firebase';
import { makeAutoObservable, runInAction } from 'mobx';
import { BootState } from 'app/shared/types';
import { FeelsModel, NoteModel } from 'app/models';
import { DatabaseCollection } from 'app/shared/types/database-collection';
import { NoteType } from 'app/shared/types/note-types';

export class NotesStore {
  public modalOpen = false;
  public bootState: BootState = 'none';
  public processing = false;
  public notes: NoteModel[] = [];
  public feels: FeelsModel | null = null;
  public editorNoteType: NoteType = 'feel';
  public editorNoteDate: Date = new Date();
  public selectedNote: NoteModel | null = null;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  public init = async (): Promise<void> => {
    await this.getFeels();
  };

  public getNotes = async (userId: string): Promise<void> => {
    this.bootState = 'loading';

    getDocumentsFromDeepCollection<NoteModel>(DatabaseCollection.Users, [
      userId,
      'Journal',
    ])
      .then(value => {
        runInAction(() => {
          this.notes = value;
          this.bootState = 'success';
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

  public setSelectedNote = (value: NoteModel | null): void => {
    this.selectedNote = value;
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
