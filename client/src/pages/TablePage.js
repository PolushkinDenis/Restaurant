import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {TableListAdmin} from '../componentsAdmin/TableListAdmin'
import {useMessage} from '../hooks/message.hook'


export const TablePage = () => {
    const [tables, setTables] = useState([])
    const message = useMessage()
    const [table, setTable] = useState('')

    const {loading, request, error, clearError} = useHttp()
    const {token} = useContext(AuthContext)

  
    const fetchTables = useCallback(async () => {
      try {
        const fetched = await request('/api/table', 'GET', null, {
                  
        })
        setTables(fetched)
      } catch (e) {}
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

    const setReservation = async () => {
        try {
            const data = await request(`/api/table/${table._id}`, 'PUT', { table }
            )
            fetchTables()
        } catch (e) {fetchTables() }
    }
  
    const checkBooked = (tables) => {
        if (tables.booked == false) {
            return (
                <div>
                    <p>Не забронировано</p>
                    <div className="Menu_price">
                    <input
                            placeholder="Забронировать"
                            id={tables._id}
                            type="button"
                            value="Забронировать"
                            onFocus={e => setTable(tables)}
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
                  
                    </div>
                </div>
            )
        }
    }


    if (loading) {
      return <Loader/>
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
    )
  }
  