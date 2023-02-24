import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { withQuery } from '../../components/HOCs/withQuery'
import { Search } from '../../components/Search/Search'
import { Filters } from '../../Filters/Filters'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getTokenSelector } from '../../redux/slices/userSlice'
import { ProductItem } from '../ProductItem/ProductItem'
import productsStyle from './products.module.css'
import { getQueryKey } from './utils'

function ProductsInner({ data }) {
  const products = data
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
      <h5>По вашему запросу ничего не найдено</h5>
      )}
    </div>

  )
}
const ProductsInnerWithQuery = withQuery(ProductsInner)

export function Products() {
  const userToken = useSelector(getTokenSelector)
  const navigate = useNavigate()
  console.log({ userToken })
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
