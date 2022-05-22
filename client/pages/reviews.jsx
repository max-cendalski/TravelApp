import React from 'react';
import AppContext from '../lib/app-context';
import Navbar from '../components/navbar';

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      myReviews: [],
      isLoading: true
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
          myReviews: result,
          isLoading: 'false'
        });
      });
  }

  render() {
    if (this.state.isLoading === true) return null;
    return (
     <article>
      {this.state.myReviews
        ? (
          <article>
            <Navbar />
              <section className='list-flex'>
                {this.state.myReviews.map(trip =>
                  <div className="image-item column-width50" key={trip.tripId}>
                    <Trip trip={trip} />
                  </div>)
                }
              </section>
            </article>
          )
        : (
          <article>
            <Navbar />
            <h1 className='nothing-found-msg'>You don &apos;t have any reviews!</h1>
          </article>
          )}
      </article>
    );
  }
}

function Trip(props) {
  const { tripId, country, city, mainPhotoUrl } = props.trip;
  return (
    <a
      href={`#trips?tripId=${tripId}`}>
      <section className="text-container">
        <p className='country-name'>{country}-<span className='city-name'>{city}</span></p>
      </section>
      <section className='image-container'><img className="photo" src={mainPhotoUrl}></img></section>
    </a>
  );
}

Reviews.contextType = AppContext;
