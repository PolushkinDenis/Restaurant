import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import { NavLink, useHistory } from 'react-router-dom'

import {WaitersAdmin} from '../componentsAdmin/WaitersAdmin'

export const WaitersAdminPage = () => {
    const [waiters, setWaiters] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [deleteWaiters, setDeleteWaiters] = useState([])

    const auth = useContext(AuthContext)
    const [waiter, setwWiters] = useState('')
  
    const fetchWaiters = useCallback(async () => {
      try {
        const fetched = await request('/api/admin/waiter', 'GET', null, {        
        })
        setWaiters(fetched)
      } catch (e) {}
    }, [token, request])


    useEffect(() => {
      fetchWaiters()
    }, [fetchWaiters])
  
    const remoteWaiters = async () => {
      try {
        const data = await request(`/api/admin/waiters/${deleteWaiters}`, 'DELETE', { deleteWaiters }
        )
        fetchWaiters()
      } catch (e) { }
    }

    if (!waiters.length) {
      return <p className="center">Нет официантов</p>
    }
    

    if (loading) {
      return <Loader/>
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
              <th className="tableButton"></th>
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
              <td className="tableButton">  <input
                        className="btn red"
                        placeholder="Название блюда"
                        id={waiter._id}
                        type="button"
                        value="Удалить"
                        onFocus={e => setDeleteWaiters(e.target.id)}
                        onClick={remoteWaiters}
                      >
                      </input></td>

            
            </tr>
          )
        })}
    </div>
    )
  }