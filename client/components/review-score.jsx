import React, { useState, useEffect } from "react";

const ReviewScore = (props) => {
  const [score, setScore] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [userScore, setUserScore] = useState(false);

  useEffect(() => {
    console.log("props", props);
    const token = window.localStorage.getItem("TravelApp-token");
    fetch(`/api/trips/score/${props.tripId}`, {
      method: "GET",
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (
          props.loggedUsername === props.reviewAuthorName ||
          result.some((item) => item.userId === props.loggedUserId)
        ) {
          setUserScore(true);
        }
        let averageScore = 0;
        console.log('result',result)
        if (result.length === 0) return;
        if (result.length > 1) {
          for (let i = 0; i < result.length; i++) {
            averageScore += result[i].score;
          }
          averageScore = Math.floor(averageScore / result.length);
          setAverageScore(averageScore);
          setUserScore(true);
          setScore(result);
        } else {
          averageScore = result[0].score;
          setAverageScore(averageScore);
          setScore(result);
        }
      });
  }, []);

  // MIGHT NOT WORK
  const handleAddScore = (e) => {
    e.preventDefault();
    const score = {
      userId: props.loggedUserId,
      tripId: props.tripId,
      score: props.tripScore,
    };

    const token = window.localStorage.getItem("TravelApp-token");
    console.log("scorev--", score);
    /*  fetch(`/api/trips/score/${props.tripId}`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(score),
    })
      .then((response) => response.json())
      .then((result) => {
        const scoreArray = [...score];
        scoreArray.unshift(result.score);
        let totalScore = 0;
        if (scoreArray.length === 1) {
          totalScore = scoreArray[0].score;
        }
        if (scoreArray.length > 1) {
          for (let i = 0; i < scoreArray.length; i++) {
            totalScore += scoreArray[i].score;
          }
          totalScore = Math.floor(totalScore / scoreArray.length);
        }
        setAverageScore(totalScore);
        setUserScore(true);
        setScore(scoreArray);
      }); */
  };
  // ERROR?
  /* const handleChangeScore = (e) => {
    console.log("ev.", e.target.value);
  }; */

  const handleScoreChange = (e) => {
    console.log("score", score);
    /*  this.setState({
      tripScore: event.target.value
    }); */
  };

  return (
    <section className="review-score">
      <h2>Review Score :</h2>
      {!userScore ? (
        <form onSubmit={handleAddScore}>
          <p>
            <strong>{averageScore} / 100</strong>
          </p>
          <p>
            <input
              onChange={handleScoreChange}
              className="review-score-input"
              type="number"
              name="score"
              max="100"
            ></input>
          </p>
          <button type="submit" className="app-button">
            Add Score
          </button>
        </form>
      ) : (
        <p>
          <strong>{averageScore} / 100</strong>
        </p>
      )}
    </section>
  );
};

export default ReviewScore;
