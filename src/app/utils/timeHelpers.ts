import { Timestamp } from '@firebase/firestore';

export const getTime = (noteDate: Timestamp) => {
  return `${noteDate.toDate().getHours()}:${noteDate.toDate().getMinutes()}`;
};

export const getDate = (noteDate: Timestamp) => {
  return noteDate.toDate().toLocaleDateString('ru-Ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
