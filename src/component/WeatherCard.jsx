import React, { useState } from "react"

const WeatherCard = ({ data }) => {
 
  const [isFahrenheit, setIsFahrenheit] = useState(true)

  const convertToFahrenheit = (temp) => {
    return (temp * 9) / 5 + 32
  }

  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit)
  }

  const temperature = isFahrenheit
    ? Math.round(convertToFahrenheit(data.main.temp))
    : Math.round(data.main.temp)

  const temperatureUnit = isFahrenheit ? "°F" : "°C"

  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">{data.name}</h1>
        <div className="flex items-center">
          <span className="text-6xl font-bold">{temperature}</span>
          <span className="text-2xl ml-2">{temperatureUnit}</span>
        </div>
        <p className="text-gray-600">{data.weather[0].description}</p>
        <div className="mt-4">
          <p>Wind Speed: {data.wind.speed} m/s</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Pressure: {data.main.pressure} hPa</p>
        </div>
        {data.dt_txt && (
          <div className="mt-4">
            <p>Forecast Time: {data.dt_txt}</p>
          </div>
        )}
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
            onClick={toggleTemperatureUnit}
          >
            Toggle Temperature Unit
          </button>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
