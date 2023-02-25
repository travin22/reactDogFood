import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { Loader } from '../../../components/Loader/Loader'
import { getQueryCartKey } from '../../../Products/Products/utils'
import { clearFavorites, getAllFavoriteProductsSelector } from '../../../redux/slices/favorite'
import { getTokenSelector } from '../../../redux/slices/userSlice'
import { FavoriteItem } from '../FavoriteItem/FavoriteItem'
import favoriteStyle from './favorite.module.css'

export function Favorite() {
  const favorites = useSelector(getAllFavoriteProductsSelector)
  const userToken = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data: favoriteProducts, isLoading, isError, error,
  } = useQuery({
    queryKey: [getQueryCartKey(favorites.length)],
    queryFn: () => dogFoodApi.getProductsByIds(favorites, userToken),
    enabled: !!(userToken),
  })

  const clearFavoritesHandler = () => {
    dispatch(clearFavorites())
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  return (
    <div>
      {
            !favorites[0] && (
            <div className={favoriteStyle.empty}>
              <h1>Вы ещё ничего не выбрали</h1>
              <Link to="/products">
                <button type="button" className={favoriteStyle.button}>
                  В каталог
                </button>
              </Link>
            </div>
            )
        }

      {favoriteProducts[0] && (
        <div>
          <button type="button" onClick={clearFavoritesHandler} className={favoriteStyle.button}>
            Очистить
          </button>
          <ul className={favoriteStyle.products}>
            {favoriteProducts.map((item) => (
              <FavoriteItem
                key={item._id}
                id={item._id}
                title={item.name}
                photo={item.pictures}
                price={item.price}
                wight={item.wight}
                discount={item.discount}
                tags={item.tags}
              />
            ))}
          </ul>
        </div>
      )}

    </div>
  )
}
