import React from 'react';
import Navbar from '../components/navbar';

import { Carousel } from 'react-responsive-carousel';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      countries: []
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
        const images = [];
        const countries = [];
        for (let i = 0; i < 5; i++) {
          images.push(result[i].mainPhotoUrl);
          countries.push(result[i].country);
        }
        this.setState({
          images,
          countries
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
                  interval={4000}
                  infiniteLoop={true}
                  showThumbs={false}
                  showIndicators={true}
                  animationHandler={'fade'}
                  showStatus={false}
                  transitionTime={2000}
                  dynamicHeight={false}
                  swipeable={false}
                 >
                 <div className='image-home'>
                   <p className='carousel-country-name'>{this.state.countries[0]}</p>
                   <img className='photo' src={this.state.images[0]} />
                  </div>
                  <div className='image-home'>
                    <p className='carousel-country-name'>{this.state.countries[1]}</p>
                    <img className='photo' src={this.state.images[1]} />
                  </div>
                  <div className='image-home'>
                    <p className='carousel-country-name'>{this.state.countries[2]}</p>
                    <img className='photo' src={this.state.images[2]} />
                  </div>
                  <div className='image-home'>
                    <p className='carousel-country-name'>{this.state.countries[3]}</p>
                    <img className='photo' src={this.state.images[3]} />
                  </div>
            </Carousel>
      </article>
    );
  }
}
