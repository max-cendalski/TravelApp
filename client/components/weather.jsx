import React{useState, useEffect} from 'react';

const Weather = () => {

  useEffect(()=> {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  })


  return (
    <article>
      <p>66&deg</p>
    </article>
  )
}


export default Weather;
