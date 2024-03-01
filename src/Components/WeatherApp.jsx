import React, { useState } from 'react';
import '../App.css';
import searchIcon from '../Assets/search.png';
import cloudIcon from '../Assets/cloud.png';
import humidityIcon from '../Assets/humidity.png';
import windIcon from '../Assets/wind.png';
import clearIcon from '../Assets/clear.png';

import rainIcon from '../Assets/rain.png';
import drizzleIcon from '../Assets/drizzle.png';

const WeatherApp = () => {
  const api_key = "42c3fdcb4bf72f0e662866edcc83e6b1"; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
  const [wicon, setwicon] = useState(cloudIcon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value},uk&APPID=${api_key}`;
    if (element[0].value === "") {
      return 0;
    }
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      const humidity = document.getElementsByClassName("humidityPercent");
      const wind = document.getElementsByClassName("windRate");
      const temperature = document.getElementsByClassName("weatherTemp");
      const location = document.getElementsByClassName("weatherLocation");
      humidity[0].innerHTML = `${data.main.humidity}%`;
      wind[0].innerHTML = `${data.wind.speed} Km/h`;
      temperature[0].innerHTML = `${data.main.temp} °C`; // Convert from Kelvin if needed
      location[0].innerHTML = data.name;

      // Update weather icon based on weather condition
      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setwicon(clearIcon);
          break;
        case "02d":
        case "02n":
          setwicon(cloudIcon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setwicon(drizzleIcon);
          break;
        case "09d":
        case "09n":
        case "010d":
        case "010n":
          setwicon(rainIcon);
          break;
        case "013d":
        case "013n":
          setwicon(cloudIcon);
          break;
        default:
          setwicon(clearIcon);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  return (
    <>
      <div className='container'>
        <div className='top-bar'>
          <input type="text" className="cityInput" placeholder="Search"/>
          <div className='searchIcon' onClick={search}>
            <img src={searchIcon} alt="Search Icon" />
          </div>
        </div>
        <div className='weatherImage'>
          <img src={wicon} alt="Weather Icon" />
        </div>
        <div className="weatherTemp">24°C</div>
        <div className="weatherLocation">London</div>
        <div className='dataContainer'>
          <div className='element'>
            <div className="data">
              <img src={windIcon} alt="Wind Icon" className='icon' />
              <div className='windRate'>24</div>
            </div>
            <div className="text">Wind Speed</div>
          </div>
          <div className='element'>
            <div className="data">
              <img src={humidityIcon} alt="Humidity Icon" className='icon' />
              <div className='humidityPercent'>32</div>
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherApp;
