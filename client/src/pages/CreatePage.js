import React, { useContext, useEffect, useState } from 'react'
import {useHttp} from '../hooks/http.hook'

import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import '../css/allStyle.css'
import img11 from '../images/11.jpg'
import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'

export const CreatePage = () => {
  /*const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      alert("enter")
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch (e) { }
    }
  }*/
  const message = useMessage()

  const { loading, request } = useHttp()
  const [form, setForm] = useState({
    name: '', comment: ''
  })

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const registerHandler = async () => {
    try {
      const data = await request('/api/create/create', 'POST', {...form})
      message(data.message)
      
    } catch (e) {
      alert("Error");
    }
  }

  return (
    <div className="row">
      {/* <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div> */}
      <div>
        <div class="container1">
          <div className="img11">
            <img src={img11}></img>
          </div>
          <h2 class="section-title">О ресторане</h2>
          <div class="about__descr">
            <p>
              В основе концепции ресторанов London лежит идея объединения нескольких популярных трендов таких, как «Seafood Bar»,
              «Стейк-хаус», «Крафтовый бар» и «Винный бар» в одно целое: широкий выбор блюд, чтобы угодить как ценителям мяса, так  и
              не оставить голодными любителей рыбы и морепродуктов в дополнении  с широкой линейкой алкоголя разной крепости, начиная
              от настоек собственного приготовления, заканчивая  крафтовым пивом и богатой картой вин.
 		      	</p>
            <p>
              <b>Формат</b>
              <p>  В ресторанах London действует меню и карта бара, где все цены равны себестоимости.
              Вы также можете воспользоваться меню и картой бара с привычными ценами для ресторана на каждый день.
                </p>
            </p>
          </div>

        </div>
      </div>
      <div class="container1">
        <div className="Shef">
          <div className="zagolovok">
            <b>Шеф-повар рекомендует</b>
          </div>
          <div className="forImage">
            <img src={img1}></img>
            <img src={img2}></img>
            <img src={img3}></img>
          </div>
        </div>
      </div>
      <div>
        <b>Оставить отзыв</b>
        <div className="foGrid">
          <div className="info">
            <p>
              Нам действительно важно, чтобы каждый ваш визит в наш Ресторан  приносил только самые приятные эмоции! Поделитесь,
              ожалуйста, своими впечатлениями и только вместе мы сможем сделать наш ресторан еще лучше!
            </p>
          </div>
          <div className="formy">
            <input
              placeholder="Ваше имя"
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={changeHandler}
            />
            <input
              placeholder="Отзыв"
              id="comment"
              type="text"
              name="comment"

              //value={comment}
              //onChange={e => setLink(e.target.value)}
              //onKeyPress={pressHandler}
              value={form.comment}
              onChange={changeHandler}
            />
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                style={{ marginRight: 10 }}
                onClick={registerHandler}
                disabled={loading}

              >
                Отправить
            </button>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
