import { NoteType } from 'app/types/note-types';
import * as yup from 'yup';

export const newNoteSchema = yup.object({
  type: yup.string().required('Это обязательное поле'),
  title: yup.string().required('Это обязательное поле'),
  desc: yup.string(),
  secondaryFeels: yup.array(),
  emojies: yup.array(),
  date: yup.date().required('Это обязательное поле'),
  quiz: yup.array().when('type', { is: 'quiz', then: yup.array().min(1) }),
});

export interface FormErrors {
  type: NonNullable<NoteType>;
  title: string;
  desc: string;
  date: Date;
  secondaryFeels: string[];
  emojies: string[];
}
