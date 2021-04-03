import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import img1 from '../images/Гамбургер.jpg'
import img2 from '../images/cola.jpg'
import img3 from '../images/salat.jpg'


export const MenusList = ({ menus }) => {
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [cart, setCart] = useState('')
  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  if (!menus.length) {
    return <p className="center">Меню пусто</p>
  }


  const pressHandler = async () => {
    try {
      const data = await request('/api/menu', 'POST', { name: cart }, {
        Authorization: `Bearer ${auth.token}`
      })
    } catch (e) {
      alert("Не удалось добавить товар в корзину")
    }
  }

  return (

    <div className="Menu">
      <h2>Меню</h2>
      <div className="Menu_grid">
        {menus.map((menu, index) => {
          return (
            <div className="Menu_forma">
              <div className="menu_position_main">
                {/* <div className="menu_position"> */}
                <div className="menu_position_1">
                  <p className="menu_position_name">{menu.name}</p>
                  <p className="menu_position_description">{menu.structure}</p>
                </div>
                <div className="menu_position_2">
                  <p className="position_price">{menu.price} ₽</p>
                  <div className="Menu_price">
                    <input className="menu_input"
                      placeholder="Название блюда"
                      id={menu._id}
                      type="button"
                      value="+"
                      onFocus={e => setCart(e.target.id)}
                      onClick={pressHandler}
                    >
                    </input>
                  </div>
                </div>
                {/* </div> */}

                {/* <div className="menu_position_price">
                    <p className="position_price">{menu.price} ₽</p>
                    <div className="Menu_price">
                      <input
                        placeholder="Название блюда"
                        id={menu._id}
                        type="button"
                        value="Добавить"
                        onFocus={e => setCart(e.target.id)}
                        onClick={pressHandler}
                      >
                      </input>
                    </div>
                  </div> */}

              </div>
              <div className="Menu_image">

              <img src={process.env.PUBLIC_URL + menu.photo}></img>
              </div>
            </div>
          )
        })}
      </div>
    </div>





    /*<table>
       <thead>
       <tr>
         <th>№</th>
         <th>Название</th>
         <th>Цена</th>
         <th>Масса</th>
         <th>Состав</th>
         <th>Заказать</th>
       </tr>
       </thead>
 
       <tbody>
       { menus.map((menu, index) => {
         return (
           <tr key={menu._id}>
             <td>{index + 1}</td>
             <td>
               <input
               placeholder="Название блюда"
               id="cart"
               type="text"
               value={menu.name}
               ></input>
               </td>
             <td>{menu.price}</td>
             <td>{menu.weight}</td>
             <td>{menu.structure}</td>
             <td><input 
             placeholder="Название блюда"
             id="cart"
             type="button"
             value={menu.name}
             onFocus={e => setCart(e.target.value)}
             onClick={pressHandler}
             >
             </input> </td>
             <td>
             </td>
           </tr>
         )
       }) }
       </tbody>
     </table>*/
  )
}
