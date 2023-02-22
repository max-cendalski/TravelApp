import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/navbar";
//import AppContext from '../lib/app-context';
import Comments from "../components/comments";
import ReviewScore from "../components/review-score";
import MapComponent from "../components/map";
import { AppDataContext } from "../components/context";

const TripDetails = (props) => {
  const tripDetailsContext = useContext(AppDataContext);
  const [trip, setTrip] = useState(null);
  const [classes, setClasses] = useState({
    editReviewContainer: "hidden",
    tripDetailsContainer: "container",
    idTripDetailsContainer: "trip-details-container",
    addCommentButton: "app-button background-orange float-right",
    commentForm: "hidden",
  });
  const [details, setDetails] = useState({
    city: "",
    country: "",
    thingsTodoScore: 0,
    foodScore: 0,
    peopleScore: 0,
    transportScore: 0,
    safetyScore: 0,
    review: "",
    comment: "",
    comments: [],
  });
  const [err, setErr] = useState(false);
  const [position, setPosition] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("TravelApp-token");
    Promise.all([
      fetch(`/api/trips/${props.tripId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((trip) => setTrip(trip )),
      fetch(`/api/comments/${props.tripId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((comments) => setDetails({ comments })),
    ]).catch((error) => console.error("Error", error));
  }, []);

  const handleEditButton = () => {
    window.location.hash = `#edit/trip?tripId=${props.tripId}`;
  };

  const handleSubmitEditedForm = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("TravelApp-token");
    const editedTrip = {
      city: details.city,
      country: details.country,
      tripId: props.tripId,
      mainPhotoUrl: details.mainPhotoUrl,
      thingsTodoScore: details.thingsTodoScore,
      foodScore: details.foodScore,
      peopleScore: details.peopleScore,
      transportScore: details.transportScore,
      safetyScore: details.safetyScore,
      review: details.review,
    };

    fetch(`/api/reviews/${props.tripId}`, {
      method: "PATCH",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTrip),
    })
      .then((response) => response.json())
      .then((result) => {
        result.countryName = trip.countryName;
        result.username = trip.username;

        setTrip(result);
        setClasses((editReviewContainer = "hidden"));
        //   reviewContainer: "container",
      });
  };

  return <article>whe</article>;
};

export default TripDetails;
/* export default class TripDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      position: null,
      redirect: false,
      trip: null,
      editReviewContainer: 'hidden',
      tripDetailsContainer: 'container',
      idTripDetailsContainer: 'trip-details-container',
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
      comment: ''
    };

    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleCommentForm = this.handleCommentForm.bind(this);
    this.handleCommentTextarea = this.handleCommentTextarea.bind(this);
    this.handleCancelComment = this.handleCancelComment.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('TravelApp-token');
    Promise.all([
      fetch(`/api/trips/${this.props.tripId}`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json()).then(trip => this.setState({ trip })),
      fetch(`/api/comments/${this.props.tripId}`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then(comments => this.setState({ comments }))
    ]).catch(error => console.error('Error', error));
  }

  handleEditButton(event) {
    window.location.hash = `#edit/trip?tripId=${this.props.tripId}`;
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

    return (
      !this.context.user
        ? <article>
            <h1 className='nothing-found-msg'>You need to be logged in to see detail trip review!</h1>
          </article>
        : <article>
            <Navbar handleChange={this.handleChange}
                    searchBox={this.state.searchBox}
            />
          <article id={this.state.idTripDetailsContainer} className={this.state.tripDetailsContainer}>
            <article id="name-location-scores-trip-details">
              <section>
                <h2 className='country-name'>{country}-<span className='city-name'>{city}</span></h2>
                <h3> @{username}</h3>
              </section>
              <section>
                <ul>
                  <li className='score-text'>Things to Do - {thingsTodoScore}</li>
                  <li className='score-text'>Food - {foodScore}</li>
                  <li className='score-text'>People - {peopleScore}</li>
                  <li className='score-text'>Transport - {transportScore}</li>
                  <li className='score-text'>Safety - {safetyScore}</li>
                </ul>
              </section>
            </article>

            <MapComponent
                    city={city}
                 country={country}
            />

            <section id="main-photo-trip-details">
              <img className="photo" src={mainPhotoUrl} alt={city}></img>
            </section>

            <article id="review-trip-details">
              <p>{review}</p>
            </article>

            <section id="review-edit-button-trip-details">
              {
                this.context.user.username === username && <button onClick={this.handleEditButton} className='app-button background-orange'>Edit Review</button>
              }
            </section>

            <section id="scores-trip-details">
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
          </article>
        </article>
    );
  }
}
 */
//TripDetails.contextType = AppContext;
