import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Hourlyweather from "./components/Hourlyweather";
import Getlocation from "./components/Getlocation";
import Currentweather from "./components/Currentweather";
import getWeather from "./components/Getweather";

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

  useEffect(() => {
    if (weather) {
      const slider = sliderRef.current;
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.75; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }, [weather]);

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
