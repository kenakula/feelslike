import { NoteModel } from 'app/models';

export const getFeelsNotesCount = (
  notesList: NoteModel[],
  feel: string,
): number => {
  const notesArr = notesList.filter(
    ({ type, title }: NoteModel) =>
      (type === 'feel' || type === 'quiz') && title === feel,
  );

  return notesArr.length;
};
