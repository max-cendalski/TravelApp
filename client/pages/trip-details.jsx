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
      <>
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
        </div>

        <div className='row padding-top3 detailed-view-container'>
          <div className='image-container column-width50'>
            <img className="photo" src={mainPhotoUrl} alt={cityName}></img>
          </div>

          <form className='edit-form'>
          <div className='column-width50'>
              <div className='label-input-container'>
              <label className='edit-score-label'>Country</label>
              <input className='edit-form-text-input float-right' type='text' placeholder={countryName}></input>
          </div>

              <div className='label-input-container'>
              <label className='edit-score-label'>City</label>
              <input className='edit-form-text-input float-right' type='text' placeholder={cityName}></input>
              </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>Things to Do</label>
              <input className='edit-form-text-input float-right' type="number" max="100" placeholder={thingsTodoScore}></input>
           </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>Food</label>
              <input className='edit-form-text-input float-right' type="number" max="100" placeholder={foodScore}></input>
              </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>People</label>
              <input className='edit-form-text-input float-right' type="number" max="100" placeholder={peopleScore}></input>
              </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>Transport</label>
              <input className='edit-form-text-input float-right' type="number" max="100" placeholder={transportScore}></input>
              </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>Safety</label>
              <input className='edit-form-text-input float-right' type="number" max="100" placeholder={safetyScore}></input>
              </div>

          </div>

              <div className='edit-textarea'>
                <textarea className='edit-textarea'></textarea>
              </div>

          </form>
        </div>

      </>
    );
  }
}

TripDetails.contextType = AppContext;
