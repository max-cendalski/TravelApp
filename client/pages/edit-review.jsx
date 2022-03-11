import React from 'react';

export default class EditReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: null
    };
  }

  render() {
    return (
      <div>
        <h1>Edit Review</h1>
      </div>
    );
  }
}
