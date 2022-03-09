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
    // console.log('whee');
    fetch('/api/reviews/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          myReviews: result
        });
      });
    // console.log(this.state.myReviews);
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
