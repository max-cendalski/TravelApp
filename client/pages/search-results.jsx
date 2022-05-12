import React from 'react';
import Navbar from '../components/navbar';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      countries: []
    });
  }

  componentDidMount() {
    fetch(`/api/countries/${this.props.country}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          countries: result
        });
      })
      .catch(error => error(console.error('Error', error)));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country === this.props.country) {
      return;
    }
    fetch(`/api/countries/${this.props.country}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          countries: result
        });
      })
      .catch(error => error(console.error('Error', error)));

  }

  render() {
    if (!this.state.countries) return null;
    return (
     <article>
      {this.state.countries
        ? (
            <article>
              <Navbar />
              <section className='list-flex'>
                {this.state.countries.map(trip =>
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
            <h1 className='nothing-found-msg'>Nothing Found!</h1>
          </article>
          )}
    </article>
    );
  }
}

function Trip(props) {
  const { tripId, country, city, username, mainPhotoUrl } = props.trip;
  return (
    <a
      href={`#trips?tripId=${tripId}`}>
      <section className="text-container">
      <p className='country-name'>{country}-<span className='city-name'>{city}</span></p>
      <span className='city-name'>@{username}</span></section>
      <section className='image-container'><img className="photo" src={mainPhotoUrl}></img></section>
    </a>
  );
}
