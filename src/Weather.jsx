import React, { useEffect, useState } from "react"
import Axios from "axios"
import City from "./component/City"
import WeatherCard from "./component/WeatherCard"
import Chart from "./Chart/Chart"
import logo from "./assets/tree-desert-white-clouds-during-daytime_395237-190.avif"
import bglogo from "./assets/3d-render-tree-landscape-against-night-sky_1048-5698.avif"
// import Charts from "./Chart/Charts"

function Weather() {
  const [city, setCity] = useState("delhi")
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8cae7fa94ac0d61c4401f86aed5c1657`
        )
        if (response.data.cod === 200) {
          setData(response.data)
          setError("")
        } else {
          setError(response.data.message)
          setData({})
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Error fetching data. Please try again later.")
        setIsLoading(false)
      }
    }
    fetchData()
  }, [city])

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-cover" style={{backgroundImage:`url(${logo})`}} >
        <div className="max-w-lg w-full bg-white p-6 rounded-lg">
          <City city={city} setCity={setCity} />
          {isLoading ? (
            <div className="text-white">Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <WeatherCard data={data} />
          ) }
          <div className="text-white">Hi how are you</div>
        </div>
        {/* Add some margin */}
      </div>
        <div className="ml-1 bg-cover" style={{backgroundImage:`url(${bglogo}`}}>
          <Chart  city={city}/>
        </div>{" "}

{/* <Charts city={city}/> */}

    </>
  )
}

export default Weather
