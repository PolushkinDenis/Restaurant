import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

import {NavLink, useHistory} from 'react-router-dom'



export const WaitersAdmin = ({ waiters }) => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [waiter, setwWiters] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  if (!waiters.length) {
    return <p className="center">Нет официантов</p>
  }

  return (
    <div className="menuslist">
      <div className="menu"><h2>Официанты</h2> </div>
      <div className="add-button">
      <NavLink to="/admin/waiter/add">Добавить официанта</NavLink>
      </div>
      <div className="menu_grid">
       { waiters.map((waiter, index) => {
          return (
              <div>
                  <table class="table">
            <tr>
                <th>Имя;</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Логин</th>
            </tr>
            <tr>
                <td>{waiter.name}</td>
                <td>{waiter.sourname}</td>
                <td>{waiter.tel}</td>
                <td>{waiter.login}</td>
            </tr>
        </table>
        </div>
       )})} 
       </div>
    </div>
  )
}
