import { Link } from 'react-router-dom'
import mainStyles from './main.module.css'

export function Main() {
  return (

    <div className={mainStyles.wr}>
      <h3> Добро пожаловать!</h3>
      <p>Здесь вы можете приобрести все, чтобы порадовать вашего питомца.</p>
      <Link to="/products">
        <button type="button" className={mainStyles.btn}>Каталог</button>
      </Link>
    </div>
  )
}
