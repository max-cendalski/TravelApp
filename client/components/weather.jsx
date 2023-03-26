import React, { useState, useEffect } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const Weather = ({ location }) => {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    geocodeByAddress(location.city, location.country)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`
        )
          .then(res => res.json())
          .then(data => setLocationData(data))
          .catch(error => console.error('Error', error));
      });
  }, []);
  return (
    locationData && (
      <article id="weather-container">
        <h3 className="name-location-element">
          Current temp: {locationData.current.temp}&deg; F
        </h3>
        <h3 className="name-location-element">
          {locationData.current.weather[0].description}
        </h3>
        <img
          src={`https://openweathermap.org/img/wn/${locationData.current.weather[0].icon}@2x.png`}
        ></img>
      </article>
    )
  );
};

export default Weather;
