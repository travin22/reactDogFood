import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import headerStyles from './header.module.css'
import logo from '../images/DOGFOOD.png'
import cart from '../images/cart.png'
import { getTokenSelector, logOut } from '../redux/slices/userSlice'
import { Search } from '../Search/Search'
import { clearCart, getAllCartProductsSelector } from '../redux/slices/cartSlice'

export function Header() {
  const cartProducts = useSelector(getAllCartProductsSelector)
  const userToken = useSelector(getTokenSelector)
  console.log(userToken)

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logOut())
    dispatch(clearCart())
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
            <NavLink
              to="/cart"
              className={headerStyles.link}
            >
              <img src={cart} alt="Cart" className={headerStyles.cart} />
              <span className={headerStyles.cartNumber}>
                {cartProducts.length}
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
