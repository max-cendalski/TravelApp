import React, { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const Weather = ({ location }) => {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    geocodeByAddress(location.country, location.city)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`
        )
          .then((res) => res.json())
          .then((data) => setLocationData(data))
          .catch((error) => console.error("Error", error));
      });
  },[]);
  console.log(locationData)
  return (
    locationData && (
      <article id="weather-container">
      <h3 className="name-location-element">Current temp: {locationData.current.temp}&deg; F</h3>
      <h3 className="name-location-element">Weather: {locationData.current.weather[0].description}</h3>
    </article>
    )
  );
};

export default Weather;

/*   const handleSelect = (address) => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            const locationArray = address.split(",");
            const locationToSave = {
              id: `${locationArray[0]}${latLng.lat}`,
              city: locationArray[0],
              country: locationArray[locationArray.length - 1],
              coordinates: latLng,
              temp: data.current.temp,
              extend: false,
            };
            if (
              locationsFromDB.some((item) => item.city === locationToSave.city)
            ) {
              setModal("modal-visible");
              setTimeout(() => {
                setModal("hidden");
              }, 1300);
            } else {
              let searchedLocationsToRender = searchedLocations.filter(
                (item) => item.city !== locationToSave.city
              );
              setSearchedLocations([
                ...searchedLocationsToRender,
                locationToSave,
              ]);
            }
          });
      })
      .catch((error) => console.error("Error", error));
    setAddress("");
  }; */
