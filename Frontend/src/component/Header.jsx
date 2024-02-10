import React, { useState } from "react"
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid"

const Header = () => {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "weather-info", link: "/weather-info" },
    { name: "state-wise-info", link: "/state-wise-info" },
  ]
  const [open, setOpen] = useState(false)

  return (
    <div className="shadow-md bg-white">
      <div className="flex items-center justify-between px-7 py-4 md:px-10">
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* link items */}
        <ul
          className={`md:flex md:items-center md:pb-0 md:static bg-white md:z-auto ${
            open ? "block" : "hidden"
          }`}
        >
          {Links.map((link, index) => (
            <li key={index} className="ml-8 my-7 font-semibold">
              <a href={link.link} className="text-gray-800 hover:text-blue-400">
                {link.name}
              </a>
            </li>
          ))}
          <button className="btn bg-blue-600 text-white ml-8 font-semibold px-3 py-1 rounded">
            Get Started
          </button>
        </ul>
        {/* button */}
      </div>
    </div>
  )
}

export default Header
