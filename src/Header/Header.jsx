import { Link } from 'react-router-dom'
import headerStyles from './header.module.css'
import logo from '../images/DOGFOOD.png'

export function Header() {
  return (
    <header className={headerStyles.wr}>
      <nav>
        <ul className={headerStyles.headerMenu}>
          <li>
            <Link to="/"><img src={logo} alt="DogFood" className={headerStyles.logo} /></Link>
          </li>
          <li>
            <Link to="/signin" className={headerStyles.link}>
              <button type="button" className={headerStyles.btn}>
                Войти
              </button>
            </Link>
          </li>
          <li>
            <Link to="/signup" className={headerStyles.link}>
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
