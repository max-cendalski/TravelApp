import React from 'react';
import Navbar from '../components/navbar';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      searchBox: '',
      countries: []
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          searchBox: '',
          countries: result
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = `#search-results?country=${this.state.searchBox}`;
    const country = this.state.searchBox;
    fetch(`/api/countries/${country}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          searchBox: '',
          countries: result
        });
      });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      searchBox: event.target.value,
      countries: []
    });
  }

  render() {
    return (
      <div className='container'>
      <Navbar handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              searchBox={this.state.searchBox}
              countries={this.state.countries}
              />
        <div className='list-flex'>
          {this.state.countries.map(trip =>
            <div className="image-item column-width50" key={trip.tripId}>
            <Trip
            trip={trip}
           />
            </div>)
          }
        </div>
      </div>
    );
  }
}

function Trip(props) {
  const { tripId, countryName, cityName, username, mainPhotoUrl } = props.trip;
  return (
    <a
      href={`#trips?tripId=${tripId}`}>
      <div className="text-container">
      <p className='country-name'>{countryName}-<span className='city-name'>{cityName}</span></p>
      <span className='city-name'>@{username}</span></div>
      <div className='image-container'><img className="photo" src={mainPhotoUrl}></img></div>
    </a>
  );
}

Home.contextType = AppContext;
