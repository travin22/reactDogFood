/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { Loader } from '../../components/Loader/Loader'
import { getQueryCartKey } from '../../Products/Products/utils'
import {
  addAllProductsInCart, clearCart, getAllCartProductsSelector, notAddAllProductsInCart,
} from '../../redux/slices/cartSlice'
import { getTokenSelector } from '../../redux/slices/userSlice'
import { CartItem } from '../CartItem/CartItem'
import cartStyles from './cart.module.css'

export function Cart() {
  const cart = useSelector(getAllCartProductsSelector)
  const userToken = useSelector(getTokenSelector)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data: cartProducts, isLoading, isError, error,
  } = useQuery({
    queryKey: [getQueryCartKey(cart.length)],
    queryFn: () => dogFoodApi.getProductsByIds(cart.map((product) => product.id), userToken),
    enabled: !!(userToken),
  })
  console.log(cartProducts)
  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  const isAllCardPicked = () => cart.filter((item) => item.isPicked === true).length === cart.length
  const findAllPickedProducts = () => {
    const allPickedProducts = []
    cart.forEach((item) => {
      if (item.isPicked === true) allPickedProducts.push(item)
    })
    return allPickedProducts
  }

  const getCartProductById = (idItem) => cartProducts.find((product) => product._id === idItem)
  const getCartStateProductById = (idItem) => cart.find((product) => product.id === idItem)
  const pickAllProductsHandler = () => {
    if (!isAllCardPicked()) dispatch(addAllProductsInCart())
    else dispatch(notAddAllProductsInCart())
  }
  const calculateSum = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getCartProductById(product.id).price
    return Math.ceil(updatedSum)
  }, 0)
  const calculateDiscount = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count
    * getCartProductById(product.id).price
     * (getCartProductById(product.id).discount / 100)
    return Math.ceil(updatedSum)
  }, 0)
  const calculateSumWithDiscount = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count
     * getCartProductById(product.id).price
     * ((100 - getCartProductById(product.id).discount) / 100)
    return Math.ceil(updatedSum)
  }, 0)
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  return (
    <div className={cartStyles.container}>
      {!cart[0] && (
      <div className="d-flex align-items-center justify-content-center flex-column mt-5">
        <h1>Ваша корзина пуста</h1>
        <Link to="/products">
          <button type="button" className={cartStyles.btn}>
            Перейти в каталог
          </button>
        </Link>
      </div>
      )}
      {cartProducts[0] && (
        <div
          className={cartStyles.cartContainer}
        >
          <div
            className={cartStyles.cartProducts}
          >
            <div className={cartStyles.cartProductsTop}>
              <span>
                <input
                  id="select_all"
                  type="checkbox"
                  checked={isAllCardPicked()}
                  onChange={pickAllProductsHandler}
                />
                <span />
                <label htmlFor="select_all">Выбрать все</label>
              </span>
              <button type="button" className={cartStyles.btn} onClick={clearCartHandler}>
                Очистить
              </button>
            </div>
            <ul
              className={cartStyles.cartElement}
            >
              {cartProducts.map((item) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  pictures={item.pictures}
                  stock={item.stock}
                  discount={item.discount}
                  description={item.description}
                  isPicked={getCartStateProductById(item._id)?.isPicked}
                  count={getCartStateProductById(item._id)?.count}
                />
              ))}
            </ul>
          </div>
          <div className={cartStyles.cartInfo}>
            <h4>Информация о заказе:</h4>
            <p>
              Сумма:
              {' '}
              {calculateSum() || 0}
              {' '}
              ₽
            </p>
            <p>
              Скидка:
              {' '}
              {calculateDiscount() || 0}
              {' '}
              ₽
            </p>
            <h4>
              К оплате:
              {' '}
              {calculateSumWithDiscount() || 0}
              {' '}
              ₽
            </h4>
            <button type="button" className={cartStyles.btn}>
              Оформить
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
