import { Timestamp } from '@firebase/firestore';
import { Answer } from './answer';

export interface Note {
  primaryFeel: string | null;
  secondaryFeels: string[] | string | null;
  date: Timestamp;
  answers: Answer[];
}
