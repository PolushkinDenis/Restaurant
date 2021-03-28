import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { useMessage } from '../hooks/message.hook'


export const TableWaiterPage = () => {
  const [tables, setTables] = useState([])
  const message = useMessage()
  const [table, setTable] = useState('')

  const { loading, request, error, clearError } = useHttp()
  const { token } = useContext(AuthContext)


  const fetchTables = useCallback(async () => {
    try {
      const fetched = await request('/api/waiter/table', 'GET', null, {

      })
      setTables(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  useEffect(() => {
    fetchTables()
  }, [fetchTables])

  if (loading) {
    return <Loader />
  }
  const cancelReservation = async () => {
    try {
      const data = await request(`/api/waiter/table/${table._id}`, 'PUT', {table},)
      fetchTables()
    } catch (e) {
      alert("Не удалось снять бронь")

    }
  }
  const setReservation = async () => {
    try {
      const data = await request('/api/admin/table/^id', 'PUT', null,)

    } catch (e) { }
  }

  const checkBooked = (table) => {
    if (table.booked == false) {
      return (
        <div>
          <p>Свободно</p>
          <div className="Menu_price">
            <input
              placeholder="Забронировать"
              id={table._id}
              type="button"
              value="Забронировать"
              onFocus={e => setTable(table)}
              onClick={setReservation}
            >
            </input>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <p>Забронировано</p>
          <div className="Menu_price">
            <input
              placeholder="Снять бронь"
              id={table._id}
              type="button"
              value="Снять бронь"
              onFocus={e => setTable(table)}
              onClick={cancelReservation}
            >
            </input>
          </div>
        </div>
      )
    }
  }
  if (!tables.length) {
    return <p className="center">Список столов пуст</p>
}
  return (
    <div className="menuslist">
      <div className="menu"><h2>Столы</h2> </div>
      <div className="add-button">
      </div>

      <div className="Menu">
        <div className="Menu_grid">
          {tables.map((table, index) => {
            return (
              <div className="Menu_forma">
                <div className="menu_position_main">
                  <div className="menu_position">
                    <p className="menu_position_name">Номер стола: {table.name}</p>
                    <p className="menu_position_description">Количество мест: {table.seat}</p>
                  </div>
                  <div className="menu_position_price">
                    <p className="position_price">{checkBooked(table)} </p>
                  </div>
                </div>
                <div className="Menu_image">
                  <img src={process.env.PUBLIC_URL + table.photo}></img>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>

    /*  <>
        {!loading && <TableWaiterPage tables={tables} />}
      </>*/
  )
}