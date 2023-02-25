import React, { useState, useEffect } from "react";

const ReviewScore = (props) => {
  const [usersScores, setUsersScores] = useState([]);
  const [userScore, setUserScore] = useState(0);
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
        if (result.length > 1) {
          for (let i = 0; i < result.length; i++) {
            averageScore += result[i].score;
          }
          averageScore = Math.floor(averageScore / result.length);
          setAverageScore(averageScore);
          setUsersScores(result);
        } else {
          averageScore = result[0].score;
          setAverageScore(averageScore);
          setUsersScores(result);
        }
      });
  }, []);


  const handleAddScore = (e) => {
    e.preventDefault();
    const scoreToSave = {
      userId: props.loggedUserId,
      tripId: props.tripId,
      score: Number(userScore),
    };
    const token = window.localStorage.getItem("TravelApp-token");
    fetch(`/api/trips/score/${props.tripId}`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreToSave),
    })
      .then((response) => response.json())
      .then((result) => {
        let totalScore = 0;
        let newTotalScore = [...usersScores, scoreToSave];
        newTotalScore.forEach((i) => totalScore = i.score + totalScore);
        let newAverageScore = Math.floor(totalScore / newTotalScore.length);
        setAverageScore(newAverageScore);
        setUserScoreStatus(true);
        setUsersScores(newTotalScore);
      });
  };

  const handleScoreChange = (e) => {
    setUserScore(e.target.value);
  };
  console.log("usersScores", usersScores);

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
