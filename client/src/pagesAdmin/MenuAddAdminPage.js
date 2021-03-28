import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {MenuAddAdmin} from '../componentsAdmin/MenuAddAdmin'

import img11 from '../images/11.jpg'
import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'

export const MenusAddAdminPage = () => {
   
    const message = useMessage()

  const { loading, request } = useHttp()
  const [form, setForm] = useState({
    name: '', price: '', type: '', weight: '', structure: ''
  })

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  
  const registerHandler = async () => {
    try {
      const data = await request('/api/admin/menu/add/create', 'POST', {...form})

      message(data.message)
      
    } catch (e) {
      alert("Ошибка добавления");
    }
  }

  return (
    <div className="row">

        <b>Добавить продукт</b>
        <div className="foGrid">

          <div className="formy">
            <input
              placeholder="Название"
              id="name"
              type="text"
              name="name"
              //value={name}
              //onChange={e => setLink(e.target.value)}
              //onKeyPress={pressHandler}
              value={form.name}
              onChange={changeHandler}
            />
             <input
              placeholder="Цена"
              id="price"
              type="text"
              name="price"
              value={form.price}
              onChange={changeHandler}
            />
              <input
              placeholder="Тип"
              id="type"
              type="text"
              name="type"
              value={form.type}
              onChange={changeHandler}
            />
               <input
              placeholder="Вес"
              id="weight"
              type="text"
              name="weight"
              value={form.weight}
              onChange={changeHandler}
            />
             <input
              placeholder="Состав"
              id="structure"
              type="text"
              name="structure"
              value={form.structure}
              onChange={changeHandler}
            />
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                style={{ marginRight: 10 }}
                onClick={registerHandler}
                disabled={loading}
              >
                Добавить
            </button>

            </div>
          </div>
        </div>
      </div>


  )
  }
  