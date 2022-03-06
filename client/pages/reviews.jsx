import React from 'react';

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myReviews: []
    };
  }

  render() {
    return (
      <div>
        <h1>My Reviews</h1>
      </div>
    );
  }
}
