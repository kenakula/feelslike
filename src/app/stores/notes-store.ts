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
  DatabaseSubCollection,
  FilterParams,
  NoteType,
} from 'app/shared/types';
import { FeelsModel, NoteModel } from 'app/models';
import {
  CollectionReference,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore';
import { noteTypesOptions } from 'app/shared';

const DEFAULT_FILTER: FilterParams = {
  type: 'all',
  order: 'desc',
};

export class NotesStore {
  public modalOpen = false;
  public bootState: BootState = 'none';
  public processing = false;
  public notes: NoteModel[] = [];
  public feels: FeelsModel | null = null;
  public editorNoteType: NoteType = 'feel';
  public editorNoteDate: Date = new Date();
  public notesCursor: QueryDocumentSnapshot<DocumentData> | null = null;
  public hasMoreNotes = true;
  public journalFilter = DEFAULT_FILTER;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  public init = async (): Promise<void> => {
    await this.getFeels();
  };

  public setJournalFilter = (data: Partial<FilterParams>): void => {
    this.journalFilter = {
      ...this.journalFilter,
      ...data,
    };
  };

  public filterJournalNotes = (userId: string): void => {
    runInAction(() => {
      this.notes = [];
      this.hasMoreNotes = true;
      this.notesCursor = null;
      this.processing = false;
    });

    this.getNotesFirstBatch(userId);
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
      DatabaseSubCollection.Journal,
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

  public hasMore = async (
    collRef: CollectionReference<DocumentData>,
  ): Promise<void> => {
    const noteType =
      this.journalFilter.type === 'all'
        ? noteTypesOptions.map(type => type.value)
        : [this.journalFilter.type];
    const q = query(
      collRef,
      where('type', 'in', noteType),
      orderBy('date', this.journalFilter.order),
    );
    const snapshot = await getDocs(q);

    runInAction(() => {
      this.hasMoreNotes = snapshot.docs.length > this.notes.length;
    });
  };

  public getNotesFirstBatch = async (userId: string): Promise<void> => {
    this.bootState = 'loading';
    this.notes = [];
    const noteType =
      this.journalFilter.type === 'all'
        ? noteTypesOptions.map(type => type.value)
        : [this.journalFilter.type];

    const collRef = collection(
      database,
      DatabaseCollection.Users,
      userId,
      DatabaseSubCollection.Journal,
    );
    const queryFirst = query(
      collRef,
      where('type', 'in', noteType),
      orderBy('date', this.journalFilter.order),
      limit(5),
    );

    getDocs(queryFirst).then(snapshot => {
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const result: NoteModel[] = [];

      snapshot.forEach(s => {
        result.push(s.data() as NoteModel);
      });

      runInAction(() => {
        this.bootState = 'success';
        this.notesCursor = lastVisible;
        this.notes = result;
      });

      this.hasMore(collRef);
    });
  };

  public getNotesNextBatch = async (userId: string): Promise<void> => {
    this.processing = true;
    const noteType =
      this.journalFilter.type === 'all'
        ? noteTypesOptions.map(type => type.value)
        : [this.journalFilter.type];

    const collRef = collection(
      database,
      DatabaseCollection.Users,
      userId,
      DatabaseSubCollection.Journal,
    );

    const queryNext = query(
      collRef,
      where('type', 'in', noteType),
      orderBy('date', this.journalFilter.order),
      startAfter(this.notesCursor),
      limit(5),
    );

    getDocs(queryNext).then(snapshot => {
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const result: NoteModel[] = [];

      snapshot.forEach(s => {
        result.push(s.data() as NoteModel);
      });

      runInAction(() => {
        this.processing = false;
        this.notesCursor = lastVisible;
        this.notes = this.notes.concat(result);
      });

      this.hasMore(collRef);
    });
  };

  public getNotes = async (userId: string): Promise<void> => {
    this.bootState = 'loading';

    getDocumentsFromDeepCollection<NoteModel>(DatabaseCollection.Users, [
      userId,
      DatabaseSubCollection.Journal,
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
