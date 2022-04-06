import React, { useState, useEffect } from 'react';

export default class ReviewScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averageScore: 0,
      userScored: false
    };
  }

  componentDidMount() {
    console.log(this.props.user);
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
        const findUser = result.some(user => user.userId === this.props.user);
        let totalScore = 0;
        for (let i = 0; i < result.length; i++) {
          totalScore += result[i].score;
        }
        totalScore = Math.floor(totalScore / result.length);
        if (findUser === true) {
          this.setState({
            averageScore: totalScore,
            userScored: true
          });
        }
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
    <section className='review-score'>
      <h2>Review Score :</h2>
      {
        this.state.userScored === true ? <p><strong>{this.state.averageScore} / 100</strong> </p> : <p><input type="number" max="100"></input></p>
      }
    </section>
    );
  }
}
