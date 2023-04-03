import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  const [imagesCarousel, setImagesCarousel] = useState(null);

  useEffect(() => {
    fetch("/api/images", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        function generateImages() {
          let indexes = [];
          let imagesToRender = [];
          while (indexes.length < 6) {
            let counter = Math.floor(Math.random(6) * 6);
            if (!indexes.includes(counter)) {
              indexes.push(counter);
            } else {
              indexes.pop();
            }
          }
          indexes.forEach(ele => imagesToRender.push(result[ele]));
          setImagesCarousel(imagesToRender)
        }
        generateImages()
      })
      .catch((error) => error(console.error("Error", error)));
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
          <p className="carousel-country-name">
            {imagesCarousel[0].country}
          </p>
          <img className="photo" src={imagesCarousel[0].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">
            {imagesCarousel[1].country}
          </p>
          <img className="photo" src={imagesCarousel[1].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">
            {imagesCarousel[2].country}
          </p>
          <img className="photo" src={imagesCarousel[2].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">
            {imagesCarousel[3].country}
          </p>
          <img className="photo" src={imagesCarousel[3].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">
            {imagesCarousel[4].country}
          </p>
          <img className="photo" src={imagesCarousel[4].mainPhotoUrl} />
        </div>
        <div className="image-home">
          <p className="carousel-country-name">
            {imagesCarousel[5].country}
          </p>
          <img className="photo" src={imagesCarousel[5].mainPhotoUrl} />
        </div>
      </Carousel>
    </article>
  );
};

export default Home;
