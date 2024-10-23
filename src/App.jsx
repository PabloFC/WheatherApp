import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWheather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const search = (e) => {
    if (e.key === "Enter") {
      setInput("");
      setWheather({ ...weather, loading: true });
      axios
        .get("", {
          params: {},
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err)
          setWheather({ ...weather, data: {}, err: true });
        });
    }
  };

  return (
    <div className="App">
      <div className="weather-app">
        <div className="city-search">
          <input
            type="text"
            name=""
            className="city"
            placeholder="Enter city name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
            // https://openweathermap.org/
          />
        </div>
      </div>
    </div>
  );
}

export default App;
