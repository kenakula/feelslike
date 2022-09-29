import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  doc,
  DocumentData,
  FirestoreError,
  getDoc,
  getFirestore,
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

export {
  auth,
  database,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  writeDocument,
  readDocument,
};
