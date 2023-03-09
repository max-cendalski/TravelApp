import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/navbar";
import Comments from "../components/comments";
import ReviewScore from "../components/review-score";
import MapComponent from "../components/map";
import Time from "../components/date";
import Weather from "../components/weather";
import { AppDataContext } from "../components/context";

const TripDetails = (props) => {
  const tripDetailsContext = useContext(AppDataContext);
  const [trip, setTrip] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [overallScore, setOverallScore] = useState(0);

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
        .then((trip) => {
          setTrip(trip);
          setOverallScore(
            (trip.thingsTodoScore +
              trip.foodScore +
              trip.peopleScore +
              trip.transportScore +
              trip.safetyScore) /
              5
          );
        }),
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

  const handleDeleteComment = (id) => {
    const commentId = Number(id);
    const token = window.localStorage.getItem("TravelApp-token");
    setComments(comments.filter((comment) => comment.commentId !== id));
    fetch(`/api/trips/${commentId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error :", error);
      });
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
      <Navbar />
      <h1 className="nothing-found-msg">
        You need to be logged in to see detail trip review!
      </h1>
    </article>
  ) : (
    <article>
      <Navbar />
      <article className="container" id="trip-details-container">
        <section id="name-location-container">
          <h3 className="name-location-element-user">Review by @{username}</h3>
          <h3 className="name-location-element">
            Country: {trip.country.toUpperCase()}
          </h3>
          <h3 className="name-location-element">City: {trip.city}</h3>

          <Weather location={trip}/>
        </section>
        <section id="scores-trip-details">
          <ul>
            <li className="score-text">Things to Do - {thingsTodoScore}</li>
            <li className="score-text">Food - {foodScore}</li>
            <li className="score-text">People - {peopleScore}</li>
            <li className="score-text">Transport - {transportScore}</li>
            <li className="score-text">Safety - {safetyScore}</li>
            <li className="overall-score">
              Overall trip score: {overallScore}/100
            </li>
          </ul>
        </section>

        <MapComponent city={city} country={country} />
        <section id="main-photo-trip-details">
          <img className="photo" src={mainPhotoUrl} alt={city}></img>
        </section>
        <article id="review-trip-details">
          <p>{review}</p>
          <Time date={trip.created} />
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
        <section id="users-score-trip-details">
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

//      <Weather location={trip} />;
//<Time date={trip.created} />
