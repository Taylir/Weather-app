import React from "react";
import "./Getlocation.css";

export default function Getlocation({
  userInput,
  setUserInput,
  getWeather,
  setWeather,
}) {
  return (
    <div className="form__section">
      <form
        className="location__form"
        onSubmit={(e) => {
          e.preventDefault();
          getWeather(userInput, setWeather);
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
  );
}
