import * as Yup from 'yup'

export const CommentFormValidationSchema = Yup.object({
  text: Yup.string()
    .required('Поле обязательно'),
  rating: Yup.number()
    .required('Поле обязательно'),
})
