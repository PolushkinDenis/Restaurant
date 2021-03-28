import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import { Loader } from '../components/Loader'
import { MenuAddAdmin } from '../componentsAdmin/MenuAddAdmin'
import { NavLink, useHistory } from 'react-router-dom'
import '../css/menu.css'

export const TableListAdmin = ({ tables }) => {
    const message = useMessage()

    const auth = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp()
    const [table, setTable] = useState('')
    const [form, setForm] = useState({
        name: '', seat: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(() => {
        window.M.updateTextFields()
      }, [])
    if (!tables.length) {
        return <p className="center">Список столов пуст</p>
    }



    const cancelReservation = async () => {
        try {
            alert("Снятие брони")
            const data = await request('/api/admin/table/^id', 'Delete', null,)
            alert("Бронь снята")

        } catch (e) {
            alert("Не удалось снять бронь")

        }
    }
    const setReservation = async () => {
        try {
            alert("Бронирование")
            const data = await request('/api/admin/table/^id', 'Delete', null,)
            alert("Забронировано")

        } catch (e) {}
    }
    const checkBooked = (booked) => {
        if (booked == false) {
            return (
                <div>
                    <p>'Не забронировано'</p>
                    <div className="Menu_price">
                        <input
                            placeholder="Номер стола"
                            id={table._id}
                            type="button"
                            value="Снять бронь"
                            onFocus={e => setTable(e.target.id)}
                            onClick={cancelReservation}
                        >
                        </input>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>'Забронировано'</p>
                    <div className="Menu_price">
                        <input
                            placeholder="Номер стола"
                            id={table._id}
                            type="button"
                            value="Забронировать"
                            onFocus={e => setTable(e.target.id)}
                            onClick={setReservation}
                        >
                        </input>
                    </div>
                </div>
            )
        }
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/admin/table/create', 'POST', { ...form })
            message(data.message)

        } catch (e) {}
    }

    return (
        <div className="menuslist">
            <div className="menu"><h2>Столы</h2> </div>
            <div className="add-button">
                <NavLink to="/admin/menu/add">Добавить</NavLink>
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
                                        <p className="position_price">{checkBooked(table.booked)} </p>
                                    </div>
                                </div>
                                <div className="Menu_image">
                                    <img src={process.env.PUBLIC_URL + table.photo}></img>
                                </div>
                            </div>
                        )
                    })}
                    <div className="Menu_forma">
                        <div className="menu_position_main">
                            <div className="menu_position">
                                <p className="menu_position_name">
                                    <input
                                        placeholder="Номер стола"
                                        id="name"
                                        type="text"
                                        name="name"
                                        //onKeyPress={pressHandler}
                                        value={form.name}
                                        onChange={changeHandler}
                                    />
                                </p>
                                <p className="menu_position_description">
                                    <input
                                        placeholder="Количество мест"
                                        id="seat"
                                        type="text"
                                        name="seat"
                                        //onKeyPress={pressHandler}
                                        value={form.seat}
                                        onChange={changeHandler}
                                    />
                                </p>
                            </div>
                            <div className="menu_position_price">
                                <p className="position_price">
                                    <button
                                        className="btn yellow darken-4"
                                        style={{ marginRight: 10 }}
                                        onClick={registerHandler}
                                        disabled={loading}
                                    >
                                        Добавить стол
                                    </button>
                                </p>

                            </div>
                        </div>
                        <div className="Menu_image">
                           <p>Здесь надо добавть фото</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}