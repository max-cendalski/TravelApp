import React, {useState, useEffect} from 'react';

const Weather = ({location}) => {

 /*  useEffect(()=> {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  }) */


  return (
    <article className='weather-container'>
      <p>{location.city}</p>
      <p>66 &deg F</p>
    </article>
  );
}


export default Weather;
