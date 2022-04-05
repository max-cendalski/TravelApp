import React, { useState, useEffect } from 'react';

// export default function ReviewScore(props) {

/*   useEffect(() => {
    const token = window.localStorage.getItem('TravelApp-token');
    useEffect(() => {
      fetch(`/api/trips/score/${props.tripId}`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(result => {
          console.log('result', result);
          setScores(result);
          console.log(scores);
        });
    }, []);
  }); */

/*   return (
    <section>
      <h2>Review Score</h2>
      <p>{props.tripId}</p>
      <p></p>
    </section>
  );
} */

export default class ReviewScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: null
    };
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
        this.setState({
          scores: result
        });
        console.log('this.state.scores', this.state.scores);
      });
  }

  /*   componentDidUpdate() {
    const token = window.localStorage.getItem('TravelApp-token');
    fetch('/api/trips/score/8', {
      method: 'GET',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          scores: result
        });
      });
  } */

  render() {
    return (
    <section>
      <h2>Review Score</h2>
      <p></p>
      <p>{this.state.tripId}</p>
      <p></p>
    </section>
    );
  }
}
