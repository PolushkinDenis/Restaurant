import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {useHistory} from 'react-router-dom'
import {Cart} from '../components/Сart'

/*export const CartPage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [cart, setCart] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/cart/generate', 'POST', {name: cart}, {
          Authorization: `Bearer ${auth.token}`
        })
       // history.push(`/detail/${data.cart._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
            placeholder="Название блюда"
            id="cart"
            type="text"
            value={cart}
            onChange={e => setCart(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="cart">Название блюда</label>
        </div>
      </div>
    </div>
  )
}*/
export const CartPage = () => {
  const [carts, setCart] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)


  const fetchCarts = useCallback(async () => {
    try {

      const fetched = await request('/api/cart', 'GET', null, { 
        Authorization: `Bearer ${token}` 
      })
      setCart(fetched)
    } catch (e) {
      alert("Error")

    }
  }, [token, request])

  useEffect(() => {
    fetchCarts()
  }, [fetchCarts])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <Cart carts={carts} />}
    </>
  )
}

