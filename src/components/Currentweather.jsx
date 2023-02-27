import React from "react";
import "./Currentweather.css";

export default function Currentweather({ setMinMaxTemp, weather, minMaxTemp }) {
  return (
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
  );
}
