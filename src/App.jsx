import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);
  const [userInput, setUserInput] = useState("Washington DC");

  useEffect(() => {
    async function getWeather() {
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
        params: { q: `${userInput}`, days: "3" },
        headers: {
          "X-RapidAPI-Key":
            "285110c9eamsh53fd7501a267f4fp1c913djsn6a7d37da6a81",
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
        });
    }

    getWeather();
  }, [userInput]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div>
        <img src={`https:${weather.current.condition.icon}`} alt="" />
      </div>
      <div>{`The temprature in ${weather.location.name}, ${weather.location.region} is ${weather.current.temp_f} f°`}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(userInput);
        }}
      >
        <input
          type="text"
          placeholder="City, Zip, or (Lat, Lon)"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <button type="submit">Check Weather!</button>
      </form>
    </div>
  );
}

export default App;
