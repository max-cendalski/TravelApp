import React from 'react';
import Navbar from '../components/navbar';
import AppContext from '../lib/app-context';
import EditReview from '../components/edit-review';

export default class TripDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      reviewContainer: 'container',
      editReviewContainer: 'hidden',
      countryName: '',
      cityName: 0,
      thingsTodoScore: 0,
      foodScore: 0,
      peopleScore: 0,
      transportScore: 0,
      safetyScore: 0,
      review: '',
      testTrip: null
    };
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleSubmitEditedForm = this.handleSubmitEditedForm.bind(this);
  }

  handleEditButton() {
    this.setState({
      reviewContainer: 'hidden',
      editReviewContainer: 'container'
    });
  }

  handleSubmitEditedForm(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('TravelApp-token');
    const editedTrip = {
      tripId: this.props.tripId,
      userId: this.state.trip.userId,
      userName: this.state.trip.username,
      mainPhotoUrl: this.state.trip.mainPhotoUrl,
      countryName: this.state.trip.countryName,
      cityName: this.state.trip.cityName,
      thingsTodoScore: this.state.trip.thingsTodoScore,
      foodScore: this.state.trip.foodScore,
      peopleScore: this.state.trip.peopleScore,
      transportScore: this.state.trip.transportScore,
      safetyScore: this.state.trip.safetyScore,
      review: this.state.trip.review
    };
    console.log('this.state.trip', this.state.trip);
    console.log('this.props.tripId:', this.props.tripId);

    fetch('/api/reviews/:tripId', {
      method: 'PUT',
      headers: {
        'x-access-token': token
      },
      body: editedTrip
    })
      .then(response => response.json())
      .then(result => {
        console.log('result', result);
        this.setState({
          testTrip: editedTrip
        })
          .catch(error => {
            console.error('Error:', error);
          });
      });
  }

  componentDidMount() {
    fetch(`api/trips/${this.props.tripId}`)
      .then(response => response.json())
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
        <div className={this.state.reviewContainer}>
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
        <div className={this.state.editReviewContainer}>
            <EditReview trip={this.state.trip}
                        handleSubmitEditedForm={this.handleSubmitEditedForm}
                        />
        </div>
      </>
    );
  }
}

TripDetails.contextType = AppContext;
