import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import headerStyles from './header.module.css'
import logo from '../../images/DOGFOOD.png'
import cart from '../../images/cart.png'
import profile from '../../images/lk.png'
import { getTokenSelector, logOut } from '../../redux/slices/userSlice'
import { clearCart, getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import { Search } from '../Search/Search'

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
        <div className={headerStyles.headerMenu}>
          <div className="">
            <Link to="/"><img src={logo} alt="DogFood" className={headerStyles.logo} /></Link>
          </div>
          <div>
            <Search />
          </div>
          <div className={headerStyles.buttons}>
            {userToken ? (
              <div>
                <Link
                  to="/"
                  className={headerStyles.link}
                >
                  <button type="button" className={headerStyles.btn} onClick={logoutHandler}>
                    Выйти
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to="/signin"
                  className={headerStyles.link}
                >
                  <button type="button" className={headerStyles.btn}>
                    Войти
                  </button>
                </Link>
              </div>
            )}
            <div>
              <Link
                to="/signup"
                className={headerStyles.link}
              >
                <button type="button" className={headerStyles.btn}>
                  Регистрация
                </button>
              </Link>
            </div>
            <div>
              <Link
                to="/profile"
                className={headerStyles.link}
              >
                <img src={profile} alt="Profile" className={headerStyles.lk} />
              </Link>
            </div>
            <div>
              <NavLink
                to="/cart"
                className={headerStyles.link}
              >
                <img src={cart} alt="Cart" className={headerStyles.cart} />
                <span className={headerStyles.cartNumber}>
                  {cartProducts.length}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
