import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {Feedback} from '../components/Feedback'

export const FeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

  
    const fetchFeedbacks = useCallback(async () => {
      try {
        const fetched = await request('/api/feedback', 'GET', null, {
          
         // Authorization: `Bearer ${token}`
        
        })
        setFeedbacks(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
      fetchFeedbacks()
    }, [fetchFeedbacks])
  
    if (loading) {
      return <Loader/>
    }
  
    return (
      <>
        {!loading && <Feedback feedbacks={feedbacks} />}
      </>
    )
  }
  