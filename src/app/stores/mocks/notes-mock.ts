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
    date: Timestamp.now(),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title2',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.now(),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title3',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.now(),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title4',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.now(),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title5',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.now(),
  },
];
