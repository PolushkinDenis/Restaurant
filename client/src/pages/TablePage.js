import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { TableListAdmin } from '../componentsAdmin/TableListAdmin'
import { useMessage } from '../hooks/message.hook'
import '../css/table.css'
export const TablePage = () => {
    const [tables, setTables] = useState([])
    const message = useMessage()
    const [table, setTable] = useState('')
    const [date, setDate] = useState('')

    const { loading, request, error, clearError } = useHttp()
    const { token } = useContext(AuthContext)


    const fetchTables = useCallback(async () => {
        try {
            const fetched = await request('/api/table', 'GET', null, {

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

    const setReservation = async () => {
        try {
            const data = await request(`/api/table/${table._id}`, 'PUT', { table }
            )
            fetchTables()
        } catch (e) { fetchTables() }
    }

    const checkBooked = (tables) => {
        if (tables.booked == false) {
            return (
                    <div className="Menu_price">

                        <label for="start">Выберите дату:</label>

                        <input type="date" id="start" name="trip-start"
                            value="2021-03-30"
                            min="2021-03-29" max="2022-12-31">
                           
                        </input>
                        
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
        return <Loader />
    }

    class Welcome extends React.Component {
        render() {
            return <p>Задать дату и время</p>;
        }
    }

    return (
        <div className="menuslist">
            <div className="table-image"><h2>Столы</h2> </div>
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
