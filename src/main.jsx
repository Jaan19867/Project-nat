import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import Layout from "./component/Layout.jsx"

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom"
import Weather from "./Weather.jsx"
import StateWise from "./StateWise.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
     
      <Route path="weather-info" element={<Weather/>} />
      <Route path="state-wise-info" element={<StateWise/>} />
     
      

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
