import React from 'react';
import Navbar from '../components/navbar';
import AppContext from '../lib/app-context';
import EditReview from '../components/edit-review';
import Comments from '../components/comments';

export default class TripDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      reviewContainer: 'container',
      editReviewContainer: 'hidden',
      cityName: '',
      countryName: '',
      thingsTodoScore: 0,
      foodScore: 0,
      peopleScore: 0,
      transportScore: 0,
      safetyScore: 0,
      review: '',
      comments: []
    };
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleSubmitEditedForm = this.handleSubmitEditedForm.bind(this);
    this.handleThingsTodoScoreChange = this.handleThingsTodoScoreChange.bind(this);
    this.handleFoodScoreChange = this.handleFoodScoreChange.bind(this);
    this.handlePeopleScoreChange = this.handlePeopleScoreChange.bind(this);
    this.handleTransportScoreChange = this.handleTransportScoreChange.bind(this);
    this.handleSafetyScoreChange = this.handleSafetyScoreChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleCityNameChange = this.handleCityNameChange.bind(this);
    this.handleCancelForm = this.handleCancelForm.bind(this);
  }

  componentDidMount() {
    fetch(`api/trips/${this.props.tripId}`)
      .then(response => response.json())
      .then(trip => this.setState({ trip }));
    fetch(`api/comments/${this.props.tripId}`)
      .then(response => response.json())
      .then(comments => this.setState({ comments }));
  }

  handleEditButton() {
    this.setState({
      reviewContainer: 'hidden',
      editReviewContainer: 'container',
      cityName: this.state.trip.cityName,
      thingsTodoScore: this.state.trip.thingsTodoScore,
      foodScore: this.state.trip.foodScore,
      peopleScore: this.state.trip.peopleScore,
      transportScore: this.state.trip.transportScore,
      safetyScore: this.state.trip.safetyScore,
      review: this.state.trip.review
    });
  }

  handleSubmitEditedForm(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('TravelApp-token');
    const editedTrip = {
      cityName: this.state.cityName,
      tripId: this.props.tripId,
      mainPhotoUrl: this.state.trip.mainPhotoUrl,
      thingsTodoScore: this.state.thingsTodoScore,
      foodScore: this.state.foodScore,
      peopleScore: this.state.peopleScore,
      transportScore: this.state.transportScore,
      safetyScore: this.state.safetyScore,
      review: this.state.review
    };

    fetch(`/api/reviews/${this.props.tripId}`, {
      method: 'PATCH',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedTrip)
    })
      .then(response => response.json())
      .then(result => {
        result.countryName = this.state.trip.countryName;
        result.username = this.state.trip.username;
        this.setState({
          trip: result,
          reviewContainer: 'container',
          editReviewContainer: 'hidden'
        });
      });
  }

  handleCityNameChange(event) {
    this.setState({
      cityName: event.target.value
    });
  }

  handleReviewChange(event) {
    this.setState({
      review: event.target.value
    });
  }

  handleThingsTodoScoreChange(event) {
    this.setState({
      thingsTodoScore: event.target.value
    });
  }

  handleFoodScoreChange(event) {
    this.setState({
      foodScore: event.target.value
    });
  }

  handlePeopleScoreChange(event) {
    this.setState({
      peopleScore: event.target.value
    });
  }

  handleTransportScoreChange(event) {
    this.setState({
      transportScore: event.target.value
    });
  }

  handleSafetyScoreChange(event) {
    this.setState({
      safetyScore: event.target.value
    });
  }

  handleCancelForm(event) {
    this.setState({
      reviewContainer: 'container',
      editReviewContainer: 'hidden'
    });
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
                    <p className='country-name'>{countryName} - <span className='city-name'>{cityName}</span></p>
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
                        handleCityNameChange = {this.handleCityNameChange}
                        handleThingsTodoScoreChange = {this.handleThingsTodoScoreChange}
                        handleFoodScoreChange = {this.handleFoodScoreChange}
                        handlePeopleScoreChange = {this.handlePeopleScoreChange}
                        handleTransportScoreChange = {this.handleTransportScoreChange}
                        handleSafetyScoreChange = {this.handleSafetyScoreChange}
                        handleSubmitEditedForm={this.handleSubmitEditedForm}
                        handleReviewChange = {this.handleReviewChange}
                        handleCancelForm = {this.handleCancelForm}
                        />
        </div>
        <div className={this.state.reviewContainer}>
          <Comments comments={this.state.comments}
                    user={this.context.username}
                        />
        </div>
      </>
    );
  }
}

TripDetails.contextType = AppContext;
