import { useEffect, useState } from 'react'
import Axios from "axios"
import './App.css'
import City from './component/City';

function App() {
 const [city , setCity]=useState();
 const [weather ,setWeather]=useState();

 useEffect(()=>{

const dataFetch= async ()=>{

  const response=await  Axios.get(

`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`

  )

  setWeather(response.data);
}
dataFetch();


 },[city,weather])

  return (
    <>
     <City/>
    </>
  )
}

export default App
