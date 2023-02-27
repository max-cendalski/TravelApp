import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/navbar";
import Comments from "../components/comments";
import ReviewScore from "../components/review-score";
import MapComponent from "../components/map";
import { AppDataContext } from "../components/context";

const TripDetails = (props) => {
  const tripDetailsContext = useContext(AppDataContext);
  const [trip, setTrip] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [commentsSection, setCommentsSection] = useState({
    addCommentButton: "app-button background-orange float-right",
    commentForm: "hidden",
  });

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
        .then((trip) => setTrip(trip)),
      fetch(`/api/comments/${props.tripId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((comments) => setComments(comments)),
    ]).catch((error) => console.error("Error", error));
  }, []);

  const handleEditButton = () => {
    window.location.hash = `#edit/trip?tripId=${props.tripId}`;
  };

  const handleCommentForm = (e) => {
    e.preventDefault();
    const content = {
      content: comment,
    };
    const token = window.localStorage.getItem("TravelApp-token");
    fetch(`/api/trips/comments/${props.tripId}`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })
      .then((response) => response.json())
      .then((result) => {
        result.comment.username = tripDetailsContext.user.username;
        const newComments = [...comments];
        newComments.unshift(result.comment);
        setComments(newComments);
        setCommentsSection({
          addCommentButton: "app-button background-orange float-right",
          commentForm: "hidden",
        });
        setComment("");
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  };

  const handleAddCommentButton = () => {
    setCommentsSection({
      commentForm: "comment-form",
      addCommentButton: "hidden",
    });
  };

  const handleCommentTextarea = (e) => {
    setComment(e.target.value);
  };

  const handleCancelComment = (e) => {
    e.preventDefault();
    setCommentsSection({
      commentForm: "hidden",
      addCommentButton: "app-button background-orange float-right",
    });
  };







  const handleDeleteComment = (comment) => {
    console.log('comment',comment)
  };

  if (!trip) return null;
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
    safetyScore,
  } = trip;
  return !tripDetailsContext.user ? (
    <article>
      <h1 className="nothing-found-msg">
        You need to be logged in to see detail trip review!
      </h1>
    </article>
  ) : (
    <article>
      <Navbar />
      <article className="container" id="trip-details-container">
        <article id="name-location-scores-trip-details">
          <section>
            <h2 className="country-name">
              {trip.country}-<span className="city-name">{trip.city}</span>
            </h2>
            <h3> @{username}</h3>
          </section>
          <section>
            <ul>
              <li className="score-text">Things to Do - {thingsTodoScore}</li>
              <li className="score-text">Food - {foodScore}</li>
              <li className="score-text">People - {peopleScore}</li>
              <li className="score-text">Transport - {transportScore}</li>
              <li className="score-text">Safety - {safetyScore}</li>
            </ul>
          </section>
        </article>
        <MapComponent city={city} country={country} />
        <section id="main-photo-trip-details">
          <img className="photo" src={mainPhotoUrl} alt={city}></img>
        </section>
        <article id="review-trip-details">
          <p>{review}</p>
        </article>
        <section id="review-edit-button-trip-details">
          {tripDetailsContext.user.username === username && (
            <button
              onClick={handleEditButton}
              className="app-button background-orange"
            >
              Edit Review
            </button>
          )}
        </section>
        <section id="scores-trip-details">
          <ReviewScore
            tripId={props.tripId}
            loggedUserId={tripDetailsContext.user.userId}
            loggedUsername={tripDetailsContext.user.username}
            reviewAuthorName={trip.username}
          />
        </section>
        <section id="comments-trip-details">
          <Comments
            comments={comments}
            loggedUser={tripDetailsContext.user.username}
            author={trip.username}
            handleCommentForm={handleCommentForm}
            addCommentButton={commentsSection.addCommentButton}
            handleAddCommentButton={handleAddCommentButton}
            commentForm={commentsSection.commentForm}
            handleCommentTextarea={handleCommentTextarea}
            handleCancelComment={handleCancelComment}
            handleDeleteComment={handleDeleteComment}
            commentValue={comment}
          />
        </section>
      </article>
    </article>
  );
};

export default TripDetails;
