import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import '../css/allStyle.css'
import { Line } from 'react-chartjs-2';


export const StatisticsAdmin = ({ statistics }) => {
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [statistic, setstatistic] = useState('')
  useEffect(() => {
    window.M.updateTextFields()
  }, [])
 
  /*f (!statistics.length) {
    return <p className="center">Нет данных для статитики</p>
  }*/
  
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    datasets: [
      {
        label: "Цена за шт.",
        data: [12, 19, 3, 5, 2, 3, 14],
        fill: false,
        backgroundColor: "#a68156",
        borderColor: "rgba(166, 129, 86, 0.2)",
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    maintainAspectRatio: false,

    tooltips: {
      mode: "index",
      intersect: false,
      caretSize: 3,

      backgroundColor: "#44200c",
      bodyFontColor: "#a68156",
      borderColor: "#877f72",
      borderWidth: 1,
      displayColors: false,

      callbacks: {
        title() {
          return "";
        },
      },
    },

    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false,
          },
        },
      ],
    },
  };


  return (
    <div className="statistics">
      <h2>Статистика</h2>
      <div>

      <div className="panel">
        <div className="city-goods">
          <div className="good-item-wrapper">
            <div className="good-item item-1"></div>
            <div className="good-item-stats">
              <Line data={data} options={options} /> 
            </div>
          </div>

          <div className="good-item-wrapper">
            <div className="good-item item-2"></div>
            <div className="good-item-stats">
              {/* <Line data={data} options={options} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
      <div>
    </div>
    </div>
  )
}