// City.js
import React, { useState, useEffect } from "react"

function City({ setCity }) {
  const [inputValue, setInputValue] = useState("")
  const [recentSearches, setRecentSearches] = useState([])
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Load recent searches from local storage on component mount
  useEffect(() => {
    const recentSearchesFromStorage = localStorage.getItem("recentSearches")
    if (recentSearchesFromStorage) {
      setRecentSearches(JSON.parse(recentSearchesFromStorage))
    }
  }, [])

  const handleButtonClick = () => {
    if (inputValue.trim() !== "") {
      // Update recent searches array
      const updatedRecentSearches = [
        inputValue.trim(),
        ...recentSearches
          .filter((search) => search !== inputValue.trim())
          .slice(0, 4),
      ]
      setRecentSearches(updatedRecentSearches)
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedRecentSearches)
      )

      // Update current city
      setCity(inputValue.trim())
    }
  }

  const handleRecentSearchClick = (search) => {
    setCity(search)
  }

  return (
    <div>
      <div>Find Weather of your City</div>

      <div>
        <input
          type="text"
          placeholder="Your city name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <button className="bg-slate-600" onClick={handleButtonClick}>
          Search
        </button>
      </div>

      {isInputFocused && recentSearches.length > 0 && (
        <div>
          <p>Recent Searches:</p>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index} onClick={() => handleRecentSearchClick(search)}>
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default City
