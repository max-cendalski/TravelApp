import React from 'react';
import AppContext from '../lib/app-context';

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myReviews: null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('TravelApp-token');
    fetch('/api/reviews', {
      method: 'GET',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          myReviews: result
        });
      });
  }

  render() {
    return (
      <div>
        <h1>My Reviews</h1>
      </div>
    );
  }
}

Reviews.contextType = AppContext;
