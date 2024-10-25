// https://openweathermap.org/
import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    const date = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const searchInput = (e) => {
    if (e.key === "Enter") {
      setInput("");
      setWeather({ ...weather, loading: true });
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: input,
            units: "metric",
            appId: "e1940f4dba6e90f03a07cb981a3c3fd9",
          },
        })
        .then((res) => {
          console.log(res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((err) => {
          console.log(err);
          setWeather({ ...weather, data: {}, error: true });
        });
    }
  };

  return (
    <div className="App">
      <div className="weather-app">
        <div className="city-searchInput">
          <input
            type="text"
            className="city"
            placeholder="Search city name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={searchInput}
          />
        </div>
        {weather.loading && (
          <Oval type="Oval" color="yellow" height={70} width={70}></Oval>
        )}
        {weather.error && (
          <div className="error-message">
            <span>City not found</span>
          </div>
        )}
        {weather && weather.data && weather.data.main && (
          <div>
            <div className="icon-temp">
              <img
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </div>
            <div className="degrees">
              <h1>{Math.round(weather.data.main.temp)}°c</h1>
            </div>
            <div className="city-name">
              <h2>
                {weather.data.name}, <span>{weather.data.sys.country}</span>
              </h2>
            </div>
            <div className="wind-speed">
              <div className="wind-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-wind"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
                  <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
                  <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
                </svg>
              </div>
              <div>
                <p>{weather.data.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="date">
              <p>{toDate()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
