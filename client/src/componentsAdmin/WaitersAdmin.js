import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

import { NavLink, useHistory } from 'react-router-dom'



export const WaitersAdmin = ({ waiters }) => {
  const auth = useContext(AuthContext)
  const { request } = useHttp()
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
      <div className="add-button yellow darken-4">
        <NavLink to="/admin/waiter/add">Добавить официанта</NavLink>
      </div>
        <div>
          <table class="table">
            <tr className="gridTable">
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Логин</th>
            </tr>
          </table>
        </div>
        {waiters.map((waiter, index) => {
          return (
            <tr className="gridTable">
              <td>{waiter.name}</td>
              <td>{waiter.sourname}</td>
              <td>{waiter.tel}</td>
              <td>{waiter.login}</td>
            </tr>
          )
        })}
    </div>
  )
}
