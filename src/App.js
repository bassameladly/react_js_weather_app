import React, { useEffect, useState } from "react";
import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Description from "./components/Description";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("cairo");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(coldBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      const weatherDeg = units === "metric" ? 20 : 60;
      if (data.temp <= weatherDeg) {
        setBg(coldBg);
      } else {
        setBg(hotBg);
      }
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isC = currentUnit === "C";
    button.innerText = isC ? "°F" : "°C";
    setUnits(isC ? "metric" : "imperial");
  };

  const enterKeyPress = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPress}
                type="text"
                name="city"
                placeholder="Enter a City.."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconUrl} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>
                  {" "}
                  {`${weather.temp.toFixed()}°${
                    units === "metric" ? "C" : "F"
                  } `}
                </h1>
              </div>
            </div>
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
