import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const [imagesCarousel, setImagesCarousel] = useState(null);
  const [countriesCarousel, setCountriesCarousel] = useState([]);

  useEffect(() => {
    fetch('/api/images', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        const images = [];
        const countries = [];
        const indexes = [];
        while (indexes.length < 6) {
          const counter = Math.floor(Math.random(6) * 6);
          if (!indexes.includes(counter)) {
            images.push(result[counter].mainPhotoUrl);
            countries.push(result[counter].country);
            indexes.push(counter);
          } else {
            indexes.pop();
          }
        }
        setImagesCarousel(images);
        setCountriesCarousel(countries);
      })
      .catch(error => error(console.error('Error', error)));
  }, []);

  if (!imagesCarousel) return <Navbar />;
  return (
    <article>
      <Navbar />
      <Carousel
        autoPlay={true}
        interval={6000}
        infiniteLoop={false}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        transitionTime={1000}
        dynamicHeight={false}
        swipeable={true}
      >
        <div className="image-home">
          <p className="carousel-country-name">{countriesCarousel[0]}</p>
          <img className="photo" src={imagesCarousel[0]} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">{countriesCarousel[1]}</p>
          <img className="photo" src={imagesCarousel[1]} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">{countriesCarousel[2]}</p>
          <img className="photo" src={imagesCarousel[2]} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">{countriesCarousel[3]}</p>
          <img className="photo" src={imagesCarousel[3]} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">{countriesCarousel[4]}</p>
          <img className="photo" src={imagesCarousel[4]} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">{countriesCarousel[5]}</p>
          <img className="photo" src={imagesCarousel[5]} />
        </div>
      </Carousel>
    </article>
  );
};

export default Home;
