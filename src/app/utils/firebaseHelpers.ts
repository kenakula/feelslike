/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddedNote, Note } from 'app/constants/types/note';
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
  orderBy,
} from 'firebase/firestore';

export const readDocument = async (doc: any) => {
  const snapShot = await getDoc(doc);
  if (snapShot.exists()) {
    const data: any = snapShot.data();
    console.log(`my data - ${JSON.stringify(data.milk)}`);
  } else {
    console.log('no data');
  }
};

export const queryForDocs = async (database: any, collectionString: any) => {
  const queryDocs = query(collection(database, collectionString));
  const querySnapShot = await getDocs(queryDocs);

  return querySnapShot;
};

export const addData = async (database: any, obj: any) => {
  console.log(obj);
  setDoc(doc(database, 'feels', 'secondary'), {
    name: 'secondary',
    list: [...obj],
  });
};

export const addDocument = async (
  db: any,
  collection: string,
  name: string,
  data: any,
) => {
  await setDoc(doc(db, collection, name), data);
};

export const searchForUser = (db: any, id: string) => {
  const usersRef = collection(db, 'usesrs');
  const q = query(usersRef, where('uid', '==', id));
  console.log(q);
};

export const addJournalNote = async (
  db: any,
  userId: string | null,
  data: any,
  noteTitle: string,
) => {
  if (userId) {
    const docRef = doc(db, 'users', userId, 'journal', noteTitle);
    await setDoc(docRef, data);
  }
};

export const getJournalNotes = async (
  db: any,
  userId: string | null,
  limitAmount: number,
) => {
  const result: Note[] = [];
  console.log('limit notes: ', limitAmount);

  if (userId) {
    const ref = collection(db, `users/${userId}/journal`);
    const q = query(ref, orderBy('date'));
    const snap = await getDocs(q);
    snap.forEach((doc: any) => {
      result.push(doc.data());
    });
  }

  return result;
};

export const addJournalNoteAditionalNote = async (
  db: any,
  userId: string | null,
  data: AddedNote,
  noteId: string,
  addedNoteId: string,
) => {
  if (userId) {
    const docRef = doc(
      db,
      'users',
      userId,
      'journal',
      noteId,
      'notes',
      addedNoteId,
    );
    await setDoc(docRef, data);
  }
};

export const getDocumentData = async (
  db: any,
  userId: string | undefined,
  noteId: string,
) => {
  if (userId) {
    const docRef = doc(db, 'users', userId, 'journal', noteId);
    const docSnap = getDoc(docRef);

    console.log((await docSnap).data());
  }
};

export const getAddedNotes = async (
  db: any,
  userId: string | null,
  noteId: string,
) => {
  const result: AddedNote[] = [];

  if (userId) {
    const docRef = collection(db, `users/${userId}/journal/${noteId}/notes`);
    const docsSnap = await getDocs(docRef);

    docsSnap.forEach((doc: any) => {
      result.push(doc.data());
    });

    return result;
  }
};
