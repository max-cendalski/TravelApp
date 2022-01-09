import React from 'react';
import Navbar from '../components/navbar';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryId: '',
      countries: [],
      city: '',
      review: '',
      thingsTodoScore: 0,
      foodScore: 0,
      peopleScore: 0,
      transportScore: 0,
      safetyScore: 0
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelTripReview = this.handleCancelTripReview.bind(this);
    this.handleCityInput = this.handleCityInput.bind(this);
    this.handleTextarea = this.handleTextarea.bind(this);
    this.handleThingsToDoInput = this.handleThingsToDoInput.bind(this);
    this.handleFoodInput = this.handleFoodInput.bind(this);
    this.handlePeopleInput = this.handlePeopleInput.bind(this);
    this.handleTransportInput = this.handleTransportInput.bind(this);
    this.handleSafetyInput = this.handleSafetyInput.bind(this);
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
    const formData = new FormData();
    const token = window.localStorage.getItem('TravelApp-token');
    formData.append('countryId', this.state.countryId);
    formData.append('city', this.state.city);
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('review', this.state.review);
    formData.append('thingsTodoScore', this.state.thingsTodoScore);
    formData.append('foodScore', this.state.foodScore);
    formData.append('peopleScore', this.state.peopleScore);
    formData.append('transportScore', this.state.transportScore);
    formData.append('safetyScore', this.state.safetyScore);

    fetch('/api/trips', {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        window.location.hash = '#';
        this.fileInputRef.current.value = null;
      })
      .catch(error => {
        console.error('Error:', error);
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

  handleThingsToDoInput(event) {
    event.preventDefault();
    this.setState({
      thingsTodoScore: event.target.value
    });
  }

  handleFoodInput(event) {
    event.preventDefault();
    this.setState({
      foodScore: event.target.value
    });
  }

  handlePeopleInput(event) {
    event.preventDefault();
    this.setState({
      peopleScore: event.target.value
    });
  }

  handleTransportInput(event) {
    event.preventDefault();
    this.setState({
      transportScore: event.target.value
    });
  }

  handleSafetyInput(event) {
    event.preventDefault();
    this.setState({
      safetyScore: event.target.value
    });
  }

  render() {
    return (
      <div className='container'>
        <Navbar />
          <div className='row centered padding-top15vh'>
            <form className ="review-form" onSubmit={this.handleSubmit} name="reviewForm">
              <div className='row column-width100'>
                <div className='review-form-left column-width50'>
                  <div>
                    <label className="review-form-label">Country</label>
                    <br />
                    <select className="select-element" value={this.state.countryId} onChange={this.handleChange} required>
                    <option></option>
                    {
                      this.state.countries.map(country =>
                      <option key={country.countryId} value={country.countryId}>{country.name}</option>)
                    }
                    </select>
                  </div>
                  <label className="review-form-label">City</label>
                  <br />
                  <input className="form-input-element" onChange={this.handleCityInput} type="text" placeholder='city' name='city' required></input>
                </div>
                <div className='review-form-right column-width50'>
                  <h3>Your score from 0 to 100</h3>
                  <input className="review-score-input" onChange={this.handleThingsToDoInput} max="100" type="number" required></input>
                  <label className="review-score-label">Things To Do</label>
                  <br />
                  <input className="review-score-input" onChange={this.handleFoodInput} max="100" type="number" required></input>
                  <label className="review-score-label">Food</label>
                  <br />
                  <input className="review-score-input" onChange={this.handlePeopleInput} max="100" type="number" required></input>
                  <label className="review-score-label">People</label>
                  <br />
                  <input className="review-score-input" onChange={this.handleTransportInput} max="100" type="number" required></input>
                  <label className="review-score-label">Transport</label>
                  <br />
                  <input className="review-score-input" onChange={this.handleSafetyInput} max="100" type="number" required></input>
                  <label className="review-score-label">Safety</label>
                </div>
                <div>
                <h3>Upload File</h3>
                <input className='file-upload'
                  required
                  type="file"
                  name="image"
                  ref={this.fileInputRef}
                  accept=".png, .jpg, .jpeg, .gif" />
                </div>
              </div>
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

/* handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('TravelApp-token');
    const review = {
      countryId: this.state.countryId,
      city: this.state.city,
      review: this.state.review,
      thingsTodoScore: this.state.thingsTodoScore,
      foodScore: this.state.foodScore,
      peopleScore: this.state.peopleScore,
      transportScore: this.state.transportScore,
      safetyScore: this.state.safetyScore
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
  } */
