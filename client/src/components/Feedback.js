import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import '../css/allStyle.css'

import img1 from '../images/feedback.jpg'

export const Feedback = ({ feedbacks }) => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [feedback, setfeedback] = useState('')
  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  if (!feedbacks.length) {
    return <p className="center">Отзывы еще никто не оставлял</p>
  }
  // -------------------------------------------------------------
  
  // -------------------------------------------------------------

  return (
    <div className="feedback">
      <div><img src={img1}></img></div>
      <h2>Ваши отзывы</h2>
        { feedbacks.map((feedbacks, index) => {
        return (
          <div className="forma">

          <div className="forma_text">
            <p>Отзыв {index + 1}</p>
            <b>{feedbacks.name}</b>
            <p>{feedbacks.comment}</p>
            </div>
            </div>

        )
      }) }
      <div>
   {/* <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Имя</th>
        <th>Отзыв</th>
      </tr>
      </thead>
      <tbody>
      { feedbacks.map((feedbacks, index) => {
        return (
          <tr key={feedbacks._id}>
            <td>{index + 1}</td>
            <td>{feedbacks.name}</td>
            <td>{feedbacks.comment}</td>
          </tr>
        )
      }) }
      </tbody>
    </table> */}
    </div>
    </div>
  )
}