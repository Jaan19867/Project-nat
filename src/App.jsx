import { useEffect, useState } from 'react'
import Axios from "axios"
import './App.css'
import City from './component/City';

function App() {
 

  return (
    <>
      <div className="flex my-80 ">
        <h1>This Project include two part</h1>
        <div>
          <h2>
            {" "}
            First : Weather info = To reach at weather project , click on header
            at weather-info{" || "}
          </h2>
        </div>
        <div>
          <h2>
            {"              "}
            Second : State-wise-info = To reach at state-wise-info , click on
            header at state-wise-info{" "}
          </h2>
        </div>
      </div>
    </>
  )
}

export default App
