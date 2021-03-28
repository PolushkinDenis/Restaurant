import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper grey darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo"><NavLink to="/create">London</NavLink></span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {/* <li><NavLink to="/create">Создать</NavLink></li> */}
          {/* <li><NavLink to="/links">Ссылки</NavLink></li> */}
          {/* <li><NavLink to="/links">Ссылки</NavLink></li> */}
          <li><NavLink to="/menu">Меню</NavLink></li>
          <li><NavLink to="/table">Забронировать стол</NavLink></li>
          <li><NavLink to="/feedback">Отзывы</NavLink></li>
          <li><NavLink to="/cart">Корзина</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>

     
    </nav>
  )
}
