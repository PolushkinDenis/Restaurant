import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { MenusListAdmin } from '../componentsAdmin/MenusListAdmin'
import '../css/menuAdmin.css'
export const MenusAdminPage = () => {
  const [menus, setMenus] = useState([])
  const [items, setItems] = useState([])

  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)


  const fetchMenus = useCallback(async () => {
    try {
      const fetched = await request('/api/admin/menu', 'GET', null, {

        // Authorization: `Bearer ${token}`

      })
      setMenus(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchMenus()
  }, [fetchMenus])

  const remotePosition = async () => {
    try {
      const data = await request(`/api/admin/menu/${items}`, 'DELETE', { items }
      )
      fetchMenus()
    } catch (e) { }
  }



  /*if (loading) {
    return <Loader/>
  }*/


  return (
    <div className="menuslist">
      <div className="menu"><h2>Меню</h2> </div>
      <div className="Menu">
      <div className="add-button yellow darken-4">
        <NavLink to="/admin/menu/add">Добавить</NavLink>
      </div>
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
                  <input
                        className="btn red"
                        placeholder="Название блюда"
                        id={menu._id}
                        type="button"
                        value="Удалить"
                        onFocus={e => setItems(e.target.id)}
                        onClick={remotePosition}
                      >
                      </input>
                  </div>
                </div>
          
              </div>
              <div className="Menu_image">
              <img src={process.env.PUBLIC_URL + menu.photo}></img>
              </div>
            </div>
          )
        })}
      </div>
    </div>


      {/* <div className="Menu">
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
                        onFocus={e => setItems(e.target.id)}
                        onClick={remotePosition}
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
      </div> */}
    </div>


    /*<>
      {!loading && <MenusListAdmin menus={menus} />}
    </>*/
  )
}
