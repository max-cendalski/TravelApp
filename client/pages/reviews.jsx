import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Time from '../components/date';

const Reviews = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('TravelApp-token');

    let reviewsLoaded = true;
    fetch('/api/my-reviews', {
      method: 'GET',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        if (reviewsLoaded) {
          setMyReviews(result);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Error :', error);
      });

    return () => {
      reviewsLoaded = false;
    };
  }, [myReviews]);

  const handleDeleteReview = (id, mainPhotoUrl) => {
    const tripId = Number(id);
    const token = window.localStorage.getItem('TravelApp-token');
    const fileToRemove = mainPhotoUrl.split('amazonaws.com/')[1];

    setMyReviews(myReviews.filter(review => review.tripId !== id));
    fetch(`/api/my-reviews/${tripId}/${fileToRemove}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error :', error);
      });
  };

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
                <Trip trip={trip} handleDeleteReview={handleDeleteReview} />
              </div>
            ))}
          </section>
        </article>
          )
        : (
        <article>
          <Navbar />
          <h1 className="nothing-found-msg">
            You don&apos;t have any reviews!
          </h1>
        </article>
          )}
    </article>
  );
};

function Trip(props) {
  const { tripId, country, city, mainPhotoUrl, created } = props.trip;
  return (
    <article>
      <a href={`#trips?tripId=${tripId}`}>
        <section className="image-container">
          <section className="text-container">
            <p className="country-name">
              {country}-<span className="city-name">{city}</span>
            </p>
            <Time date={created} />
          </section>

          <img className="photo" src={mainPhotoUrl}></img>
        </section>
      </a>
      <section
        onClick={() => props.handleDeleteReview(tripId, mainPhotoUrl)}
        className="trash-container"
      >
        <i className="fa-solid fa-trash fa-xl"></i>
      </section>
    </article>
  );
}

export default Reviews;
