import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FirestoreError,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from 'firebase/firestore';
import { DatabaseCollection } from './types/database-collection';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_DOMAIN,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);
const auth = getAuth();
auth.useDeviceLanguage();

const writeDocument = async (
  collName: DatabaseCollection,
  data: any,
  docId: string,
): Promise<void> => {
  const ref = doc(database, collName, docId);
  return setDoc(ref, data).catch((error: FirestoreError) => {
    console.error(error.message);
  });
};

const readDocument = async (
  collName: DatabaseCollection,
  docId: string,
): Promise<void | DocumentData | undefined> => {
  const reference = doc(database, collName, docId);
  return getDoc(reference).catch((err: FirestoreError) => {
    console.error('error when getting document', err);
  });
};

const deleteDeepDocument = async (
  collName: DatabaseCollection,
  pathSegements: string[],
  docId: string,
): Promise<void> => {
  const reference = doc(database, collName, ...pathSegements, docId);

  return deleteDoc(reference).catch((err: FirestoreError) => {
    console.error('error when deleting document', err);
  });
};

const getDocumentsFormCollection = async <T>(
  collName: DatabaseCollection,
): Promise<T[]> => {
  const result: T[] = [];
  const q = query(collection(database, collName));

  const snapShot = await getDocs(q);

  snapShot.forEach((document: DocumentData) => {
    result.push(document.data());
  });

  return result;
};

const writeDocToDeepCollection = async (
  collName: DatabaseCollection,
  pathSegements: string[],
  docId: string,
  data: any,
): Promise<void> => {
  const reference = doc(database, collName, ...pathSegements, docId);

  return setDoc(reference, data).catch((err: FirebaseError) => {
    console.error('error when adding document', err);
  });
};

const getDocumentsFromDeepCollection = async <T>(
  collName: DatabaseCollection,
  pathSegments: string[],
): Promise<T[]> => {
  const result: T[] = [];
  const collRef = collection(database, collName, ...pathSegments);
  const snapShot = await getDocs(collRef);

  snapShot.forEach((document: DocumentData) => {
    result.push(document.data());
  });

  return result;
};

export {
  auth,
  database,
  getDocumentsFromDeepCollection,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getDocumentsFormCollection,
  writeDocToDeepCollection,
  onAuthStateChanged,
  deleteDeepDocument,
  updateProfile,
  writeDocument,
  readDocument,
  signOut,
};
