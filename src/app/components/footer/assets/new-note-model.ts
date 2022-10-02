import { NoteType } from 'app/types/note-types';

export interface NewNoteModel {
  type: NoteType;
  title: string;
  desc: string;
  date: Date;
  secondaryFeels?: string[];
  emojies: string[];
}
