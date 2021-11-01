/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  getDocs,
  getDoc,
  query,
  doc,
  setDoc,
} from "firebase/firestore";

export const readDocument = async (doc: any) => {
  const snapShot = await getDoc(doc);
  if (snapShot.exists()) {
    const data: any = snapShot.data();
    console.log(`my data - ${JSON.stringify(data.milk)}`);
  } else {
    console.log("no data");
  }
};

export const queryForDocs = async (database: any, collectionString: any) => {
  const queryDocs = query(collection(database, collectionString));
  const querySnapShot = await getDocs(queryDocs);

  return querySnapShot;
};

export const addData = async (database: any, obj: any) => {
  console.log(obj);
  setDoc(doc(database, "feels", "secondary"), {
    name: "secondary",
    list: [...obj],
  });
  // list.forEach((item: any) => {
  //   setDoc(doc(database, "feels", item.id), {
  //     name: item.name,
  //     list: [...item.list],
  //   });
  // });
};
