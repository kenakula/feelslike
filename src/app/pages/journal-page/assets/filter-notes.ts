import { NoteModel } from 'app/models';
import { FilterParams } from 'app/shared/types';

export const filterNotes = (
  arr: NoteModel[],
  params: FilterParams,
): NoteModel[] => {
  const newArr = arr
    .filter(({ type }) => (params.type === 'all' ? true : type === params.type))
    .sort((a, b) => {
      if (params.sortOrder === 'asc') {
        return a.date.seconds - b.date.seconds;
      }

      return b.date.seconds - a.date.seconds;
    });

  return newArr;
};
