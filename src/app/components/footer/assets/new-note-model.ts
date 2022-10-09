import { NoteType } from 'app/shared/types/note-types';

export interface QuizEntry {
  question: string;
  answer: string;
}

export interface NewNoteModel {
  type: NoteType;
  title: string;
  desc: string;
  date: Date;
  emojies: string[];
  secondaryFeels?: string[];
  quiz?: QuizEntry[];
}
