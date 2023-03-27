import React, { useState, useEffect } from "react";

const ReviewScore = ({
  loggedUsername,
  reviewAuthorName,
  loggedUserId,
  tripId,
}) => {
  const [usersScores, setUsersScores] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [userScoreStatus, setUserScoreStatus] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("TravelApp-token");
    fetch(`/api/trips/score/${tripId}`, {
      method: "GET",
      headers: {
        "X-Access-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (
          loggedUsername === reviewAuthorName ||
          result.some((item) => item.userId === loggedUserId)
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
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  }, []);

  const handleAddScore = (e) => {
    e.preventDefault();
    const scoreToSave = {
      userId: loggedUserId,
      tripId: tripId,
      score: Number(userScore),
    };
    let totalScore = 0;
    const newTotalScore = [...usersScores, scoreToSave];
    newTotalScore.forEach((i) => {
      totalScore = i.score + totalScore;
    });
    const newAverageScore = Math.floor(totalScore / newTotalScore.length);
    setAverageScore(newAverageScore);
    setUserScoreStatus(true);
    setUsersScores(newTotalScore);
    const token = window.localStorage.getItem("TravelApp-token");
    fetch(`/api/trips/score/${tripId}`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreToSave),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error :", error);
      });
  };

  const handleScoreChange = (e) => {
    setUserScore(e.target.value);
  };

  return (

      <section className="average-score-section">
        <h2 className="review-score-header">Review Score: </h2>
        {!userScoreStatus ? (
          <form className="review-score-input-form" onSubmit={handleAddScore}>
            <p>
              <input
                onChange={handleScoreChange}
                className="review-score-input"
                type="number"
                name="score"
                max="100"
              ></input>
            </p>
            <button type="submit" className="add-score-button">
              Add Score
            </button>
          </form>
        ) : (
          <h2>{averageScore} / 100</h2>
        )}
      </section>
  );
};

export default ReviewScore;
