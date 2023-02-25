import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const Reviews = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('TravelApp-token');
    fetch('/api/my-reviews', {
      method: 'GET',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        setMyReviews(result);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return null;
  return (
    <article>
      {myReviews.length > 0
        ? (
        <article>
          <Navbar />
          <section className="list-flex">
            {myReviews.map(trip => (
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
          <h1 className="nothing-found-msg">
            You don &apos;t have any reviews!
          </h1>
        </article>
          )}
    </article>
  );
};

function Trip(props) {
  const { tripId, country, city, mainPhotoUrl } = props.trip;
  return (
    <a href={`#trips?tripId=${tripId}`}>
      <section className="text-container">
        <p className="country-name">
          {country}-<span className="city-name">{city}</span>
        </p>
      </section>
      <section className="trash-container">
        <i className="fa-solid fa-trash fa-xl"></i>
      </section>

      <section className="image-container">
        <img className="photo" src={mainPhotoUrl}></img>
      </section>
    </a>
  );
}

export default Reviews;
