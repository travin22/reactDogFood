import * as Yup from 'yup'

export const validatorSignUp = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Обязательное поле'),
  group: Yup.string()
    .max(3, 'Must be 10 characters or less')
    .required('Обязательное поле'),
  password: Yup.string()
    .max(10, 'Must be 10 characters or less')
    .required('Обязательное поле'),

})
