import { UserCredential } from 'firebase/auth';
import { UserModel } from 'app/models';

export const getUserDocumentData = (
  { user: { displayName, email, uid, photoURL, phoneNumber } }: UserCredential,
  questions: string[],
): UserModel => ({
  displayName: displayName ?? email ?? 'Неопознанный енотовый',
  email: email ?? '',
  uid,
  profileImage: photoURL ?? '',
  phoneNumber: phoneNumber ?? '',
  questions,
});
