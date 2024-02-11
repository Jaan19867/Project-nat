import { Line } from "react-chartjs-2"
import React, { useState, useEffect } from "react"
import { date } from "chartjs-adapter-date-fns"
import { Chart, registerables } from "chart.js"
import Axios from "axios"

function Charts({ city }) {
  const [weatherData, setWeatherData] = useState(null)
Chart.register(...registerables)
Chart.register(date)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8cae7fa94ac0d61c4401f86aed5c1657`
        )
        console.log(response.data)
        setWeatherData(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [city])

  if (!weatherData || !weatherData.list) return <div>Loading...</div>

  const labels = weatherData.list.map((data) => data.dt_txt)
  const temperatures = weatherData.list.map((data) => data.main.temp)

  // Format data for Chart.js
  const data = {
    labels: labels, // for x axis , datasets for y axis 
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const options = {
    scales: {
      x: {
        type: "time", // Use time scale for x-axis
        time: {
          unit: "hour", // Specify the time unit
          displayFormats: {
            hour: "MMM D, hA", // Format for hour-level labels
          },
        },
      },
    },
  }

  return (
    <div>
      <h2>Temperature Over Time</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default Charts
