/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { Loader } from '../../components/Loader/Loader'
import {
  addCurrentProduct,
  deleteProduct,
  getAllCartProductsSelector,
} from '../../redux/slices/cartSlice'
import {
  addFavorite,
  getAllFavoriteProductsSelector,
  removeFavorite,
} from '../../redux/slices/favorite'
import { getTokenSelector, getUserSelector } from '../../redux/slices/userSlice'
import { getQueryProductKey } from '../Products/utils'
import { DeleteProductModal } from './DeleteProductModal'
import { EditProductModal } from './EditProductModal'
import { Comments } from './Comments'
import detailPageStyles from './detailProduct.module.css'
import favorite from '../../images/favorite.png'
import nofavorite from '../../images/nofavorite.png'
// import detailProductStyle from './detailProduct.module.css'

export function DetailProduct() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const navigate = useNavigate()
  const userToken = useSelector(getTokenSelector)
  const { email } = useSelector(getUserSelector)
  const favorites = useSelector(getAllFavoriteProductsSelector)
  const cartProducts = useSelector(getAllCartProductsSelector)
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: getQueryProductKey(),
    queryFn: () => dogFoodApi.getProduct(id, userToken),
    enabled: !!(userToken),
  })
  const openDeleteModalHandler = () => {
    setIsDeleteModalOpen(true)
  }
  const openEditModalHandler = () => {
    setIsEditModalOpen(true)
  }
  const moveToCartHandler = () => {
    dispatch(addCurrentProduct(id))
  }
  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)
  const isAuthor = (email === data.author.email)

  return (
    <>
      <div className="card m-5">
        <div className="d-flex flex-column">
          <h5 className="card-header">
            {data.name}
          </h5>
          <div className={detailPageStyles.favoriteItem}>
            {favorites.includes(id) && (
            <img
              src={nofavorite}
              className={detailPageStyles.favorite}
              alt="favorite"
              onClick={() => { dispatch(removeFavorite(id)) }}
            />
            )}
            {!favorites.includes(id) && (
            <img
              src={favorite}
              className={detailPageStyles.favorite}
              alt="not favorite"
              onClick={() => { dispatch(addFavorite(id)) }}
            />
            )}
          </div>
          <div className="card-body">
            <div className="d-flex flex-row gap-2">
              <div className="card-body">
                <p className="card-text mt-2">
                  <b>Описание:</b>
                  {' '}
                  {data.description}

                </p>
                <p className="card-text">
                  <b>В наличии:</b>
                  {' '}
                  {data.stock}
                </p>
                <p className="card-text">
                  <b>Вес:</b>
                  {' '}
                  {data.wight}
                </p>
                <div className="d-flex flex-row gap-3">
                  <h4 className="card-title">
                    {data.discount > 0 && `${((data.price * (100 - data.discount)) / 100)} ₽`}
                    {data.discount === 0 && `${data.price} ₽`}
                  </h4>
                  {data.discount > 0 && (
                    <h6
                      className="card-title"
                      style={{ textDecoration: 'line-through', color: 'gray' }}
                    >
                      {data.price}
                      ₽
                    </h6>
                  )}
                </div>
              </div>
              <img src={data.pictures} className={detailPageStyles.img} alt="product" />
            </div>
            <div className="d-flex flex-row gap-4 px-3">
              {isAuthor && (
                <>
                  <button
                    type="button"
                    className={detailPageStyles.btnDlt}
                    onClick={openDeleteModalHandler}
                  >
                    Удалить
                  </button>
                  <button
                    type="button"
                    className={detailPageStyles.btnEdt}
                    onClick={openEditModalHandler}
                  >
                    Редактировать
                  </button>

                </>
              )}
              <button
                type="button"
                className={detailPageStyles.btnBuy}
                onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}
              >
                {isInCart(id) ? (
                  <h5>Из корзины</h5>
                ) : (
                  <h5>В корзину</h5>
                )}
              </button>
            </div>
          </div>

          <EditProductModal
            isOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            name={data.name}
            id={id}
            pictures={data.pictures}
            description={data.description}
            available={data.available}
            stock={data.stock}
            price={data.price}
            discount={data.discount}
            wight={data.wight}
          />
          <DeleteProductModal
            isOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            title={data.name}
            id={id}
          />
        </div>
      </div>
      <Comments id={id} />

    </>
  )
}
