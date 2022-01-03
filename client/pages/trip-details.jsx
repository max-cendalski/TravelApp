import React from 'react';
import Navbar from '../components/navbar';

export default class TripDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null
    };
  }

  componentDidMount() {
    fetch(`api/trips/${this.props.tripId}`)
      .then(res => res.json())
      .then(trip => this.setState({ trip }));
  }

  render() {
    if (!this.state.trip) return null;
    const {
      countryName,
      cityName,
      username,
      mainPhotoUrl,
      review,
      thingsTodoScore,
      foodScore,
      peopleScore,
      transportScore,
      safetyScore
    } = this.state.trip;
    return (
      <div className='container'>
      <Navbar handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              searchBox={this.state.searchBox}/>
      <div className='row padding-top3 detailed-view-container'>
        <div className='image-item column-width50'>
          <div className='image-container'><img className="photo" src={mainPhotoUrl} alt={cityName}></img></div>
        </div>
        <div className='row column-width50'>
        <div className='column-width25'>
          <div className='score-container'>
            <p className='score-text'>Things to Do - {thingsTodoScore}</p>
            <p className='score-text'>Food - {foodScore}</p>
            <p className='score-text'>People - {peopleScore}</p>
            <p className='score-text'>Transport - {transportScore}</p>
            <p className='score-text'>Safety - {safetyScore}</p>
          </div>
        </div>
        <div className='column-width25'>
          <div className="detailed-text-container">
      <p className='country-name'>{countryName}-<span className='city-name'>{cityName}</span></p>
      <span className='city-name'>@{username}</span></div>
        </div>
        </div>
      </div>
      <div className='row detailed-view-container'>
        <div className='column-width100'>
          <div className='review-container'>
            <p>{review}</p>
          </div>
        </div>
      </div>
      </div>

    );
  }
}
