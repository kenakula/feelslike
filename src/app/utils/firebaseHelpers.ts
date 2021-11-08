/* eslint-disable @typescript-eslint/no-explicit-any */
import { Note } from 'app/constants/types/note';
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
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
  // list.forEach((item: any) => {
  //   setDoc(doc(database, "feels", item.id), {
  //     name: item.name,
  //     list: [...item.list],
  //   });
  // });
};

export const getDocument = async (
  db: any,
  collection: string,
  name: string,
) => {
  const docRef = doc(db, collection, name);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    console.log('No such document!');
  }
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
  userName: string | null,
  data: any,
  noteTitle: string,
) => {
  if (userName) {
    const docRef = doc(db, 'users', userName, 'journal', noteTitle);
    await setDoc(docRef, data);
  }
};

export const getJournalNotes = async (db: any, userName: string | null) => {
  const result: Note[] = [];

  if (userName) {
    const docRef = collection(db, `users/${userName}/journal`);
    const docsSnapshot = await getDocs(docRef);

    docsSnapshot.forEach((doc: any) => {
      result.push(doc.data());
    });
  }

  return result;
};
