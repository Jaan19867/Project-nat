import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import Axios from "axios"
import { Link } from "react-router-dom"

export function ApexChart() {
  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tooltipContent, setTooltipContent] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "https://gist.githubusercontent.com/Jaan19867/94409f709fc77fcf484072fe1ccb46ed/raw/b080d939d57a91cf8d108c06fbac8a83ddb5deeb/stateinfo.json"
        )
        setInfo(response.data.states)
        console.log(response.data.states)
        setLoading(false)
      } catch (error) {
        console.log("Error fetching data:", error)
        setError("Error fetching data. Please try again later.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (info.length === 0) return <div>No data available</div>


  const handleChartClick = (event, chartContext, config) => {
  
    
    alert(`You clicked on !`)
  }


  const series = info.map((state) => {
    let color
    const temperature = state.temperature

    if (temperature >= 200) {
      color = "#FF0000" // Red for high temperature
    } else if (temperature >= 140) {
      color = "#0000FF" // Blue for low temperature
    } else {
      color = "#808080" // Grey for other temperatures
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
          fillcolor: color, // Set the color property
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
              color: " #FF007",
            },

            {
              from: 200,
              to: 300,
              color: "#FF0000",
            },
          ],

          onItemClick: {
            toggleDataSeries: true,
            handler: function (
              event,
              chartContext,
              { dataPointIndex, seriesIndex, w }
            ) {
              const clickedState =
                w.config.series[seriesIndex].data[dataPointIndex].x.props
                  .children
              console.log("Clicked State:", clickedState)
              // Now you have access to the clicked state name
            },
          },
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
          onClick={(event, chartContext, config) =>
            handleChartClick(event, chartContext, config)
          }
        />
      </div>
      <div id="html-dist"></div>
    </div>
  )
}
