import "./App.css";
import axios from "axios";

function App() {
  async function getWeather() {
    const { data } = await axios.get(
      `https://api.weather.gov/gridpoints/HUN/41.203323,-77.194527/forecast`
    );
    console.log(data);
  }

  getWeather();

  return <div className="App"></div>;
}

export default App;
