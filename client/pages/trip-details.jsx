import React from 'react';

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
    const { tripId, countryName, cityName, username, mainPhotoUrl } = this.state.trip;
    return (
      <div><h1>{countryName}</h1></div>

    );
  }
}
