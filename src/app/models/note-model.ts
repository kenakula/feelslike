import { QuizEntry } from 'app/components/footer/assets';
import { NoteType } from 'app/types/note-types';
import { Timestamp } from 'firebase/firestore';

export interface NoteModel {
  id: string;
  type: NoteType;
  title: string;
  desc: string;
  emotions: string[];
  date: Timestamp;
  secondary?: string[];
  quiz?: QuizEntry[];
}
