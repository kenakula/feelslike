import { NoteModel } from 'app/models/note-model';
import { Timestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';

export const noteMocks: NoteModel[] = [
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title1',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.fromDate(new Date('2022-09-21')),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title2',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.fromDate(new Date('2022-09-24')),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title3',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.fromDate(new Date('2022-09-24')),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title4',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.fromDate(new Date('2022-09-26')),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title5',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.fromDate(new Date('2022-09-29')),
  },
];
