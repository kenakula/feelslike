/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useState, useEffect } from 'react';
import { addDocument } from 'app/utils/firebaseHelpers';
import {
  getAuth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { MainPageStoreContext } from '../main-page/mainPageStore';

type ContextProps = {
  auth: any;
  currentUser: User;
  login: any;
  signup: any;
  logout: any;
  print: any;
  resetPassword: any;
  updateUserEmail: any;
  updateUserPassword: any;
  updateInfo: any;
};

interface Props {
  children: JSX.Element;
}

// TODO реализовать разные сообщения об ошибках

export function AuthProvider(props: Props) {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const mainPageStore = useContext(MainPageStoreContext);

  const auth = getAuth();
  const database = mainPageStore?.database;

  function signup(email: string, password: string, login: string) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        addDocument(database, 'users', login, {
          uid: user.uid,
          name: login,
          authProvider: 'local',
          email: user.email,
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode:', errorCode);
        console.log('errorMessage:', errorMessage);
      });
  }

  function updateInfo(login: string, photoUrl?: string) {
    return updateProfile(auth.currentUser!, {
      displayName: login,
      photoURL: photoUrl,
    }).then(() => console.log(auth.currentUser));
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function print(values: any) {
    console.log(values);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email: string) {
    return updateEmail(auth.currentUser!, email);
  }

  function updateUserPassword(password: string) {
    return updatePassword(auth.currentUser!, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [auth]);

  const value = {
    auth,
    currentUser,
    login,
    print,
    signup,
    logout,
    updateInfo,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export function useAuth() {
  return useContext(AuthContext);
}
