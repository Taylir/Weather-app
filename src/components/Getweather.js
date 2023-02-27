import axios from "axios";

export default async function getWeather(userInput, setWeather) {
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
