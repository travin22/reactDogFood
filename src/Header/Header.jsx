import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { AppContext, AppSetContext } from '../context/AppContextProvider'
import headerStyles from './header.module.css'
import logo from '../images/DOGFOOD.png'

export function Header() {
  const { token } = useContext(AppContext)
  const { setToken, setUserID } = useContext(AppSetContext)
  const { clearClient } = useQueryClient(QueryClientProvider)

  function logoutHandler() {
    setToken('')
    setUserID('')
    setTimeout(clearClient)
  }

  return (
    <header className={headerStyles.wr}>
      <nav>
        <ul className={headerStyles.headerMenu}>
          <li>
            <Link to="/"><img src={logo} alt="DogFood" className={headerStyles.logo} /></Link>
          </li>
          {token ? (
            <li>
              <Link
                to="/signin"
                className={headerStyles.link}
              >
                <button onClick={logoutHandler} type="button" className={headerStyles.btn}>
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
                <button onClick={logoutHandler} type="button" className={headerStyles.btn}>
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
        </ul>
      </nav>
    </header>
  )
}
