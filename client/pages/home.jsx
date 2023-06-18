import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const [imagesCarousel, setImagesCarousel] = useState(null);
  const [reviewToRender, setReviewToRender] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesRes = fetch('/api/images');
        const scoresRes = fetch('/api/highest-score');

        const [imagesResponse, scoresResponse] = await Promise.all([
          imagesRes,
          scoresRes
        ]);

        const imagesResult = await imagesResponse.json();
        const scoresResult = await scoresResponse.json();
        setImagesCarousel(imagesResult);
        getHighestReviewScore(scoresResult);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchData();
  }, []);

  function getHighestReviewScore(reviews) {
    const reviewIndex = Math.floor(Math.random() * 3);
    setReviewToRender(reviews[reviewIndex]);
  }

  const handleCountryParagraphClick = e => {
    const country = e.target.innerText.toLowerCase();
    window.location.hash = `search-results?country=${country}`;
  };

  if (!imagesCarousel) return <Navbar />;
  return (
    <article className="container">
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
          <p
            className="carousel-country-name"
            onClick={handleCountryParagraphClick}
          >
            {imagesCarousel[0].country}
          </p>
          <img className="photo" src={imagesCarousel[0].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p
            className="carousel-country-name"
            onClick={handleCountryParagraphClick}
          >
            {imagesCarousel[1].country}
          </p>
          <img className="photo" src={imagesCarousel[1].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p
            className="carousel-country-name"
            onClick={handleCountryParagraphClick}
          >
            {imagesCarousel[2].country}
          </p>
          <img className="photo" src={imagesCarousel[2].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p
            className="carousel-country-name"
            onClick={handleCountryParagraphClick}
          >
            {imagesCarousel[3].country}
          </p>
          <img className="photo" src={imagesCarousel[3].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p
            className="carousel-country-name"
            onClick={handleCountryParagraphClick}
          >
            {imagesCarousel[4].country}
          </p>
          <img className="photo" src={imagesCarousel[4].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p
            className="carousel-country-name"
            onClick={handleCountryParagraphClick}
          >
            {imagesCarousel[5].country}
          </p>
          <img className="photo" src={imagesCarousel[5].mainPhotoUrl} />
        </div>
      </Carousel>
      <article id="highest-scored-review-container">
        <h2>One of Our Best Trip Reviews</h2>
        <h2>Title: {reviewToRender.title}</h2>
        <p>Review by @{reviewToRender.username}</p>
        <p className="review-paragraph">{reviewToRender.review}</p>
        <p>Review Score: {reviewToRender.score} / 100</p>
      </article>
    </article>
  );
};

export default Home;
