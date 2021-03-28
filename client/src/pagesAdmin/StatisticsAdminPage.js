import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {StatisticsAdmin} from '../componentsAdmin/StatisticsAdmin'

export const StatisticsAdminPage = () => {
    const [statistics, setStatistics] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

  // надо будет получать данные из бд со статитикой
    const fetchStatistics = useCallback(async () => {
      try {
        const fetched = await request('/api/statistics', 'GET', null, {
          
         // Authorization: `Bearer ${token}`
        
        })
        setStatistics(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
        fetchStatistics()
    }, [fetchStatistics])
  
    if (loading) {
      return <Loader/>
    }
  
    return (
      <>
        {!loading && <StatisticsAdmin statistics={statistics} />}
      </>
    )
  }
 