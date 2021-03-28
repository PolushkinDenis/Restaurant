import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

import {NavLink, useHistory} from 'react-router-dom'



export const MenuAddAdmin = ({ menus }) => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [cart, setCart] = useState('')
    useEffect(() => {
      window.M.updateTextFields()
    }, [])
    if (!menus.length) {
      return <p className="center">Меню пусто</p>
    }
  
  
    
    const pressHandler = async () => {
      try {
          const data = await request('/api/admin/menus', 'POST', {name: cart}, {
            Authorization: `Bearer ${auth.token}`
          })
        } catch (e) { 
          alert("Не удалось добавить товар в корзину")
      }
    }
  
    // -------------------------------------------------------------
    return (
      <div className="menuslist">
        <div className="menu"><h2>Добавление товара</h2> </div>
     
       
        <div className="menus">
          <div>
            <input> 
              
            </input>
          </div>
        </div>
 
         </div>
    )
}
