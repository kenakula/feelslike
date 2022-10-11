import { OrderByDirection } from 'firebase/firestore';
import { NoteType } from './note-types';

export interface FilterParams {
  type: NoteType | 'all';
  order: OrderByDirection;
}
