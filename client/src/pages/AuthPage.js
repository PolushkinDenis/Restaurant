import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { NavLink, useHistory } from 'react-router-dom'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import img1 from '../images/register.jpg'
import '../css/allStyle.css'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    logun: '', password: ''
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

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      /*console.log(data.token)
      console.log(data.userId)
      console.log(data.isAdmin)*/
      auth.login(data.token, data.userId, data.isAdmin)
    } catch (e) {}
  }

  return (

    <div className="row">
              <div className="regisImg"><img src={img1}></img></div>
      <div className="col s6 offset-s3">
        <h1>London</h1>
        <div className="card grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите логин"
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
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
           <div> <NavLink to="/registration">Зарегистрироваться</NavLink></div>
{/* 
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
