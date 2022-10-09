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
  updateDoc,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  StorageError,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';
import { DatabaseCollection } from './shared/types';

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
const storage = getStorage(firebaseApp);
const auth = getAuth();
auth.useDeviceLanguage();

const writeDocument = async (
  collName: DatabaseCollection,
  data: any,
  docId: string,
): Promise<void> => {
  const reference = doc(database, collName, docId);
  return setDoc(reference, data).catch((error: FirestoreError) => {
    console.error(error.message);
  });
};

const updateDocument = async (
  collName: DatabaseCollection,
  docId: string,
  data: any,
): Promise<void> => {
  const reference = doc(database, collName, docId);

  return updateDoc(reference, data).catch(err =>
    console.error('document update error: ', err),
  );
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

const deleteFile = async (path: string): Promise<void> => {
  const fileRef = ref(storage, path);

  return deleteObject(fileRef).catch((err: StorageError) => {
    console.error(err);
  });
};

const getFileUrl = async (path: string): Promise<string> => {
  const fileRef = ref(storage, path);
  const url = await getDownloadURL(fileRef);

  return url;
};

const uploadFile = async (
  path: string,
  file: File,
): Promise<UploadResult | void> => {
  const fileRef = ref(storage, path);

  return uploadBytes(fileRef, file).catch((err: StorageError) => {
    console.error(err);
  });
};

export {
  auth,
  storage,
  database,
  getDocumentsFromDeepCollection,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getDocumentsFormCollection,
  writeDocToDeepCollection,
  onAuthStateChanged,
  deleteDeepDocument,
  updateDocument,
  updateProfile,
  writeDocument,
  readDocument,
  deleteFile,
  getFileUrl,
  uploadFile,
  signOut,
};
