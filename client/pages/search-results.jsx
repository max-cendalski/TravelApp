import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Time from '../components/date';

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
        if (result.length > 0) {
          setCountries(result);
          setIsLoading(false);
        } else {
          setCountries([]);
        }
      })
      .catch(error => error(console.error('Error', error)));
  }, [props]);

  function Trip(props) {
    const { tripId, country, city, username, mainPhotoUrl, created } =
      props.trip;
    return (
      <a href={`#trips?tripId=${tripId}`}>
        <section className="text-container">
          <p className="country-name">
            {country}-<span className="city-name">{city}</span>
          </p>
          <span className="text-container-username">@{username}</span>
          <Time date={created} />
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
      {countries && (
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
      )}
    </article>
  );
};

export default SearchResults;
