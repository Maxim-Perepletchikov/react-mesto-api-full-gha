import { Route, Routes } from 'react-router-dom'
import logo from '../images/header-logo.svg'
import { Link } from 'react-router-dom'

export default function Header({userEmail, onLogout}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <Routes>
        <Route
          path="/signup"
          element={
            <Link to={'/signin'} className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/signin"
          element={
            <Link to={'/signup'} className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route 
          path='/'
          element={
            <div className='header__user-info'>
              <p className='header__user-email'>{userEmail}</p>
              <button className='header__logout' onClick={onLogout}>Выйти</button>
            </div>
          }
        />
      </Routes>
    </header>
  )
}
