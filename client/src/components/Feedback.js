import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import '../css/allStyle.css'
import '../css/feedback.css'

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
        {/* { feedbacks.map((feedbacks, index) => {
        return (
          <div className="forma">

          <div className="forma_text">
            <p>Отзыв {index + 1}</p>
            <b>{feedbacks.name}</b>
            <p>{feedbacks.comment}</p>
            </div>
            </div>
        )
      }) } */}
      <div>

      <div class="row">
      { feedbacks.map((feedbacks, index) => {
        return (
          <div class="col">
            <div class="testimonial">
            <img src={process.env.PUBLIC_URL + "/avatar-man.png"}  alt="аватар"></img>
              <div class="name">{feedbacks.name}</div>
              <p>{feedbacks.comment}</p>
          </div>
          </div>
  )
}) }
        </div>
        
    </div>
    </div>
  )
}