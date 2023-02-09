import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import headerStyles from './header.module.css'
import logo from '../images/DOGFOOD.png'
import { getTokenSelector, logOut } from '../redux/slices/userSlice'
import { Search } from '../Search/Search'

export function Header() {
  const userToken = useSelector(getTokenSelector)
  console.log(userToken)

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logOut())
  }

  return (
    <header className={headerStyles.wr}>
      <nav>
        <ul className={headerStyles.headerMenu}>
          <li>
            <Link to="/"><img src={logo} alt="DogFood" className={headerStyles.logo} /></Link>
          </li>
          <li>
            <Search />
          </li>
          {userToken ? (
            <li>
              <Link
                to="/"
                className={headerStyles.link}
              >
                <button type="button" className={headerStyles.btn} onClick={logoutHandler}>
                  Выйти
                </button>
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/signin"
                className={headerStyles.link}
              >
                <button type="button" className={headerStyles.btn}>
                  Войти
                </button>
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/signup"
              className={headerStyles.link}
            >
              <button type="button" className={headerStyles.btn}>
                Регистрация
              </button>
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={headerStyles.link}
            >
              <button type="button" className={headerStyles.btn}>
                Корзина
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
