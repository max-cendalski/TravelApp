import React from 'react';
import Navbar from '../components/navbar';
import PlacesAutocomplete from 'react-places-autocomplete';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryId: '',
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
    this.handleOnLocationSubmit = this.handleOnLocationSubmit.bind(this)
  }


  componentDidMount() {
    console.log('componentDidMount')
/*     fetch('/api/countries', {
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
      }); */
  }

  handleOnLocationSubmit(event) {
    event.preventDefault()
    console.log('whee')
    console.log('this.state.address',this.state.address)
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

  handleChange = address => {
    this.setState({ address });
  };

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
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            handleOnLocationSubmit = {this.handleOnLocationSubmit}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
               <form onSubmit={this.handleOnLocationSubmit}>
                 <input type="text"
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <button>Add Location</button>
               </form>
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion,index) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                     <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        key={index + 1}
                      >
                      <span className='test-class'>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
            <form className ="review-form" onSubmit={this.handleSubmit} name="reviewForm">
              <div className='row column-width100'>

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
              <textarea className='column-width100' onChange={this.handleTextarea} rows="20" name="review" required></textarea>
              <button className='app-button background-orange float-right'>Confirm</button>
              <button className='app-button background-red' onClick={this.handleCancelTripReview}>Cancel</button>
            </form>
          </div>
      </div>
    );
  }
}



/*
    <div className='review-form-left column-width50'>
                  <div>
                    <label className="review-form-label">Location</label>
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
                </div> */
