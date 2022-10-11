import { NoteModel } from 'app/models/note-model';

export const filterNotes = (arr: NoteModel[], value: Date): NoteModel[] =>
  arr
    .filter(
      note =>
        new Date(note.date.toDate().setHours(0, 0, 0, 0)).getTime() ===
        new Date(value.setHours(0, 0, 0, 0)).getTime(),
    )
    .sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime());
