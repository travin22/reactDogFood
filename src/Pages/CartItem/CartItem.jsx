import { useDispatch } from 'react-redux'
import {
  changeIsPickProduct, deleteProduct, productDecrement, productIncrement,
} from '../../redux/slices/cartSlice'
import cartItemStyles from './cartItem.module.css'

export function CartItem({
  name, pictures, price, id, description, stock, discount, isPicked, count,
}) {
  const dispatch = useDispatch()
  const deleteProductHandler = () => {
    dispatch(deleteProduct(id))
  }
  const selectProductHandler = () => {
    dispatch(changeIsPickProduct(id))
  }
  const incrementCountHandler = () => {
    if (count < stock) { dispatch(productIncrement(id)) }
  }
  const decrementCountHandler = () => {
    if (count > 0) { dispatch(productDecrement(id)) }
  }
  console.log({ count })
  return (
    <li className={cartItemStyles.card}>
      <h4>
        <input
          type="checkbox"
          checked={isPicked}
          style={{ marginRight: '12px' }}
          onChange={selectProductHandler}
        />
        {/* <span /> */}
        {name}
      </h4>
      <div className="card-body">
        <div className={cartItemStyles.cartAbout}>
          <div className="card-body">
            <div className="d-flex flex-row gap-3">
              <h5 className="card-title">
                {discount > 0 && `${((price * (100 - discount)) / 100)} ₽`}
                {discount === 0 && `${price} ₽`}
              </h5>
              {discount > 0 && (
                <h6 style={{ textDecoration: 'line-through', color: 'gray' }}>
                  {price}
                  ₽
                </h6>
              )}
            </div>
            <p className="card-text">{description}</p>
            <p className="card-text">
              В наличии:
              {' '}
              {stock}
            </p>
          </div>
          <img src={pictures} className={cartItemStyles.productPicture} alt="product" />
        </div>
        <div className="d-flex flex-row gap-4 px-3">
          <div className="d-flex flex-row gap-2 px-2 align-items-center">
            <button type="button" className={cartItemStyles.btn} onClick={decrementCountHandler}>
              -
            </button>

            <h3>
              {' '}
              {count}
              {' '}
            </h3>
            <button type="button" className={cartItemStyles.btn} onClick={incrementCountHandler}>
              +
            </button>
          </div>
          <button
            type="button"
            className={cartItemStyles.btn}
            onClick={deleteProductHandler}
          >
            Удалить
          </button>
        </div>
      </div>
    </li>
  )
}
