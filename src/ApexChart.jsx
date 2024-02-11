import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

export function ApexChart() {
  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "https://gist.githubusercontent.com/Jaan19867/94409f709fc77fcf484072fe1ccb46ed/raw/b080d939d57a91cf8d108c06fbac8a83ddb5deeb/stateinfo.json"
        )
        setInfo(response.data.states)
        setLoading(false)
      } catch (error) {
        console.log("Error fetching data:", error)
        setError("Error fetching data. Please try again later.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const navigateState = (state) => {
    navigate(`/state/${state}`)
  }

  const handleChartClick = (event, chartContext, config) => {
    const clickedState =
      config.series[config.seriesIndex].data[config.dataPointIndex].x
    console.log("Clicked State:", clickedState)
    navigateState(clickedState)
    alert(`You clicked on ${clickedState}!`)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (info.length === 0) return <div>No data available</div>

  const series = info.map((state) => {
    let color
    const temperature = state.temperature

    if (temperature >= 200) {
      color = "#FF0000" // Red for high temperature
    } else if (temperature >= 140) {
      color = "#00FF00" // Blue for low temperature
    } else if (temperature >= 50) {
      color = "#3492eb" // Blue for low temperature
    } else {
      color = "#0000FF" // Grey for other temperatures
    }

    return {
      name: state.name,
      data: [
        {
          x: state.name,
          y: state.temperature,
          population: state.population,
          literacyRate: state.literacyRate,
          area: state.area,
          fillColor: color, // Set the color property
        },
      ],
    }
  })

  const options = {
    legend: {
      show: false,
    },
    plotOptions: {
      treemap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: "#0000FF",
            },
            {
              from: 148,
              to: 200,
              color: "#FF007",
            },
            {
              from: 200,
              to: 300,
              color: "#FF0000",
            },
          ],
        },
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]

        return (
          "<ul>" +
          "<li><b>State:</b>: " +
          data.x +
          "</li>" +
          "<li><b>Temperature</b>: " +
          data.y +
          "</li>" +
          "<li><b>Area</b>: '" +
          data.area +
          "'</li>" +
          "<li><b>Population</b>: '" +
          data.population +
          "'</li>" +
          "</ul>"
        )
      },
    },
    chart: {
      height: 350,
      type: "treemap",
    },
    title: {
      text: "Basic Treemap",
    },
  }

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="treemap"
          height={350}
          onClick={handleChartClick}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  )
}
