import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {TableListAdmin} from '../componentsAdmin/TableListAdmin'
import {useMessage} from '../hooks/message.hook'


export const TableAdminPage = () => {
    const [tables, setTables] = useState([])
    const message = useMessage()

    const {loading, request, error, clearError} = useHttp()
    const {token} = useContext(AuthContext)

  
    const fetchTables = useCallback(async () => {
      try {
        const fetched = await request('/api/admin/table', 'GET', null, {
                  
        })
        setTables(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(() => {
        window.M.updateTextFields()
      }, [])

    useEffect(() => {
      fetchTables()
    }, [fetchTables])
  


    if (loading) {
      return <Loader/>
    }
  
    return (
      <>
        {!loading && <TableListAdmin tables={tables} />}
      </>
    )
  }
  