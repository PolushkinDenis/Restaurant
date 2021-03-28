import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const NavbarWaiter = () => {
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
        <span className="brand-logo"><NavLink to="/waiter/order">London</NavLink></span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/waiter/order">Заказы</NavLink></li>
          <li><NavLink to="/waiter/table">Столы</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>

     
    </nav>
  )
}
