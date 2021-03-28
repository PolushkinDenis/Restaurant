import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {WaitersAdmin} from '../componentsAdmin/WaitersAdmin'

export const WaitersAdminPage = () => {
    const [waiters, setWaiters] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

  
    const fetchWaiters = useCallback(async () => {
      try {
        const fetched = await request('/api/admin/waiter', 'GET', null, {
          
        
        })
        setWaiters(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
        fetchWaiters()
    }, [fetchWaiters])
  
    if (loading) {
      return <Loader/>
    }
  
    return (
      <>
        {!loading && <WaitersAdmin waiters={waiters} />}
      </>
    )
  }