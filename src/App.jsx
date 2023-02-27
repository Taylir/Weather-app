import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

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

  async function getWeather() {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: { q: `${userInput}`, days: "3" },
      headers: {
        "X-RapidAPI-Key": "285110c9eamsh53fd7501a267f4fp1c913djsn6a7d37da6a81",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setWeather(response.data);
      })
      .catch(function (error) {
        console.error(error);
        alert(
          "Location not found, Please try again. Lat and Lon can only be 4 decimel places long."
        );
      });
  }
  useEffect(() => {
    getWeather();
    setUserInput("");
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="current-weather__stats">
        <div className="temp__pref">
          <button onClick={() => setMinMaxTemp("F")} className="button__pref">
            F °
          </button>
          <button onClick={() => setMinMaxTemp("C")} className="button__pref">
            C °
          </button>
          <button
            onClick={() => setMinMaxTemp("This can be what ever I want lol")}
            className="button__pref"
          >
            K
          </button>
        </div>
        <div className="current-weather__icon">
          <img src={`https:${weather.current.condition.icon}`} alt="" />
        </div>
        <p className="current-weather__title">
          The tempature in {weather.location.name}, {weather.location.region} is
          currently{" "}
          <span className="text-white text-bold">
            {minMaxTemp === "F"
              ? `${weather.current.temp_f}°F`
              : minMaxTemp === "C"
              ? `${weather.current.temp_c}°C`
              : weather.current.temp_c + 273 + "K"}
          </span>
          .
          <br />
          With todays <span className="text-cold-blue">low</span>/
          <span className="tex-warm-red">high</span> being{" "}
          <span className="text-cold-blue">
            {minMaxTemp === "F"
              ? `${weather.forecast.forecastday["0"].day.mintemp_f}°F`
              : minMaxTemp === "C"
              ? `${weather.forecast.forecastday["0"].day.mintemp_c}°C`
              : weather.forecast.forecastday["0"].day.mintemp_c + 273 + "K"}
          </span>
          /
          <span className="tex-warm-red">
            {minMaxTemp === "F"
              ? `${weather.forecast.forecastday["0"].day.maxtemp_f}°F`
              : minMaxTemp === "C"
              ? `${weather.forecast.forecastday["0"].day.maxtemp_c}°C`
              : weather.forecast.forecastday["0"].day.maxtemp_c + 273 + "K"}
          </span>
        </p>
      </div>
      <div className="form__section">
        <form
          className="location__form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(userInput);
            getWeather();
          }}
        >
          <input
            className="location__input"
            type="text"
            placeholder="City, Zip, or (Lat, Lon)"
            value={userInput}
            onChange={(e) => {
              console.log(userInput);
              setUserInput(e.target.value);
            }}
          />
          <button className="location__button" type="submit">
            Check Weather!
          </button>
        </form>
      </div>
      <div ref={sliderRef} className="weather__hours">
        {weather.forecast.forecastday["0"].hour.map((hour) => (
          <div className="hourly-weather__card" key={hour.time}>
            <div className="hourly-weather">
              <div>
                {currentTime(1) > 11
                  ? `${currentTime(0) % 12 === 0 ? 12 : currentTime(0) % 12} PM`
                  : `${currentTime(0) % 12 === 0 ? 12 : currentTime(0)} AM`}
              </div>
              <img src={`https:${hour.condition.icon}`} alt="Weather type" />
              <div>{hour.condition.text}</div>
              <div>
                {minMaxTemp === "F"
                  ? `${hour.temp_f}°F`
                  : minMaxTemp === "C"
                  ? `${hour.temp_c}°C`
                  : hour.temp_c + 273 + "K"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
