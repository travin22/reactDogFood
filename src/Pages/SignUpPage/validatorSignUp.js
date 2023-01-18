import * as Yup from 'yup'

export const validatorSignUp = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  group: Yup.string()
    .max(10, 'Must be 10 characters or less')
    .required('Required'),
  password: Yup.string()
    .max(10, 'Must be 10 characters or less')
    .required('Required'),

})
