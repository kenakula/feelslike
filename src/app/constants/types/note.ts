import { Timestamp } from '@firebase/firestore';
import { Answer } from './answer';

export interface AddedNote {
  date: Timestamp;
  text: string;
  id: string;
}
export interface Note {
  primaryFeel: string | null;
  secondaryFeels: string[] | string | null;
  date: Timestamp;
  answers: Answer[];
  id: string;
}
