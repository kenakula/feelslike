import * as yup from 'yup';

export const newNoteSchema = yup.object({
  type: yup.string().required('Это обязательное поле'),
  title: yup.string().required('Это обязательное поле'),
  desc: yup.string(),
  secondaryFeels: yup.array(),
  emojies: yup.array(),
  date: yup.date().required('Это обязательное поле'),
});
