import * as yup from 'yup';

export const passwordSchema = yup.object({
  password: yup.string().min(6).required('Это обязательное поле'),
});
