import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

import { NavLink, useHistory } from 'react-router-dom'
import '../css/menu.css'
import img1 from '../images/Гамбургер.jpg'
import img2 from '../images/cola.jpg'
import img3 from '../images/menu_images/1.jpg'


export const MenusListAdmin = ({ menus }) => {
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [cart, setCart] = useState('')
  const [menu, setMenu] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  if (!menus.length) {
    return <p className="center">Меню пусто</p>
  }

  const removeProduct = async () => {
    try {
      const id_url = menu.toString();
      alert("ty Удалено" + {name : menu})
      const data = await request('/api/admin/menu/:604b56496f419f2024b5cc6d', 'GET', null,)
      
      alert("Удалено")
    } catch (e) {
      alert("Не удалось удалить")

    }
  }

  const pressHandler = async () => {
    try {
      const data = await request('/api/admin/menus', 'POST', { name: cart }, {
        Authorization: `Bearer ${auth.token}`
      })
    } catch (e) {
      alert("Не удалось добавить товар в корзину")
    }
  }

  // -------------------------------------------------------------
  return (
    <div className="menuslist">
      <div className="menu"><h2>Меню</h2> </div>
      <div className="add-button">
        <NavLink to="/admin/menu/add">Добавить</NavLink>
      </div>

      <div className="Menu">
        <div className="Menu_grid">
          {menus.map((menu, index) => {
            return (
              <div className="Menu_forma">
                <div className="menu_position_main">
                  <div className="menu_position">
                    <p className="menu_position_name">{menu.name}</p>
                    <p className="menu_position_description">{menu.structure}</p>
                  </div>
                  <div className="menu_position_price">
                    <p className="position_price">{menu.price} ₽</p>
                    <div className="Menu_price">
                      <input
                        placeholder="Название блюда"
                        id={menu._id}
                        type="button"
                        value="Удалить"
                        onFocus={e => setMenu(e.target.id)}
                        onClick={removeProduct}
                      >
                      </input>
                    </div>
                  </div>
                </div>
                <div className="Menu_image">
    
                  <img src={require('../images/menu_images/1.jpg')}></img>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* <div className="menu_grid">
       { menus.map((menu, index) => {
          return (
      <div className="menus">
        <div>
          <b>{menu.name}</b> <p>Масса: {menu.weight}</p> <p>Состав {menu.structure}</p>
          <p>Цена {menu.price}</p>
          <button
           onClick = {() => removeProduct(menu._id)}
           >
             Удалить
          </button>
          <input 
            placeholder="Название блюда"
            id="cart"
            type="button"
            value={menu._id}
            onFocus={e => setCart(e.target.value)}
            onClick={pressHandler}
            >
            </input>
        </div>
      </div>
       )})} 
       </div> */}
    </div>
  )
}
