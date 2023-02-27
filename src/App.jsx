import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Hourlyweather from "./components/Hourlyweather";
import Getlocation from "./components/Getlocation";
import Currentweather from "./components/Currentweather";
import getWeather from "./components/Getweather";
import HourlySlider from "./components/Hourlyslider";

function App() {
  const [weather, setWeather] = useState(null);
  const [userInput, setUserInput] = useState("Washington Dc");
  const [minMaxTemp, setMinMaxTemp] = useState("F");
  const sliderRef = useRef(null);
  let num = -1;

  function currentTime(float) {
    num += float;
    return num;
  }

  //Slider useEffect for the sliding of the hourly Weathers.
  useEffect(() => {
    HourlySlider(sliderRef, weather);
  }, [weather]);

  //Use Effect that defaults the weather to Washinton DC then clears it
  useEffect(() => {
    getWeather(userInput, setWeather);
    setUserInput("");
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Currentweather
        minMaxTemp={minMaxTemp}
        setMinMaxTemp={setMinMaxTemp}
        weather={weather}
      />
      <Getlocation
        userInput={userInput}
        setUserInput={setUserInput}
        setWeather={setWeather}
        getWeather={getWeather}
      />
      <div ref={sliderRef} className="weather__hours">
        {weather.forecast.forecastday["0"].hour.map((hour) => (
          <Hourlyweather
            hour={hour}
            currentTime={currentTime}
            minMaxTemp={minMaxTemp}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
