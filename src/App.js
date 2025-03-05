import React,{useState} from 'react'
import './App.css';
import axios from 'axios';
import Lottie from 'lottie-react';
import weatherAnimation from './assets/cloud.json';

const App=()=> {
  const[weather,setWeather]=useState(null);
  const[city,setCity]=useState('');
  const [loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  const apikey='10bbbbe5bb61b4f97cba87794c94d5a5';
  const apiURL = 'https://api.openweathermap.org/data/2.5/weather';


  const getWeather= async(city)=>{
    if(!city){
      setError('Please enter a city name');
      return;
     }
    setLoading(true);
    setError(null);
    try{
      const resp=await axios.get(apiURL,{
        params:{
          q:city,
          appid:apikey,
          units:'metric'
        }
      });
      setWeather(resp.data);
    }
    catch(error){
      setError('Error fetching the weather data of your city.Please check with city name and try again!');
      console.error('Ooops!!!Error in fetching the data for weather forecast!error:',error);
    }
    finally{
      setLoading(false);
    }
  };
  const getBackgroundClass = () => {
    if (!weather) return "background-default"; // Default background
  
    const condition = weather.weather[0].main.toLowerCase();
    switch (condition) {
      case 'clear':
        return "background-sunny";
      case 'clouds':
      case 'rain':
      case 'thunderstorm':
        return "background-rainy";
      case 'snow':
        return "background-snow";
      case 'mist':
      case 'fog':
        return "background-fog";
      default:
        return "background-default";
    }
  };
  
  
  return (
    <div className="App">
      <div className={`App ${getBackgroundClass()}`}>

      <header className="App-header">
      
        <h1>Weather App</h1>
        <input type="text" 
        value={city} 
        onChange={(e)=>setCity(e.target.value)}
         placeholder="Enter city" className="search-bar" />
         <br></br>
         <button onClick={() => getWeather(city)} className="search-button">
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
        {error && <p className="error">{error}</p>}
        {weather && !error && (
          <div className="weather-info">
            <Lottie animationData={weatherAnimation} className="lottie-animation" />
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}
      </header>
    </div>
    </div>
  );
};

export default App;

