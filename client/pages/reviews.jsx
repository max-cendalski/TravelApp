import React from 'react';
import AppContext from '../lib/app-context';
import Navbar from '../components/navbar';

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      myReviews: []
    });
  }

  componentDidMount() {
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
        this.setState({
          myReviews: result
        });
      });
  }

  render() {
    return (
     <div className='container'>
      <Navbar />
        <div className='list-flex'>
          {this.state.myReviews.map(trip =>
            <div className="image-item column-width50" key={trip.tripId}>
              <Trip trip={trip}
              />
            </div>)
          }
        </div>
      </div>
    );
  }
}

function Trip(props) {
  const { tripId, countryName, cityName, mainPhotoUrl } = props.trip;
  return (
    <a
      href={`#trips?tripId=${tripId}`}>
      <div className="text-container">
      <p className='country-name'>{countryName}-<span className='city-name'>{cityName}</span></p>
      </div>
      <div className='image-container'><img className="photo" src={mainPhotoUrl}></img></div>
    </a>
  );
}

Reviews.contextType = AppContext;
