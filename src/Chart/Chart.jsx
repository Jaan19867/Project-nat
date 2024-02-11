import React, { useEffect } from "react"
import Axios from "axios"
import { useState } from "react"
import WeatherCard from "../component/WeatherCard"

function Chart({city}) {
  const location = city // Corrected location variable
  const [info, setInfo] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=8cae7fa94ac0d61c4401f86aed5c1657`
        )
       

        setInfo(response.data)
        // Example: Log the response data
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [location]) // Corrected dependency array

  return (
    <div className="flex flex-wrap justify-center">
      
      {info &&
        info.list.map((data) => (
          <div className="w-1/1 p-4">
            <WeatherCard data={data} />
          </div>
        ))}
    </div>
  )
}

export default Chart
