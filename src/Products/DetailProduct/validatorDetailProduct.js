import * as Yup from 'yup'

export const ProductValidationSchema = Yup.object({
  available: Yup.boolean(),
  pictures: Yup.string()
    .matches(
      // eslint-disable-next-line max-len
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Введите корректную ссылку',
    )
    .required('Поле обязательно'),
  name: Yup.string()
    .required('Поле обязательно'),
  price: Yup.number()
    .required('Поле обязательно'),
  discount: Yup.number()
    .required('Поле обязательно'),
  stock: Yup.number()
    .min(1, 'Must be at least 1')
    .required('Поле обязательно'),
  wight: Yup.string()
    .required('Поле обязательно'),
  description: Yup.string()
    .required('Поле обязательно'),

})
