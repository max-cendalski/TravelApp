import React from 'react';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      countries: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    let countryId = this.state.countries.findIndex(country => country.name === this.state.country);
    countryId += 1;
    const review = {
      countryId,
      country: this.state.country,
      city: event.target.city.value,
      review: event.target.review.value
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

      });
  }

  handleChange() {
    this.setState({
      country: event.target.value
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
        <form onSubmit={this.handleSubmit} name="reviewForm">
        <label>
          Choose Country
          <select value={this.state.country.countryId} onChange={this.handleChange}>
            <option></option>
            {
              this.state.countries.map(country =>
                <option key={country.countryId}>{country.name}</option>)
            }
          </select>
          <input type="text" placeholder='city' name='city'>
          </input>
          <textarea rows="10" cols="50" name="review"></textarea>
        </label>
        <input type="submit" value="Submit" />
      </form>
        </div>
      </div>
    );
  }
}
