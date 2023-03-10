/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { getTokenSelector } from '../../redux/slices/userSlice'
import { Loader } from '../Loader/Loader'
import { Modal } from '../Modal/Modal'
import { ProductValidationSchema } from '../../Products/DetailProduct/validatorDetailProduct'
import addProductStyles from './addProduct.module.css'

export function AddProductModal({
  setIsAddModalOpen, isOpen,
}) {
  const navigate = useNavigate()
  const userToken = useSelector(getTokenSelector)
  const closeAddModalHandler = () => {
    setIsAddModalOpen(false)
  }
  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (data) => dogFoodApi.addNewProduct(data, userToken)
      .then(() => {
        setIsAddModalOpen(false)
        setTimeout(() => navigate('/products'))
      }),
  })
  const initialValues = {
    pictures: '',
    name: '',
    price: '',
    discount: 0,
    stock: 0,
    wight: '',
    description: '',

  }
  const handleSubmit = async (values) => {
    await mutateAsync(values)
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>
  return (
    <Modal isOpen={isOpen} closeHandler={closeAddModalHandler}>
      <h3>Введите данные о товаре</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={ProductValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className="d-flex flex-column">
          <label>
            Введите название товара
            <Field className="mb-1 form-control" name="name" type="text" />
            <ErrorMessage component="p" className={addProductStyles.error} name="name" />
          </label>
          <label>
            Введите описание товара
            <Field className="mb-1 form-control" name="description" type="text" />
            <ErrorMessage component="p" className={addProductStyles.error} name="description" />
          </label>
          <label>
            Введите ссылку на фото товара c окончанием .jpg
            <Field className="mb-1 form-control" name="pictures" type="text" />
            <ErrorMessage component="p" className={addProductStyles.error} name="pictures" />
          </label>
          <label>
            Введите цену товара
            <Field className="mb-1 form-control" name="price" type="number" />
            <ErrorMessage component="p" className={addProductStyles.error} name="price" />
          </label>
          <label>
            Введите % скидки
            <Field className="mb-1 form-control" name="discount" type="number" />
            <ErrorMessage component="p" className={addProductStyles.error} name="discount" />
          </label>
          <label>
            Введите количество товара в наличии
            <Field className="mb-1 form-control" name="stock" type="number" />
            <ErrorMessage component="p" className={addProductStyles.error} name="stock" />
          </label>

          <label>
            Введите вес товара
            <Field className="mb-1 form-control" name="wight" type="text" />
            <ErrorMessage component="p" className={addProductStyles.error} name="wight" />
          </label>

          <div className="d-flex justify-content-around align-items-center mt-1">
            <button
              type="button"
              data-label="notNavigate"
              className={addProductStyles.btnCls}
              onClick={closeAddModalHandler}
            >
              Отменить
            </button>
            <button type="submit" className={addProductStyles.btnAdd}>
              Сохранить
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}
