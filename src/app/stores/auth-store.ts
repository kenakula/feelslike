import { StorageError, UploadResult } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import {
  Auth,
  User,
  AuthError,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  writeDocument,
  readDocument,
  uploadFile,
  updateDocument,
  getFileUrl,
  deleteFile,
} from 'app/firebase';
import {
  QuestionsModel,
  RecoverPasswordEmailModel,
  SignInModel,
  UserModel,
} from 'app/models';
import { getUserDocumentData } from 'app/shared/utils';

import { AuthState, BootState, DatabaseCollection } from 'app/shared/types';

const googleProvider = new GoogleAuthProvider();

export class AuthStore {
  public bootState: BootState = 'none';
  public authState: AuthState = 'NotAuthorized';
  public error: string | null = null;
  public currentUser: User | null = null;
  public userData: UserModel | null = null;
  public defaultQuestions: QuestionsModel = { list: [] };

  constructor(private readonly auth: Auth) {
    makeAutoObservable(this);

    this.getDefaultQuizQuestions();
  }

  public setError = (message: string): void => {
    runInAction(() => {
      this.error = message;
    });
  };

  public resetState = (): void => {
    runInAction(() => {
      this.bootState = 'none';
      this.error = null;
    });
  };

  public signUpWithEmail = async ({
    email,
    password,
  }: SignInModel): Promise<UserCredential | null> => {
    this.bootState = 'loading';
    this.error = null;

    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(credentials => {
        const userData = getUserDocumentData(
          credentials,
          this.defaultQuestions.list,
        );
        runInAction(() => {
          this.userData = userData;
        });
        this.setCurrentUser(credentials.user);
        writeDocument(DatabaseCollection.Users, userData, userData.uid);

        return credentials;
      })
      .catch((error: AuthError) => {
        runInAction(() => {
          this.bootState = 'error';
          this.error = error.code;
        });
        console.error(error.message);
        return null;
      });
  };

  public signInWithEmail = async ({
    email,
    password,
  }: SignInModel): Promise<UserCredential | null> => {
    this.bootState = 'loading';
    this.error = null;

    return signInWithEmailAndPassword(this.auth, email, password)
      .then(credentials => {
        this.setCurrentUser(credentials.user);
        this.getUserData(credentials.user.uid);

        return credentials;
      })
      .catch((error: AuthError) => {
        runInAction(() => {
          this.bootState = 'error';
          this.error = error.code;
        });
        console.error(error.message);
        return null;
      });
  };

  public signInWithGoogle = async (): Promise<void> => {
    this.bootState = 'loading';
    this.error = null;

    return signInWithPopup(this.auth, googleProvider)
      .then(credentials => {
        this.setCurrentUser(credentials.user);

        readDocument(DatabaseCollection.Users, credentials.user.uid).then(
          document => {
            if (document && document.exists()) {
              runInAction(() => {
                this.userData = document.data();
              });
            } else {
              const userData = getUserDocumentData(
                credentials,
                this.defaultQuestions.list,
              );
              writeDocument(DatabaseCollection.Users, userData, userData.uid);
              runInAction(() => {
                this.userData = userData;
              });
            }
          },
        );
      })
      .catch((error: AuthError) => {
        runInAction(() => {
          this.bootState = 'error';
          this.error = error.code;
        });
        console.error(error.message);
      });
  };

  public logOut = async (): Promise<void> => {
    signOut(this.auth).then(() => {
      this.setCurrentUser(null);
    });
  };

  public resetPassword = async ({
    email,
  }: RecoverPasswordEmailModel): Promise<void> => {
    this.error = null;

    return sendPasswordResetEmail(this.auth, email).catch(
      (error: AuthError) => {
        runInAction(() => {
          this.bootState = 'error';
          this.error = error.code;
        });
        console.error(error.message);
      },
    );
  };

  public setCurrentUser = (data: User | null): void => {
    this.currentUser = data;

    if (data) {
      runInAction(() => {
        this.authState = 'Authorized';
        this.bootState = 'success';
      });
    } else {
      runInAction(() => {
        this.authState = 'NotAuthorized';
        this.bootState = 'none';
        this.userData = null;
      });
    }
  };

  public getUserData = async (uid: string): Promise<void> => {
    readDocument(DatabaseCollection.Users, uid)
      .then(document => {
        if (document && document.exists()) {
          runInAction(() => {
            this.userData = document.data();
          });
        }
      })
      .catch((error: FirebaseError) => {
        runInAction(() => {
          this.error = error.message;
        });
      });
  };

  public getDefaultQuizQuestions = async (): Promise<void> => {
    readDocument(DatabaseCollection.Assets, 'Questions').then(value => {
      if (value) {
        const questions = value.data() as QuestionsModel;
        runInAction(() => {
          this.defaultQuestions = questions;
        });
      }
    });
  };

  public updateUserInfo = async (data: Partial<UserModel>): Promise<void> => {
    if (!this.userData) {
      return;
    }

    updateDocument(DatabaseCollection.Users, this.userData.uid, data)
      .then(() => {
        if (this.userData) {
          this.getUserData(this.userData.uid);
        }
      })
      .catch((error: StorageError) => {
        runInAction(() => {
          this.error = error.message;
        });
      });
  };

  public deleteUserImage = async (): Promise<void> => {
    deleteFile(`UserAvatars/${this.userData?.uid}`)
      .then(() => {
        this.updateUserInfo({ profileImage: '' });
      })
      .catch((error: StorageError) => {
        runInAction(() => {
          this.error = error.message;
        });
      });
  };

  public uploadUserImage = async (file: File): Promise<void | UploadResult> => {
    return uploadFile(`UserAvatars/${this.userData?.uid}`, file)
      .then(() => {
        getFileUrl(`UserAvatars/${this.userData?.uid}`).then(url => {
          this.updateUserInfo({ profileImage: url });
        });
      })
      .catch((error: StorageError) => {
        runInAction(() => {
          this.error = error.message;
        });
      });
  };
}
