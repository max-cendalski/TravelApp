import React from 'react';
import Navbar from '../components/navbar';
import PlacesAutocomplete from 'react-places-autocomplete';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      address: '',
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
    this.handleTextarea = this.handleTextarea.bind(this);
    this.handleThingsToDoInput = this.handleThingsToDoInput.bind(this);
    this.handleFoodInput = this.handleFoodInput.bind(this);
    this.handlePeopleInput = this.handlePeopleInput.bind(this);
    this.handleTransportInput = this.handleTransportInput.bind(this);
    this.handleSafetyInput = this.handleSafetyInput.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const token = window.localStorage.getItem('TravelApp-token');
    formData.append('country', this.state.country);
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
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleChange(address) {
    const locationString = address;
    const locationArray = locationString.split(',');
    const city = locationArray[0];
    const country = locationArray[locationArray.length - 1].trim();
    this.setState({
      country: country,
      city: city,
      address
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
        <article id="review-form-container">
          <form onSubmit={this.handleSubmit} name="reviewForm">
            <section id="places-autocomplete">

              <PlacesAutocomplete value={this.state.address}
                                  onChange={this.handleChange}
              >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <section id="places-autocomplete-section">
                  <label className='review-score-label'>Your Location</label>
                    <p>
                      <input type="text" name="location" required
                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input'
                        })}
                      />
                    </p>
                   <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#1c861c', cursor: 'pointer', color: '#ffffff' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                          key={index + 1}
                          >
                          <span className='test-class'>{suggestion.description}</span>
                        </div>
                      );
                    })}
                </div>
              </section>
              )}
              </PlacesAutocomplete>
            </section>
            <section id="review-form-scores-section">
              <h3>Your score from 0 to 100</h3>
              <p>
                <input className="review-score-input" onChange={this.handleThingsToDoInput} max="100" type="number" required></input>
                <label className="review-score-label">Things To Do</label>
              </p>
              <p>
                <input className="review-score-input" onChange={this.handleFoodInput} max="100" type="number" required></input>
                <label className="review-score-label">Food</label>
              </p>
              <p>
                <input className="review-score-input" onChange={this.handlePeopleInput} max="100" type="number" required></input>
                <label className="review-score-label">People</label>
              </p>
              <p>
                <input className="review-score-input" onChange={this.handleTransportInput} max="100" type="number" required></input>
                <label className="review-score-label">Transport</label>
              </p>

              <p>
                <input className="review-score-input" onChange={this.handleSafetyInput} max="100" type="number" required></input>
                <label className="review-score-label">Safety</label>
              </p>
            </section>
            <section id="review-form-upload-file-section">
              <h3>Upload File</h3>
              <input className='form-file-upload'
                required
                type="file"
                name="image"
                ref={this.fileInputRef}
                accept=".png, .jpg, .jpeg, .gif"
              />
            </section>
            <section id="review-form-textarea-section">
              <h3>Your review</h3>
              <textarea className='form-textarea' onChange={this.handleTextarea} rows="20" name="review" required></textarea>
              <button className='app-button background-orange float-right'>Confirm</button>
              <button className='app-button background-red' onClick={this.handleCancelTripReview}>Cancel</button>
            </section>
          </form>
        </article>
      </div>
    );
  }
}
