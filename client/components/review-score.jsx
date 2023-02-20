import {useState, useEffect} from 'react';


const ReviewScore = (props) => {
  const [scoreData, setScore] = useState([])
  const [averageScore,setAverageScore] = useState(0)
  const [userScore, setUserScore] = false;

  useEffect(()=> {
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
        if (props.loggedUsername === props.reviewAuthorName || result.some(item => item.userId === props.loggedUserId)) {
          this.setState({
            userScored: true
          });
        }
        let totalScore = 0;
        if (result.length === 0) return;
        if (result.length > 1) {
          for (let i = 0; i < result.length; i++) {
            totalScore += result[i].score;
          }
          totalScore = Math.floor(totalScore / result.length);
          setAverageScore(totalScore)
          setUserScore(true)
          setScore(result)
        } else {
          totalScore = result[0].score;
          setAverageScore(totalScore)
          setScore(result)
        }

      });


  })


  return (

  )
}

export default class ReviewScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averageScore: 0,
      userScored: false,
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
        if (this.props.loggedUsername === this.props.reviewAuthorName || result.some(item => item.userId === this.props.loggedUserId)) {
          this.setState({
            userScored: true
          });
        }
        let totalScore = 0;
        if (result.length === 0) return;
        if (result.length > 1) {
          for (let i = 0; i < result.length; i++) {
            totalScore += result[i].score;
          }
          totalScore = Math.floor(totalScore / result.length);
          this.setState({
            averageScore: totalScore,
            userScored: true,
            scoreData: result

          });
        } else {
          totalScore = result[0].score;
          this.setState({
            averageScore: totalScore,
            scoreData: result
          });
        }

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
        this.setState({
          averageScore: totalScore,
          userScored: true,
          scoreData: scoreArray
        });
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
        !this.state.userScored
          ? <form onSubmit={this.handleAddScore}><p><strong>{this.state.averageScore} / 100</strong></p><p><input onChange={this.handleScoreChange} className="review-score-input" type="number" name="score" max="100"></input></p><button type="submit" className='app-button'>Add Score</button></form>
          : <p><strong>{this.state.averageScore} / 100</strong></p>
      }
    </section>
    );
  }
}
