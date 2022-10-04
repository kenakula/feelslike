import * as yup from 'yup';

export const emailSchema = yup.object({
  email: yup
    .string()
    .email('Почта введена неправильно')
    .required('Это обязательное поле'),
});
