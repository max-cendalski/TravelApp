import React from 'react';
import Navbar from '../components/navbar';

import { Carousel } from 'react-responsive-carousel';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      countries: [],
      allCountries: []
    };
  }

  componentDidMount() {
    fetch('/api/images', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
      /*   const images = [];
        const countries = [];
        for (let i = 0; i < 5; i++) {
          images.push(result[i].mainPhotoUrl);
          countries.push(result[i].country);
        } */
        this.setState({

          allCountries: result
        });
      })
      .catch(error => error(console.error('Error', error)));
  }

  render() {
    if (!this.state.images) return null;
    return (
      <article>
        <Navbar />
              <Carousel
                  autoPlay={true}
                  interval={5000}
                  infiniteLoop={true}
                  showThumbs={false}
                  stopOnHover={false}
                  showIndicators={true}
                  animationHandler={'fade'}
                  showStatus={false}
                  transitionTime={2000}
                  dynamicHeight={false}
                 >
                 {
                   this.state.allCountries.map((trip, index) => {
                     return (
                       <div key={index} className='image-home'>
                        <p className='carousel-country-name'>{trip.country}</p>
                        <img className='photo' src={trip.mainPhotoUrl} alt={trip.country} />
                      </div>
                     );
                   })
                 }
            </Carousel>
      </article>
    );
  }
}
