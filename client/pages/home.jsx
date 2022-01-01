import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: '',
      countries: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchBox: event.target.value,
      countries: []
    });
  }

  handleSubmit(event) {
    event.preventDefault();
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

  render() {
    return (
      <div className='container'>
        <div className='navbar-container'>
          <div className='search-box-container'>
            <form onSubmit={this.handleSubmit}>
              <input className="search-box" type="text" value={this.state.searchBox} onChange={this.handleChange} name="searchBox" placeholder="search for a country"/>
              <button>Submit</button>
            </form>
          </div>
          <div className='login-icon'>
            <i className="fas fa-user"></i>
          </div>
        </div>
        <div className='list-flex'>
          {this.state.countries.map(trip =>
            <div className="image-item column-width50" key={trip.tripId}>
            <Trip trip={trip} />
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
