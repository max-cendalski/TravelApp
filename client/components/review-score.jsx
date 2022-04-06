import React from 'react';
export default class ReviewScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averageScore: 0,
      userScored: false,
      tripScore: 0,
      scoreData: []
    };
    this.handleAddScore = this.handleAddScore.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('TravelApp-token');
    fetch(`/api/trips/score/${this.props.tripId}`, {
      method: 'GET',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        let totalScore = 0;
        if (result.length > 1) {
          for (let i = 0; i < result.length; i++) {
            totalScore += result[i].score;
          }
          totalScore = Math.floor(totalScore / result.length);
        } else {
          totalScore = 0;
        }

        console.log('total score', totalScore);
        const findUser = result.some(user => user.userId === this.props.user);
        if (findUser === true) {
          this.setState({
            averageScore: totalScore,
            userScored: true,
            scoreData: result
          });
        }
        console.log('this.state.scoreData', this.state.scoreData);
      });
  }

  handleAddScore(event) {
    event.preventDefault();
    const score = {
      userId: this.props.user,
      tripId: this.props.tripId,
      score: this.state.tripScore
    };

    const token = window.localStorage.getItem('TravelApp-token');
    fetch(`/api/trips/score/${this.props.tripId}`, {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(score)
    })
      .then(response => response.json())
      .then(result => {
        const scoreArray = [...this.state.scoreData];
        scoreArray.push(result.score);
        let totalScore = 0;
        if (scoreArray.length > 1) {
          for (let i = 0; i < scoreArray.length; i++) {
            totalScore += scoreArray[i].score;
          }
          totalScore = Math.floor(totalScore / result.length);
          this.setState({
            averageScore: totalScore,
            userScored: true
          });
        }
      });
  }

  handleScoreChange(event) {
    this.setState({
      tripScore: event.target.value
    });
  }

  render() {
    return (
    <section className='review-score'>
      <h2>Review Score :</h2>
      {
        this.state.userScored === true
          ? <p><strong>{this.state.averageScore} / 100</strong> </p>
          : <form onSubmit={this.handleAddScore}><p><input onChange={this.handleScoreChange} className="review-score-input" type="number" name="score" max="100"></input></p><button type="submit" className='app-button'>Add Score</button></form>
      }
    </section>
    );
  }
}
