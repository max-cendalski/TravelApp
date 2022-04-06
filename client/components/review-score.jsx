import React, { useState, useEffect } from 'react';

export default class ReviewScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averageScore: 0
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
        let totalScore = 0;
        for (let i = 0; i < result.length; i++) {
          totalScore += result[i].score;
        }
        totalScore = Math.floor(totalScore / result.length);
        this.setState({
          averageScore: totalScore
        });
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
      <p><strong>{this.state.averageScore}</strong></p>
    </section>
    );
  }
}
