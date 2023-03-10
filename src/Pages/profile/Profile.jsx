import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { AddProductModal } from '../../components/AddProduct/AddProduct'
import { Loader } from '../../components/Loader/Loader'
import { clearCart } from '../../redux/slices/cartSlice'
import { getTokenSelector, logOut } from '../../redux/slices/userSlice'
import profileStyles from './profile.module.css'

export function Profile() {
  const userToken = useSelector(getTokenSelector)
  const navigate = useNavigate()
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const dispatch = useDispatch()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true)
  }

  const logoutHandler = () => {
    dispatch(logOut())
    dispatch(clearCart())
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => dogFoodApi.getUserByToken(userToken),
    keepPreviousData: true,
  })
  if (isLoading) return <Loader />

  return (
    <div className={profileStyles.wr}>
      <h1>Информация о пользователе:</h1>
      <h3>
        Имя:
        {' '}
        {data.name}
      </h3>
      <h3>
        Профессия:
        {' '}
        {data.about}
      </h3>
      <h3>
        Почта:
        {' '}
        {data.email}
      </h3>
      <h3>
        Группа:
        {' '}
        {data.group}
      </h3>
      <img src={data.avatar} alt="user" />
      <button
        className={profileStyles.btn}
        type="button"
        onClick={handleAddModalOpen}
      >
        Добавить товар
      </button>
      {userToken ? (
        <div>
          <Link
            to="/"
          >
            <button type="button" className={profileStyles.btn} onClick={logoutHandler}>
              Выйти
            </button>
          </Link>
        </div>
      ) : (
        <div />
      )}
      <div />
      <AddProductModal
        isOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </div>
  )
}
