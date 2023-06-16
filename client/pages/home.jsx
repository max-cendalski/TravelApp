import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  const [imagesCarousel, setImagesCarousel] = useState(null);
  const [highestScoredReviews, setHighestScoredReviews] = useState([]);
  const [reviewToRender, setReviewToRender] = useState(null);

  /*  useEffect(() => {
    fetch('/api/images', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        function generateImages() {
          const indexes = [];
          const imagesToRender = [];
          while (indexes.length < 6) {
            const counter = Math.floor(Math.random(6) * 6);
            if (!indexes.includes(counter)) {
              indexes.push(counter);
            } else {
              indexes.pop();
            }
          }
          indexes.forEach(ele => imagesToRender.push(result[ele]));
          setImagesCarousel(imagesToRender);
        }
        generateImages();
      })
      .catch(error => error(console.error('Error', error)));
  }, []); */
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

  useEffect(() => {
    console.log('hi', reviewToRender);
  }, [reviewToRender]);

  const handleCountryParagraphClick = e => {
    const country = e.target.innerText.toLowerCase();
    window.location.hash = `search-results?country=${country}`;
  };

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
        <h2>Highest scored trip review</h2>
        <h3>{reviewToRender.title}</h3>
        <h5>Review by @{reviewToRender.username}</h5>
        <p className="review-paragraph">{reviewToRender.review}</p>
        <h2>Review Score: {reviewToRender.score} / 100</h2>
      </article>
    </article>
  );
};

export default Home;
