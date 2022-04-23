import React from 'react';
import Navbar from '../components/navbar';
import AppContext from '../lib/app-context';
import EditReview from '../components/edit-review';
import Comments from '../components/comments';
import ReviewScore from '../components/review-score';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export class TripDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      reviewContainer: 'container',
      editReviewContainer: 'hidden',
      city: '',
      country: '',
      thingsTodoScore: 0,
      foodScore: 0,
      peopleScore: 0,
      transportScore: 0,
      safetyScore: 0,
      review: '',
      comments: [],
      addCommentButton: 'app-button background-orange float-right',
      commentForm: 'hidden',
      comment: '',
      mapCenter: {
        lat: 33.5685,
        lng: -117.7263
      }
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
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleCommentForm = this.handleCommentForm.bind(this);
    this.handleCommentTextarea = this.handleCommentTextarea.bind(this);
    this.handleCancelComment = this.handleCancelComment.bind(this);
  }

  componentDidMount() {
    fetch(`api/trips/${this.props.tripId}`)
      .then(response => response.json())
      .then(trip => {
        this.setState({ trip });
        const address = `${this.state.trip.country}, ${this.state.trip.city}`;
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
            this.setState({ mapCenter: latLng });
          })
          .catch(error => console.error('Error', error));
      });

    fetch(`api/comments/${this.props.tripId}`)
      .then(response => response.json())
      .then(comments => this.setState({ comments }));

  }

  handleEditButton() {
    this.setState({
      reviewContainer: 'hidden',
      editReviewContainer: 'container',
      country: this.state.trip.country,
      city: this.state.trip.city,
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
      city: this.state.city,
      country: this.state.country,
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
      city: event.target.value
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

  handleAddComment(event) {
    this.setState({
      commentForm: 'comment-form',
      addCommentButton: 'hidden'
    });
  }

  handleCommentTextarea(event) {
    this.setState({
      comment: event.target.value
    });
  }

  handleCancelComment(event) {
    event.preventDefault();
    this.setState({
      commentForm: 'hidden',
      comment: '',
      addCommentButton: 'app-button background-orange float-right'
    });
  }

  handleCommentForm(event) {
    event.preventDefault();
    const content = {
      content: this.state.comment
    };
    const token = window.localStorage.getItem('TravelApp-token');
    fetch(`/api/trips/comments/${this.props.tripId}`, {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    })
      .then(response => response.json())
      .then(result => {
        result.comment.username = this.context.user.username;
        const comments = [...this.state.comments];
        comments.unshift(result.comment);
        this.setState({
          comments: comments,
          commentForm: 'hidden',
          comment: '',
          addCommentButton: 'app-button background-orange float-right'
        });
      })
      .catch(error => {
        console.error('Error :', error);
      });
  }

  handleSelect(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ address });
        this.setState({ mapCenter: latLng });
      })
      .catch(error => console.error('Error', error));
  }

  render() {
    if (!this.state.trip) return null;
    const {
      country,
      city,
      username,
      mainPhotoUrl,
      review,
      thingsTodoScore,
      foodScore,
      peopleScore,
      transportScore,
      safetyScore
    } = this.state.trip;
    const containerStyle = {
      position: 'relative',
      width: '40%',
      height: '40%',
      left: '5rem'
    };
    return (
        <>
        <Navbar handleChange={this.handleChange}
                searchBox={this.state.searchBox}
        />
        <article id ="trip-details-container" className='container'>
        <article id="name-location-scores-trip-details">
          <section>
            <h3 className='country-name'>{country} - <span className='city-name'>{city}</span></h3>
            <span className='city-name'>@{username}</span>
          </section>
          <section id="scores-container">
            <ul>
              <li className='score-text'>Things to Do - {thingsTodoScore}</li>
              <li className='score-text'>Food - {foodScore}</li>
              <li className='score-text'>People - {peopleScore}</li>
              <li className='score-text'>Transport - {transportScore}</li>
              <li className='score-text'>Safety - {safetyScore}</li>
            </ul>
          </section>
        </article>

          <section id="map-trip-details-container">
          <Map
            id="map-trip-details"
            containerStyle={containerStyle}
            google={this.props.google}
            center={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }}
            >
            <Marker
            position= {{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }}
            />
          </Map>
        </section>

        <section id="main-photo-trip-details">
          <img className="photo" src={mainPhotoUrl} alt={city}></img>
        </section>

        <article id="review-trip-details">
          <p>{review}</p>
        </article>

        <section>
          {
            this.context.user.username === username && <button onClick={this.handleEditButton} className='app-button background-orange margin-right1rem'>Edit</button>
          }
        </section>

        <section id="review-scores-trip-details">
          <ReviewScore tripId = {this.props.tripId}
                 loggedUserId = {this.context.user.userId}
               loggedUsername = {this.context.user.username}
             reviewAuthorName = {this.state.trip.username}
          />
        </section>

        <section id="comments-trip-details">
          <Comments comments={this.state.comments}
                    loggedUser={this.context.user.username}
                    author={this.state.trip.username}
                    handleAddComment={this.handleAddComment}
                    handleCommentForm={this.handleCommentForm}
                    addCommentButton = {this.state.addCommentButton}
                    commentForm = {this.state.commentForm}
                    handleCommentTextarea = {this.handleCommentTextarea}
                    handleCancelComment = {this.handleCancelComment}
                    commentValue = {this.state.comment}
          />
        </section>

                <article id="edit-trip-review" className={this.state.editReviewContainer}>
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
        </article>
      </article>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCfY6ZRvXRb8M7sKT5QM2pWZmuF6NCECEM'
})(TripDetails);

TripDetails.contextType = AppContext;
