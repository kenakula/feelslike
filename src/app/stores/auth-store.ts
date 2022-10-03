import { AuthState, BootState } from 'app/types';
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
import { RecoverPasswordEmailModel, SignInModel, UserModel } from 'app/models';
import { getUserDocumentData } from 'app/utils';
import { DatabaseCollection } from 'app/types/database-collection';
import { FirebaseError } from 'firebase/app';
import { StorageError, UploadResult } from 'firebase/storage';

const googleProvider = new GoogleAuthProvider();

export class AuthStore {
  public bootState: BootState = 'none';
  public authState: AuthState = 'NotAuthorized';
  public error: string | null = null;
  public currentUser: User | null = null;
  public userData: UserModel | null = null;

  constructor(private readonly auth: Auth) {
    makeAutoObservable(this);
  }

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
        const userData = getUserDocumentData(credentials);
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
              const userData = getUserDocumentData(credentials);
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

  public deleteUserImage = async (): Promise<void> => {
    deleteFile(`UserAvatars/${this.userData?.uid}`)
      .then(() => {
        if (this.userData) {
          updateDocument(DatabaseCollection.Users, this.userData.uid, {
            profileImage: '',
          }).then(() => {
            if (this.userData) {
              this.getUserData(this.userData.uid);
            }
          });
        }
      })
      .catch((error: StorageError) => {
        runInAction(() => {
          this.error = error.message;
        });
      });
  };

  public uploadUserImage = async (file: File): Promise<void | UploadResult> => {
    return uploadFile(`UserAvatars/${this.userData?.uid}`, file)
      .then(async () => {
        if (this.userData) {
          const url = await getFileUrl(`UserAvatars/${this.userData?.uid}`);

          updateDocument(DatabaseCollection.Users, this.userData.uid, {
            profileImage: url,
          }).then(() => {
            if (this.userData) {
              this.getUserData(this.userData.uid);
            }
          });
        }
      })
      .catch((error: StorageError) => {
        runInAction(() => {
          this.error = error.message;
        });
      });
  };
}
