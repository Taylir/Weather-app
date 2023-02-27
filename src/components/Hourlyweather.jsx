import React from "react";
import "./Hourlyweather.css";

export default function Hourlyweather({ hour, currentTime, minMaxTemp }) {
  return (
    <div>
      <div className="hourly-weather__card" key={hour.time}>
        <div className="hourly-weather">
          <div>
            {currentTime(0.5) > 11
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
    </div>
  );
}
