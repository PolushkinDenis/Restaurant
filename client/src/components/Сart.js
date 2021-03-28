import React, {useCallback, useContext, useEffect, useState } from 'react'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'

import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import img1 from '../images/cart.jpg'
import item1 from '../images/menu_images/1.jpg'

export const Cart = ({ carts }) => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const [removeCart, setCart] = useState('')
  const {token} = useContext(AuthContext)
  const { loading, request, } = useHttp()
  if (!carts.length) {
    return <p className="center">Вы еще ничего не заказали</p>
  }


  const sum = () => {
    var sum = 0;
    var i = 0;
    while (i < carts.length) {
      sum += carts[i].price
      i++;
    }
    return sum
  }

  const makeOrder = async () => {
    try {
      const data = await request('/api/order', 'POST', { carts }, {
        Authorization: `Bearer ${auth.token}`
      }
      )
    } catch (e) { }
  }



  const remotePosition = async () => {
    try {
      const data = await request(`/api/cart/${removeCart}`, 'DELETE', {removeCart}
      )
      window.location.reload(); 

    } catch (e) { }
  }


  /*const removeUser = () => {
    const requestOptions = {
      mode:'no-cors',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`http://localhost:5000/api/cart/${removeCart}`, requestOptions)
      .then(response => response.json())
      .catch(data => console.log(data));
  }*/

  return (
    <div className="cart">
      <img src={img1}></img>
      <div className="feedback">
        <h2>Корзина</h2>
      </div>
      { carts.map((carts, index) => {
        return (
          <div className="forma">
            <div className="forma_text">
              <p>Товар {index + 1}</p>
              <b>{carts.name}</b>
              <p>{carts.price}</p>
              <input
                placeholder="Название блюда"
                id={carts._id}
                type="button"
                value="Удалить"
                onFocus={e => setCart(e.target.id)}
                onClick={remotePosition}
              >
              </input>
            </div>
          </div>
        )
      })}
      <div>
        <p>Сумма заказа: {sum()}</p>
        <button
          className="btn grey lighten-1 black-text"
          onClick={makeOrder}
          disabled={loading}
        >
          Заказать
            </button>
      </div>

      {/* ------------------------Второй вариант формления -------------------------------/}
      {/* <h2 class="order_title">Ваш заказ</h2>
      <div className="cart_form">
        {carts.map((carts, index) => {
          return (

            <div class="order_product__FTKsp">
              <div class="order_productVisualBlock__2a0fa">
                <div class="order_photoContainer__2ZiNI">
                  <img src={item1} class="order_photo__1XZVz" alt={carts.name}></img>
                </div>
                <div class="order_productInfo__1DAnZ">
                  <div class="order_productTitleWrapper__2aNjz">
                    <p class="order_productName__2iZJa">{carts.name}</p>
                  </div>
                  <div class="order_costAndQuantityWrapper__14v6I">
                    <button class="order_quantityButton__3vTF7">-</button>
                    <button class="order_quantityButton__3vTF7">+</button>
                    <p class="order_cost__LT3CM">{carts.price}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}


    </div> */}
    </div >
  )
}


