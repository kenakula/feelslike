import { NoteModel } from 'app/models';
import { TimePeriod } from 'app/types';

const MapPeriod: Record<TimePeriod, number> = {
  week: 7,
  month: 30,
  year: 365,
  all: 0,
};

export const filterNotesByTime = (
  notes: NoteModel[],
  time: TimePeriod,
): NoteModel[] => {
  const now = new Date();
  const pastDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - MapPeriod[time],
  );

  const dateToCompare = time === 'all' ? 0 : pastDate.getTime();

  const newArr = notes.filter(
    note => note.date.toDate().getTime() > dateToCompare,
  );

  return newArr;
};
