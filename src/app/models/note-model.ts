import { NoteType } from 'app/types/note-types';
import { Timestamp } from 'firebase/firestore';

export interface NoteModel {
  id: string;
  type: NoteType;
  title: string;
  desc: string;
  emotions: string[];
  date: Timestamp;
}
