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
                // width={100}
                // height={100}
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
            <div className="date">
              <span>{toDate()}</span>
            </div>
            <div className="des-wind">
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Wind Speed: {weather.data.wind.speed}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
