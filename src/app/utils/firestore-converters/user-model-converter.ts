import { UserModel } from 'app/models';
import { FirestoreDataConverter } from 'firebase/firestore';

export class UserModelClass {
  public uid;
  public email;
  public name;
  public profileImage;

  constructor(uid: string, email: string, name: string, profileImage: string) {
    this.uid = uid;
    this.email = email;
    this.name = name;
    this.profileImage = profileImage;
  }
}

export const userModelConverter: FirestoreDataConverter<UserModel> = {
  toFirestore: data => ({
    uid: data.uid,
    email: data.email,
    name: data.name,
    profileImage: data.profileImage,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new UserModelClass(
      data.uid,
      data.email,
      data.name,
      data.profileImage,
    );
  },
};
