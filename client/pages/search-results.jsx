import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const SearchResults = props => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/countries/${props.country}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        setCountries(result);
        setIsLoading(false);
      })
      .catch(error => error(console.error('Error', error)));
  }, [props]);

  function Trip(props) {
    const { tripId, country, city, username, mainPhotoUrl } = props.trip;
    return (
      <a href={`#trips?tripId=${tripId}`}>
        <section className="text-container">
          <p className="country-name">
            {country}-<span className="city-name">{city}</span>
          </p>
          <span className="city-name">@{username}</span>
        </section>
        <section className="image-container">
          <img className="photo" src={mainPhotoUrl}></img>
        </section>
      </a>
    );
  }

  if (isLoading) return null;
  return (
    <article>
      {countries
        ? (
        <article>
          <Navbar />
          <section className="list-flex">
            {countries.map(trip => (
              <div className="image-item column-width50" key={trip.tripId}>
                <Trip trip={trip} />
              </div>
            ))}
          </section>
        </article>
          )
        : (
        <article>
          <Navbar />
          <h1 className="nothing-found-msg">Nothing Found!</h1>
        </article>
          )}
    </article>
  );
};

export default SearchResults;
