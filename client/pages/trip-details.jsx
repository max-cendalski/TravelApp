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
      tripId,
      countryName,
      cityName,
      username,
      mainPhotoUrl,
      review,
      thingTodoScore,
      foodScore,
      peopleScore,
      transportScore,
      safetyScore
    } = this.state.trip;
    return (
      <div className='container'>
      <Navbar handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}/>
      <div className='row padding-top3'>
        <div className='image-item column-width50'>
          <div className='image-container'><img className="photo" src={mainPhotoUrl}></img></div>
        </div>
        <div className='column-width50'>
        </div>
      </div>
      </div>

    );
  }
}
