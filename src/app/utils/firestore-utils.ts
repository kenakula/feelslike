import { database } from 'app/firebase';
import { DatabaseCollection } from 'app/types/database-collection';
import { FirebaseError } from 'firebase/app';
import {
  doc,
  DocumentData,
  getDoc,
  setDoc,
  WithFieldValue,
} from 'firebase/firestore';

export const readDocument = async (
  collName: DatabaseCollection,
  docId: string,
): Promise<DocumentData | null> => {
  const reference = doc(database, collName, docId);
  return getDoc(reference).then(value =>
    value.exists() ? value.data() : null,
  );
};

export const addDocument = async <T extends WithFieldValue<DocumentData>>(
  collName: DatabaseCollection,
  data: T,
  docId: string,
): Promise<void> => {
  const reference = doc(database, collName, docId);
  return setDoc(reference, data).catch((err: FirebaseError) => {
    console.error('error when adding document', err);
  });
};
