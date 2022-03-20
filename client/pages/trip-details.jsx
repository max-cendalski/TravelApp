import React from 'react';
import Navbar from '../components/navbar';
import AppContext from '../lib/app-context';

export default class TripDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null
    };
    this.handleEditButton = this.handleEditButton.bind(this);
  }

  handleEditButton() {
    console.log('whee');
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
                searchBox={this.state.searchBox}
        />
        <div className='row padding-top3 detailed-view-container'>
          <div className='image-container column-width50'>
            <img className="photo" src={mainPhotoUrl} alt={cityName}></img>
          </div>
          <div className='horizontal column-width50'>
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
            <div className='review-container'>
              <p>{review}</p>
          </div>
        </div>
         <div>
          {
            this.context.user.username === username && <button onClick={this.handleEditButton} className='edit-form-button'>Edit</button>
          }
        </div>
          <form className='edit-form'>
            <p>{thingsTodoScore}</p>
            <label className='review-score-label'>Things to Do - {thingsTodoScore}</label>
            <input className='review-score-input' type="number" max="100"></input>
            <br />
            <label className='review-score-label'>Food - {foodScore}</label>
            <input className="review-score-input" type="number"></input>
            <br />
            <label className='review-score-label'>People - {peopleScore}</label>
            <input className="review-score-input" type="number"></input>
            <br />
            <label className='review-score-label'>Transport - {transportScore}</label>
            <input className="review-score-input" type="number"></input>
            <br />
            <label className='review-score-label'>Safety - {safetyScore}</label>
            <input className="review-score-input" type="number"></input>
            <br />
            <textarea>{review}</textarea>
          </form>

         </div>
    );
  }
}

TripDetails.contextType = AppContext;
