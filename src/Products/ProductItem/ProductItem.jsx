import { useDispatch, useSelector } from 'react-redux'
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
import productItemStyle from './productItem.module.css'

export function ProductItem({
  title,
  id,
  photo,
  price,
  wight,
  discount,
  tags,
}) {
  const cartProducts = useSelector(getAllCartProductsSelector)
  const favorites = useSelector(getAllFavoriteProductsSelector)

  const dispatch = useDispatch()

  const moveToCartHandler = () => {
    dispatch(addCurrentProduct(id))
  }
  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)

  return (
    <div className={productItemStyle.card}>
      <div className={productItemStyle.tagsWrapper}>
        {discount ? (
          <div className={productItemStyle.discount}>
            -
            {discount}
            %
          </div>
        ) : (
          ''
        )}
        {tags.includes('new') ? (
          <div className={productItemStyle.new}>Новинка</div>
        ) : (
          ''
        )}
      </div>
      <div className={productItemStyle.photo}>
        <img
          src={photo}
          alt="изображение товара"
        />
      </div>
      <div className={productItemStyle.price}>
        {price}
        {' '}
        ₽
      </div>
      <div className={productItemStyle.wight}>{wight}</div>
      <div className={productItemStyle.title}>{title}</div>

      <div>
        {favorites.includes(id) && (
        <button
          className={productItemStyle.buttonBuy}
          type="button"
          onClick={() => { dispatch(removeFavorite(id)) }}
        >
          Из избранного
        </button>
        )}
        {!favorites.includes(id) && (
        <button
          className={productItemStyle.buttonBuy}
          type="button"
          onClick={() => { dispatch(addFavorite(id)) }}
        >
          В избранное
        </button>
        )}
        <button
          className={productItemStyle.buttonBuy}
          type="button"
          onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}
        >
          {isInCart(id) ? (
            <p>В корзине</p>
          ) : (
            <p>Добавить</p>
          )}
        </button>
      </div>
    </div>
  )
}
