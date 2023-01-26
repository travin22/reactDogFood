import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { AppContext } from '../../context/AppContextProvider'
import { Loader } from '../../Loader/Loader'
import { ProductItem } from '../ProductItem/ProductItem'
import productsStyle from './products.module.css'

export function Products() {
  console.log('render products')
  const navigate = useNavigate()
  const { token } = useContext(AppContext)
  console.log({ token })
  if (token) {
    const {
      data, isLoading, isError, error,
    } = useQuery({
      queryKey: ['allProducts'],
      queryFn: () => dogFoodApi.getAllProducts(),
    })
    console.log({ data })
    if (isLoading) return <Loader />
    if (isError) {
      return (
        <div className="errorMessage">
          {error.message}
        </div>
      )
    }
    const { products } = data
    console.log({ data })
    if (!products.length) {
      console.log(products.length)
      return <p>Список пуст</p>
    }
    return (
      <div className={productsStyle.products}>
        {products.map((product) => (
          <ProductItem
            // eslint-disable-next-line no-underscore-dangle
            key={product._id}
            title={product.name}
            photo={product.pictures}
            price={product.price}
            wight={product.wight}
            discount={product.discount}
            tags={product.tags}
            likes={product.likes}
          />
        ))}
      </div>
    )
  }
  useEffect(() => { navigate('/signin') })
}
