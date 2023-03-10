/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { Loader } from '../../components/Loader/Loader'
import { Modal } from '../../components/Modal/Modal'
import { getTokenSelector } from '../../redux/slices/userSlice'
import { getQueryProductKey } from '../Products/utils'
import { ProductValidationSchema } from './validatorDetailProduct'
import editProductStyles from './editProduct.module.css'

export function EditProductModal({
  setIsEditModalOpen, isOpen, name, price, pictures, stock, discount, description, wight, id,
}) {
  const navigate = useNavigate()
  const userToken = useSelector(getTokenSelector)
  const queryClient = useQueryClient()
  const closeEditModalHandler = () => {
    setIsEditModalOpen(false)
  }
  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (dataEdit) => dogFoodApi.editProduct(id, dataEdit, userToken)
      .then((data) => {
        setIsEditModalOpen(false)
        queryClient.invalidateQueries({ queryKey: getQueryProductKey() })
        navigate(`/products/${data._id}`)
      }),
  })
  const initialValues = {
    pictures,
    name,
    price,
    discount,
    stock,
    wight,
    description,

  }
  const handleSubmit = async (values) => {
    await mutateAsync(values)
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>
  return (
    <Modal isOpen={isOpen} closeHandler={closeEditModalHandler}>
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
            <ErrorMessage component="p" className={editProductStyles.error} name="name" />
          </label>
          <label>
            Введите описание товара
            <Field className="mb-1 form-control" name="description" type="text" />
            <ErrorMessage component="p" className={editProductStyles.error} name="description" />
          </label>
          <label>
            Введите ссылку на фото товара
            <Field className="mb-1 form-control" name="pictures" type="text" />
            <ErrorMessage component="p" className={editProductStyles.error} name="pictures" />
          </label>
          <label>
            Введите цену товара
            <Field className="mb-1 form-control" name="price" type="number" />
            <ErrorMessage component="p" className={editProductStyles.error} name="price" />
          </label>
          <label>
            Введите % скидки
            <Field className="mb-1 form-control" name="discount" type="number" />
            <ErrorMessage component="p" className={editProductStyles.error} name="discount" />
          </label>
          <label>
            Введите количество товара в наличии
            <Field className="mb-1 form-control" name="stock" type="number" />
            <ErrorMessage component="p" className={editProductStyles.error} name="stock" />
          </label>

          <label>
            Введите вес товара
            <Field className="mb-1 form-control" name="wight" type="text" />
            <ErrorMessage component="p" className={editProductStyles.error} name="wight" />
          </label>

          <div className="d-flex justify-content-around align-items-center mt-1">
            <button
              type="button"
              data-label="notNavigate"
              className={editProductStyles.btnCls}
              onClick={closeEditModalHandler}
            >
              Отменить
            </button>
            <button type="submit" className={editProductStyles.btnAdd}>
              Сохранить
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}
