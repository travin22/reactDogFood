import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { Filters } from '../../components/Filters/Filters'
import { withQuery } from '../../components/HOCs/withQuery'
import { Search } from '../../components/Search/Search'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getTokenSelector } from '../../redux/slices/userSlice'
import { ProductItem } from '../ProductItem/ProductItem'
import productsStyle from './products.module.css'
import { getQueryKey } from './utils'

function ProductsInner({ data }) {
  let products = [...data]
  const [searchParams] = useSearchParams()
  const currentFilterName = searchParams.get('filterName')

  switch (currentFilterName) {
    case null:
      products = [...data]
      break
    case 'Новинки':
      products = products.sort((item, nextItem) => {
        const itemTime = new Date(Date.parse(item.updated_at))
        const nextItemTime = new Date(Date.parse(nextItem.updated_at))
        if (itemTime < nextItemTime) {
          return -1
        }
        if (itemTime > nextItemTime) {
          return 1
        }
        return 0
      })
      break
    case 'Скидки':
      products = products.filter((item) => item.discount > 0).sort((item, nextItem) => {
        if (item.discount > nextItem.discount) {
          return -1
        }
        if (item.discount < nextItem.discount) {
          return 1
        }
        return 0
      })
      break
    case 'Дороже':
      products = products.sort((item, nextItem) => {
        if (item.price > nextItem.price) {
          return -1
        }
        if (item.price < nextItem.price) {
          return 1
        }
        return 0
      })
      break
    case 'Дешевле':
      products = products.sort((item, nextItem) => {
        if (item.price < nextItem.price) {
          return -1
        }
        if (item.price > nextItem.price) {
          return 1
        }
        return 0
      })
      break

    default:
      break
  }

  return (
    <div>
      {products[0] && (
      <ul className={productsStyle.products}>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.name}
            photo={product.pictures}
            price={product.price}
            wight={product.wight}
            discount={product.discount}
            tags={product.tags}
            likes={product.likes}
          />
        ))}
      </ul>
      )}
      {!products[0] && products && (
      <h4>По вашему запросу ничего не найдено</h4>
      )}
    </div>

  )
}
const ProductsInnerWithQuery = withQuery(ProductsInner)

export function Products() {
  const userToken = useSelector(getTokenSelector)

  const navigate = useNavigate()
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const search = useSelector(getSearchSelector)
  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: getQueryKey(search),
    queryFn: () => dogFoodApi.getAllProducts(search, userToken),
    enabled: !!(userToken),
  })

  return (
    <>
      <div className={productsStyle.search}>
        <Search />
      </div>
      <Filters />
      <ProductsInnerWithQuery
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </>
  )
}
