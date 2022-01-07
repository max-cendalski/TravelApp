import React from 'react';
import Navbar from '../components/navbar';
export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryId: '',
      countries: [],
      city: '',
      review: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelTripReview = this.handleCancelTripReview.bind(this);
    this.handleCityInput = this.handleCityInput.bind(this);
    this.handleTextarea = this.handleTextarea.bind(this);
  }

  componentDidMount() {
    fetch('/api/countries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          countries: result
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('TravelApp-token');
    const review = {
      countryId: this.state.countryId,
      city: this.state.city,
      review: this.state.review
    };
    fetch('/api/trips', {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
      .then(response => response.json())
      .then(result => {
        window.location.hash = '#';
      });
  }

  handleChange(event) {
    this.setState({
      countryId: event.target.value
    });
  }

  handleCityInput(event) {
    this.setState({
      city: event.target.value
    });
  }

  handleTextarea(event) {
    this.setState({
      review: event.target.value
    });
  }

  handleCancelTripReview() {
    event.preventDefault();
    window.location.hash = '#';
  }

  render() {
    return (
      <div className='container'>
      <Navbar />
        <div className='row centered padding-top20vh'>
          <form className ="review-form" onSubmit={this.handleSubmit} name="reviewForm">
            <label className="review-form-label">Country</label>
            <br />
              <select className="select-element" value={this.state.countryId} onChange={this.handleChange} required>
                <option></option>
                {
                  this.state.countries.map(country =>
                  <option key={country.countryId} value={country.countryId}>{country.name}</option>)
                }
              </select>
              <br />
              <label className="review-form-label">City</label>
              <br />
              <input className="form-input-element column-width100" onChange={this.handleCityInput} type="text" placeholder='city' name='city' required></input>
              <br />
              <label className='review-form-label'>Review</label>
              <textarea className='column-width100' onChange={this.handleTextarea}rows="20" name="review" required></textarea>
              <button className='confirm-form-button height-2rem'>Confirm</button>
              <button className='cancel-form-button' onClick={this.handleCancelTripReview}>Cancel</button>
        </form>
        </div>
        </div>

    );
  }
}
