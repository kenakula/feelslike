import { NoteModel } from 'app/models/note-model';
import { Timestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';

export const noteMocks: NoteModel[] = [
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.now(),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.now(),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.now(),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.now(),
  },
  {
    id: nanoid(),
    type: 'feel',
    title: 'Title',
    desc: 'Note description about something Note description about something',
    emotions: ['😅', '😃'],
    date: Timestamp.now(),
  },
];
