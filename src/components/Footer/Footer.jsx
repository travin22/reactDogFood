import { Link } from 'react-router-dom'
import footerStyles from './footer.module.css'
import logo from '../../images/DOGFOOD.png'

export function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footer_container}>
        <div className={footerStyles.footer_group}>
          <img src={logo} alt="DogFood" className={footerStyles.logo} />
          <div className={footerStyles.footer_copyright}>DogFood © 2023.</div>
        </div>
        <div className={footerStyles.footer_group}>
          <div className={footerStyles.footer_links}>
            <Link to="/products" className={footerStyles.footer_links_elem}>Каталог</Link>
            <Link to="/" className={footerStyles.footer_links_elem}>Акции</Link>
            <Link to="/" className={footerStyles.footer_links_elem}>Оплата и доставка</Link>
            <Link to="/" className={footerStyles.footer_links_elem}>Контакты</Link>
          </div>
        </div>
        <div className={footerStyles.footer_group}>
          <h3>Мы на связи:</h3>
          <div className={footerStyles.footer_links}>
            +7 (495) 999-99-99
          </div>
        </div>
      </div>
    </footer>
  )
}
