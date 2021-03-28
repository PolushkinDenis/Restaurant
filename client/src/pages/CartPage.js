import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { useHistory } from 'react-router-dom'
import { Cart } from '../components/Сart'
import '../css/card.css';
import '../css/orderWaiterPage.css'


import img1 from '../images/cart.jpg'


export const CartPage = () => {
  const [carts, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)
  ////////////////////////////////////////////
  const auth = useContext(AuthContext)

  const [removeCart, setRemoveCart] = useState('')
  const [preparingOrder, setPreparingOrder] = useState('')


  const remotePosition = async () => {
    try {
      const data = await request(`/api/cart/${removeCart}`, 'DELETE', { removeCart }
      )
      fetchCarts()
    } catch (e) { }
  }

  const makeOrder = async () => {
    try {
      const data = await request('/api/order', 'POST', { carts }, {
        Authorization: `Bearer ${auth.token}`
      }
      )
    } catch (e) { }
    try {
      const data = await request(`/api/cart/clean/${auth.userId}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.token}`
      }
      )
      fetchCarts()
      fetchOrders()
    } catch (e) {
      fetchCarts()
      fetchOrders()
    }
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

  /////////////////////////////////////////////

  const fetchCarts = useCallback(async () => {
    try {

      const fetched = await request('/api/cart', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCart(fetched)
    } catch (e) {
    }
  }, [token, request])

  useEffect(() => {
    fetchCarts()
  }, [fetchCarts])


  const fetchOrders = useCallback(async () => {
    try {
      const fetched = await request('/api/cart/order', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setOrders(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  // if (loading) {
  //   return <Loader />
  // }
  const performOrder = async () => {
    try {
      const data = await request(`/api/cart/order/${preparingOrder._id}`, 'PUT', { preparingOrder }
      )
    } catch (e) { }
  }
  const checkCart = () => {
    if (!carts.length) {
      return <p className="center">Ваша корзина пуста</p>
    }
    else {
      return <div>
        {carts.map((carts, index) => {
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
                  onFocus={e => setRemoveCart(e.target.id)}
                  onClick={remotePosition}
                >
                </input>
              </div>
            </div>
          )
        })}
        <p>Сумма заказа: {sum()}</p>
        <button
          className="btn grey lighten-1 black-text"
          onClick={makeOrder}
          disabled={loading}
        >
          Заказать
          </button>
      </div>
    }
  }
  const checkActiveOrder = () => {
    return (
      <div>{orders.map((orders, index) => {
        if (orders.state == 'preparing') {
          return (
            sort1(orders)
          )
        }
        else if (orders.state == 'waiting') {
          return (
            sort2(orders)
          )
        }

      })}
      </div>
    )
  }

  const checkOrder = () => {
    if (!orders.length) {
      return <div>Вы еще ничего не заказали</div>
    }
    else {
      return (
        <div>{orders.map((orders, index) => {
          if (orders.state == 'paid') {
            return (
              sort3(orders)
            )
          }
        })}
        </div>
      )
    }
  }

  const sort1 = (orders) => {
    return (
      <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table-item">
        <p class="item" width="200"> Состояние: Готовится </p>
        <p class="item" width="200"> Заказ: {orders.dishes}</p>
        <p class="item" width="125"> Сумма заказа:{orders.sum}</p>
        <p class="item" width="150"> Дата: {orders.date}</p>
      </div>
    )
  }
  const sort2 = (orders) => {
    return (
      <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table-item">
        <p class="item" width="200"> Состояние: Ждет оплаты </p>
        <p class="item" width="200"> Заказ: {orders.dishes}</p>
        <p class="item" width="125"> Сумма заказа:{orders.sum}</p>
        <p class="item" width="150"> Дата: {orders.date}</p>
        <input
          placeholder="Оплатить"
          id={orders._id}
          type="button"
          value="Оплатить"
          onFocus={e => setPreparingOrder(orders)}
          onClick={performOrder}
        >
        </input>
      </div>
    )
  }
  const sort3 = (orders) => {
    return (
      <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table-item">
        <p class="item" width="200"> Состояние: Оплачено </p>
        <p class="item" width="200"> Заказ: {orders.dishes}</p>
        <p class="item" width="125"> Сумма заказа:{orders.sum}</p>
        <p class="item" width="150"> Дата: {orders.date}</p>
      </div>
    )
  }


  // class GoodInput extends React.Component {
  //   render() {
  //     return (
  //       <div className="history-order">
  //         <h2>История заказов</h2>
  //       </div>
  //     )
  //   }
  // }

  return (
    <div className="cart">
      <img src={img1}></img>
      <div className="feedback">
        <h2>Корзина</h2>
        <div>
          {checkCart()}
        </div>
        <div>
          <h2>Активные заказы</h2>
          <div>{checkActiveOrder()}</div>
        </div>
        <div className="history-order">
          <h2>История заказов</h2>
          <div>
            {checkOrder()}
          </div>
        </div>
      </div>

    </div >

    /*<>
      {!loading && <Cart carts={carts} />}
    </>*/
  )
}

