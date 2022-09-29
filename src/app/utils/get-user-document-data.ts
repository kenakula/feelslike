import { UserModel } from 'app/models';
import { UserCredential } from 'firebase/auth';

export const getUserDocumentData = ({
  user: { displayName, email, uid, photoURL, phoneNumber },
}: UserCredential): UserModel => ({
  displayName: displayName ?? 'Неопознанный енотик',
  email: email ?? '',
  uid,
  profileImage: photoURL ?? '',
  phoneNumber: phoneNumber ?? '',
});
