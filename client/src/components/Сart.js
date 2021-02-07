import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import img1 from '../images/cart.jpg'


export const Cart = ({ carts }) => {
  if (!carts.length) {
    return <p className="center">Вы еще ничего не заказали</p>
  }

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
            </div>
            </div>

        )
      }) }
    </div>
   /*<table>
      <thead>
      <tr>
        <th>№</th>
        <th>Название</th>
      </tr>
      </thead>

      <tbody>
      { carts.map((cart, index) => {
        return (
          <tr key={carts._id}>
            <td>{index + 1}</td>
            <td>{cart.name}</td>
            <td>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>*/
  )
}