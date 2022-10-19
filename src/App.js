import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { Loader } from 'semantic-ui-react';

const URL = `https://api.openweathermap.org/data/2.5/onecall`
//const API_KEY = `c38ae5040cd2343b7d29a98272685579`  my api
const API_KEY = `f9230ac8b71b37416db0d6b8f595925a`  //redux-weather-api

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [temprature, setTemprature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [icon, setIcon] = useState('');
  const [forcast, setForecast] = useState([]);
  const [loading, setloading] = useState(true);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    axios.get(`${URL}?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`)
      .then((weatherData) => {
        setloading(false)
        setTemprature(weatherData.data.current.temp);
        setSunset(weatherData.data.current.sunset)
        setSunrise(weatherData.data.current.sunrise)
        setHumidity(weatherData.data.current.humidity)
        setCity(weatherData.data.timezone)
        setIcon(weatherData.data.current.weather[0].main)
        setForecast(weatherData.data.daily)
      })

  }, [latitude, longitude])
  
  const [theme, setTheme] = useState('light-theme');
  const toggleTheme = () => {
      theme === "dark-theme" ? setTheme("light-theme"): setTheme("dark-theme");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="main">
      <a className="btn" onClick={ () => toggleTheme() }>
          Toggle Mode
      </a>
      <Header />
      
      {loading ? (
        <div>
          <p>Loading..Please Wait</p>
          <Loader active inline='centered' />
        </div>
      ) : (
        <WeatherCard
          temprature={temprature}
          humidity={humidity}
          sunrise={sunrise}
          sunset={sunset}
          city={city}
          icon={icon}
        />
      )}
      <Forecast forcast={forcast} />
    </div>
  );
}

export default App;
