import * as Yup from 'yup'

export const validatorSignIn = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Обязательное поле'),
  password: Yup.string()
    .max(10, 'Must be 10 characters or less')
    .required('Обязательное поле'),

})
