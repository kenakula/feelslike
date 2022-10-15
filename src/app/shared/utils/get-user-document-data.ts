import { UserCredential } from 'firebase/auth';
import { UserModel } from 'app/models';

export const getUserDocumentData = (
  { user: { email, uid, photoURL } }: UserCredential,
  questions: string[],
): UserModel => ({
  email: email ?? '',
  uid,
  profileImage: photoURL ?? '',
  questions,
});
