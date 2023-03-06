import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const [imagesCarousel, setImagesCarousel] = useState([]);
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

        for (let i = 0; i < 3; i++) {
          images.push(result[i].mainPhotoUrl);
          countries.push(result[i].country);
        }
        setImagesCarousel(images);
        setCountriesCarousel(countries);
      })
      .catch(error => error(console.error('Error', error)));
  }, []);

  if (!imagesCarousel) return null;
  return (
    <article>
      <Navbar />
      <Carousel
        autoPlay={true}
        interval={5000}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        transitionTime={1700}
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
      </Carousel>
    </article>
  );
};

export default Home;
