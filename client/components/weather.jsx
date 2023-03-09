import React, { useState, useEffect } from "react";

const Weather = ({ location }) => {
  /*  useEffect(()=> {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  }) */

  return (
    <article id="weather-container">
      <h3 className="name-location-element">Current temp: 80&deg; F</h3>
      <h3 className="name-location-element">Weather: Clear sky</h3>
    </article>
  );
};

export default Weather;
