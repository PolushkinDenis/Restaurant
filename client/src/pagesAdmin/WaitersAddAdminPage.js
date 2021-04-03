import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import img1 from '../images/register.jpg'
import '../css/allStyle.css'

export const WaitersAddAdminPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    name: '', surname: '', login: '', tel: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/registerWaiters', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  return (

    <div className="row">
      <div className="auth">
        <h1>London</h1>
        <div className="">
          <div className="auth-input">
            <span className="card-title">Добавить официанта</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Имя"
                  id="name"
                  type="text"
                  name="name"
                  className="yellow-input"
                  value={form.name}
                  onChange={changeHandler}
                />
              </div>
              <div className="input-field">
                <input
                  placeholder="Фамилия"
                  id="surname"
                  type="text"
                  name="surname"
                  className="yellow-input"
                  value={form.surname}
                  onChange={changeHandler}
                />
              </div>
              <div className="input-field">
                <input
                  placeholder="Логин"
                  id="login"
                  type="text"
                  name="login"
                  className="yellow-input"
                  value={form.login}
                  onChange={changeHandler}
                />
              </div>
              <div className="input-field">
                <input
                  placeholder="Телефон"
                  id="tel"
                  type="text"
                  name="tel"
                  className="yellow-input"
                  value={form.tel}
                  onChange={changeHandler}
                />
              </div>
              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
              </div>
               <div className="input-field">
                <input
                  placeholder="Повторите пароль"
                  id="repead_password"
                  type="password"
                  name="repead_password"
                  className="yellow-input"
                  //value={form.password}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Зарегистрировать
            </button>
            <div><a href="/admin/waiter">Назад</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}
