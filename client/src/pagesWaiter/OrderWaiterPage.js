import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { useMessage } from '../hooks/message.hook'
import '../css/orderWaiterPage.css'


export const OrderWaiterPage = () => {
    const [orders, setOrders] = useState([])
    const message = useMessage()

    const { loading, request, error, clearError } = useHttp()
    const { token } = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const [preparingOrder, setPreparingOrder] = useState('')


    const fetchOrders = useCallback(async () => {
        try {
            const fetched = await request('/api/waiter/order', 'GET', null, {
                Authorization: `Bearer ${token}`

            })
            setOrders(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    if (loading) {
        return <Loader />
    }

   
  const performOrder = async () => {
    try {
      const data = await request(`/api/waiter/order/${preparingOrder._id}`, 'PUT', {preparingOrder}
      )
      fetchOrders()
    } catch (e) { }
  }

  const sort1 = (orders) =>{
    if(orders.state == 'preparing'){
          return(
            <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table-item">
            <p class="item" width="200"> Готовится </p>
            <p class="item" width="200"> {orders.dishes}</p>
            <p class="item" width="125"> {orders.sum}</p>
            <p class="item" width="150"> {orders.name}</p>
            <p class="item" width="150"> {orders.date}</p>
            <input
                placeholder="Выполнено"
                id={orders._id}
                type="button"
                value="Выполнено"
                onFocus={e => setPreparingOrder(orders)}
                onClick={performOrder}
              >
              </input>
            </div>
          )
      }
  }
  const sort2 = (orders) =>{
    if(orders.state == 'nopaid'){
        return(
          <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table-item">
          <p class="item" width="200"> Подтвердить оплату </p>
          <p class="item" width="200"> {orders.dishes}</p>
          <p class="item" width="125"> {orders.sum}</p>
          <p class="item" width="150"> {orders.name}</p>
          <p class="item" width="150"> {orders.date}</p>
          <input
                placeholder="Подтвердить оплату"
                id={orders._id}
                type="button"
                value="Подтвердить оплату"
                onFocus={e => setPreparingOrder(orders)}
                onClick={performOrder}
              >
              </input>          </div>
        )
    }
}
const sort3 = (orders) =>{
    if(orders.state == 'paid'){
        return(
          <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table-item">
          <p class="item" width="200"> Оплачено </p>
          <p class="item" width="200"> {orders.dishes}</p>
          <p class="item" width="125"> {orders.sum}</p>
          <p class="item" width="150"> {orders.name}</p>
          <p class="item" width="150"> {orders.date}</p>
          </div>
        )
    }
}
const sort4 = (orders) =>{
    if(orders.state == 'waiting'){
        return(
          <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table-item">
          <p class="item" width="200"> Дождитесь оплаты</p>
          <p class="item" width="200"> {orders.dishes}</p>
          <p class="item" width="125"> {orders.sum}</p>
          <p class="item" width="150"> {orders.name}</p>
          <p class="item" width="150"> {orders.date}</p>
          </div>
        )
    }
}

    return (
        <div>
            <div>
            <h3>Новые заказы</h3>
                <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table">
                    <p class="item" width="200">Статус заказа</p>
                    <p class="item" width="200">Состав</p>
                    <p class="item" width="125">К оплате</p>
                    <p class="item" width="150">Имя</p>
                    <p class="item" width="150">Дата</p>
                    <p class="item" width="150"></p>
                </div>
                {orders.map((orders, index) => {
                    return(
                        <div>{sort1(orders)}</div>
                    )
                })}
        
            </div>
            <div>
            <h3>Ждет оплаты</h3>
                <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table">
                    <p class="item" width="200">Статус заказа</p>
                    <p class="item" width="200">Состав</p>
                    <p class="item" width="125">К оплате</p>
                    <p class="item" width="150">Имя</p>
                    <p class="item" width="150">Дата</p>
                    <p class="item" width="150"></p>
                </div>
                {orders.map((orders, index) => {
                    return(
                        <div>{sort4(orders)}</div>
                    )
                })}
            </div>
            <div>
            <h3>Подтвердить оплату</h3>
                <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table">
                    <p class="item" width="200">Статус заказа</p>
                    <p class="item" width="200">Состав</p>
                    <p class="item" width="125">К оплате</p>
                    <p class="item" width="150">Имя</p>
                    <p class="item" width="150">Дата</p>
                    <p class="item" width="150"></p>
                </div>
                {orders.map((orders, index) => {
                    return(
                        <div>{sort2(orders)}</div>
                    )
                })}
            </div>
            <div>
            <h3>Оплаченные заказы</h3>
                <div class="items-table__TableHeadRow-sc-1mdyazu-0 order-table">
                    <p class="item" width="200">Статус заказа</p>
                    <p class="item" width="200">Состав</p>
                    <p class="item" width="125">К оплате</p>
                    <p class="item" width="150">Имя</p>
                    <p class="item" width="150">Дата</p>
                    <p class="item" width="150"></p>
                </div>
                {orders.map((orders, index) => {
                    return(
                        <div>{sort3(orders)}</div>
                    )
                })}
        
            </div>
        </div>
        /*  <>
            {!loading && <TableWaiterPage tables={tables} />}
          </>*/
    )
}