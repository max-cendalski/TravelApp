import React, { useState, useEffect } from "react";

const ReviewScore = (props) => {
  const [score, setScore] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [userScoreStatus, setUserScoreStatus] = useState(false);

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
          setUserScoreStatus(true);
        }
        if (result.length === 0) return;
        let averageScore = 0;
        result.push({userId:10,tripId:3,score: 10})
        if (result.length > 1) {
          for (let i = 0; i < result.length; i++) {
            averageScore += result[i].score;
          }
          averageScore = Math.floor(averageScore / result.length);
          setAverageScore(averageScore);
          setScore(result);
        }  else {
          averageScore = result[0].score;
          setAverageScore(averageScore);
          setScore(result);
        }
      });
  }, []);

  // MIGHT NOT WORK
  const handleAddScore = (e) => {
    e.preventDefault();
    const scoreToSave = {
      userId: props.loggedUserId,
      tripId: props.tripId,
      score
    };

    const token = window.localStorage.getItem("TravelApp-token");
    console.log("scorev--", scoreToSave);
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

  const handleScoreChange = e => {
    console.log("score", score);
    setScore(e.target.value)
  };

  return (
    <section className="review-score">
      <h2>Review Score :</h2>
      {!userScoreStatus ? (
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
