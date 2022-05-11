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
        for (let i = 0; i < 4; i++) {
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
                 <div className='image-home'>
                    <img className='photo' src={this.state.images[0]} />
                </div>
                <div className='image-home'>
                    <img className='photo' src={this.state.images[1]} />
                </div>
                <div className='image-home'>
                    <img className='photo' src={this.state.images[2]} />
                </div>
                 <div className='image-home'>
                    <img className='photo' src={this.state.images[3]} />
                </div>
            </Carousel>
      </article>
    );
  }
}
