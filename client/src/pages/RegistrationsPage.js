import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import img1 from '../images/register.jpg'
import '../css/allStyle.css'

export const RegistrationsPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    name: '', login: '', tel: '', password: ''
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

      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  return (

    <div className="row">
      <div className="auth">
        <h1>London</h1>
        <div className="">
          <div className="auth-input">
            <span className="card-title">Регистрация</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Как вас зовут?"
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
                  placeholder="Придумайте логин"
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
                  placeholder="Ваш телефон"
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
              className="auth-btn btn yellow darken-4"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
            <div className="auth-link"><a href="/">Назад</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}
