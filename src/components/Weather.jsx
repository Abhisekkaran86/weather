


import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloude from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState("Enter City Name");

  const allIcons = {
    "01d": clear, "01n": clear,
    "02d": cloude, "02n": cloude,
    "03d": cloude, "03n": cloude,
    "04d": drizzle, "04n": drizzle,
    "09d": rain, "09n": rain,
    "10d": rain, "10n": rain,
    "11d": rain, "11n": rain,
    "13d": snow, "13n": snow,
    "50d": humidity, "50n": humidity,
  };

  const search = async (city) => {
    if (!city.trim()) {
      setMessage("Please Enter A Valid City Name");
      setWeatherData(null);
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9b6dfaa420cbecbdac1e9c96b951438f`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        setMessage("City not found");
        setWeatherData(null);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
      setMessage(""); // Clear the message
    } catch (error) {
      setMessage("Error fetching weather");
      setWeatherData(null);
    }
  };

  return (
    <div className='weather'>
      <div className='weather-card'>
        <div className='search-bar'>
          <input ref={inputRef} type='text' placeholder='Search City' />
          <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
        </div>

        {/* Show message when there's no weatherData */}
        {!weatherData && <p className="info-message">{message}</p>}

        {weatherData && (
          <>
            <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
            <h1 className='temperature'>{weatherData.temperature}°C</h1>
            <h2 className='location'>{weatherData.location}</h2>

            <div className='weather-details'>
              <div className="detail-box">
                <img src={humidity} alt="Humidity" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="detail-box">
                <img src={wind} alt="Wind" />
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <footer className="footer">
        Developed by Abhisek Karan
      </footer>
    </div>
  );
};

export default Weather;
