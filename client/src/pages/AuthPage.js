import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { NavLink, useHistory } from 'react-router-dom'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import img1 from '../images/register.jpg'
import '../css/allStyle.css'
import '../css/auth.css'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    logun: '', password: ''
  })
  const [liginError, setLoginError] = useState([])
 

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
    // if (form.logun == '' || form.password == '') {
    //   setLoginError('Необходимо заполнить все поля')
    //   return;
    // }
    try { 
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId, data.isAdmin)
    } catch (e) {}
  }

  return (

    <div className="row">
      <div className="auth">
        <h1>London</h1>
        <div className="">
          <div className="auth-input">
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
              className="auth-btn btn yellow darken-4"
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <div>
          
            </div>
           <div className="auth-link"> <NavLink to="/registration">Зарегистрироваться</NavLink></div>
          </div>
        </div>
      </div>
    </div>
  )
}
