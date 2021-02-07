import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {MenusList} from '../components/MenusList'

export const MenusPage = () => {
    const [menus, setMenus] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

  
    const fetchMenus = useCallback(async () => {
      try {
        const fetched = await request('/api/menu', 'GET', null, {
          
         // Authorization: `Bearer ${token}`
        
        })
        setMenus(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
      fetchMenus()
    }, [fetchMenus])
  
    if (loading) {
      return <Loader/>
    }
  
    return (
      <>
        {!loading && <MenusList menus={menus} />}
      </>
    )
  }
  