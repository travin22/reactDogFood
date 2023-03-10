import { useDispatch, useSelector } from 'react-redux'
import {
  addCurrentProduct,
  deleteProduct,
  getAllCartProductsSelector,
} from '../../../redux/slices/cartSlice'
import { removeFavorite } from '../../../redux/slices/favorite'
import favoriteItemStyle from './favoriteItemStyles.module.css'

export function FavoriteItem({
  title,
  id,
  photo,
  price,
  wight,
  discount,
  tags,
}) {
  const dispatch = useDispatch()
  const cartProducts = useSelector(getAllCartProductsSelector)
  const moveToCartHandler = () => {
    dispatch(addCurrentProduct(id))
  }

  const removeFavoritesHandler = () => {
    dispatch(removeFavorite(id))
  }

  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }
  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)

  return (
    <div className={favoriteItemStyle.card}>
      <div className={favoriteItemStyle.tagsWrapper}>
        {discount ? (
          <div className={favoriteItemStyle.discount}>
            -
            {discount}
            %
          </div>
        ) : (
          ''
        )}
        {tags.includes('new') ? (
          <div className={favoriteItemStyle.new}>Новинка</div>
        ) : (
          ''
        )}
      </div>
      <div className={favoriteItemStyle.photo}>
        <img
          src={photo}
          alt="изображение товара"
        />
      </div>
      <div className={favoriteItemStyle.price}>
        {price}
        {' '}
        ₽
      </div>
      <div className={favoriteItemStyle.wight}>{wight}</div>
      <div className={favoriteItemStyle.title}>{title}</div>
      <div>
        <button
          className={favoriteItemStyle.buttonBuy}
          type="button"
          onClick={removeFavoritesHandler}
        >
          Убрать
        </button>
        <button
          className={favoriteItemStyle.buttonBuy}
          type="button"
          onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}
        >
          {isInCart(id) ? (
            <p>Из корзины</p>
          ) : (
            <p>В корзину</p>
          )}
        </button>
      </div>
    </div>
  )
}
