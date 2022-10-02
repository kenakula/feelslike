import { NoteModel } from 'app/models';
import { Timestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { NewNoteModel } from './new-note-model';

export const getNoteModel = ({
  type,
  title,
  desc,
  date,
  emojies,
  secondaryFeels,
}: NewNoteModel): NoteModel => {
  const note: NoteModel = {
    id: nanoid(),
    type,
    title,
    desc,
    date: Timestamp.fromDate(date),
    emotions: emojies,
    secondary: secondaryFeels,
  };

  return note;
};
