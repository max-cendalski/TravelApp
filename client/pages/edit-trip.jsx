import React, { useState, useEffect } from 'react';

const EditTrip = props => {
  const [trip, setTrip] = useState(null);
  const [tripToEdit, setTripToEdit] = useState({
    city: '',
    thingsTodoScore: 0,
    foodScore: 0,
    peopleScore: 0,
    transportScore: 0,
    safetyScore: 0,
    review: ''
  });

  useEffect(() => {
    const token = window.localStorage.getItem('TravelApp-token');
    fetch(`/api/trips/${props.tripId}`, {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(trip => {
        console.log('trip',trip)
        setTrip( trip );
      })
      .then(update => {
        console.log('udpate',update)
        setTripToEdit({
          city: update.city,
          tripId: tripId,
          mainPhotoUrl: mainPhotoUrl,
          thingsTodoScore: thingsTodoScore,
          foodScore: trip.foodScore,
          peopleScore: trip.peopleScore,
          transportScore: trip.transportScore,
          safetyScore: trip.safetyScore,
          review: trip.review
        });
      });
  },[]);

  const handleSubmitForm = e => {
    e.preventDefault();
    const token = window.localStorage.getItem('TravelApp-token');
    const tripId = Number(props.tripId);
    const editedTrip = {
      city: tripToEdit.city,
      tripId: props.tripId,
      mainPhotoUrl: tripToEdit.mainPhotoUrl,
      thingsTodoScore: tripToEdit.thingsTodoScore,
      foodScore: tripToEdit.foodScore,
      peopleScore: tripToEdit.peopleScore,
      transportScore: tripToEdit.transportScore,
      safetyScore: tripToEdit.safetyScore,
      review: tripToEdit.review
    };
    console.log('edit',editedTrip)
    fetch(`/api/edit/trip/${tripId}`, {
      method: 'PATCH',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedTrip)
    })
      .then(response => response.json())
      .then(result => {
        result.country = trip.country;
        result.username = trip.username;
        setTrip({ result });
        window.location.hash = `#trips?tripId=${props.tripId}`;
      });
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setTripToEdit(prevData => ({
      ...prevData,
      [name]: value
    }));
    console.log('triptoEdit',tripToEdit)
  };

  const handleCancelForm = () => {
    window.location.hash = `#trips?tripId=${props.tripId}`;
  };
  if (!trip) return null;

  return (
    <article id="edit-trip" className="row horizontal">
      <section className="image-container column-width50">
        <img className="photo" src={trip.mainPhotoUrl} alt={trip.city}></img>
      </section>
      <form onSubmit={handleSubmitForm} className="edit-form column-width50">
        <section className="column-width50">
          <p className="label-input-container">
            <label className="edit-score-label">City</label>
            <input
              onChange={handleChange}
              className="edit-form-text-input float-right"
              type="text"
              name="city"
              defaultValue={trip.city}
            ></input>
          </p>
          <p className="label-input-container">
            <label className="edit-score-label">Things to Do</label>
            <input
              onChange={handleChange}
              className="edit-form-text-input float-right"
              type="number"
              max="100"
              name="thingsTodoScore"
              defaultValue={trip.thingsTodoScore}
              required
            ></input>
          </p>
          <p className="label-input-container">
            <label className="edit-score-label">Food</label>
            <input
              onChange={handleChange}
              className="edit-form-text-input float-right"
              type="number"
              max="100"
              name="foodScore"
              defaultValue={trip.foodScore}
              required
            ></input>
          </p>
          <p className="label-input-container">
            <label className="edit-score-label">People</label>
            <input
              onChange={handleChange}
              className="edit-form-text-input float-right"
              type="number"
              max="100"
              name="peopleScore"
              defaultValue={trip.peopleScore}
              required
            ></input>
          </p>
          <p className="label-input-container">
            <label className="edit-score-label">Transport</label>
            <input
              onChange={handleChange}
              className="edit-form-text-input float-right"
              type="number"
              max="100"
              name="transportScore"
              defaultValue={trip.transportScore}
              required
            ></input>
          </p>
          <p className="label-input-container">
            <label className="edit-score-label">Safety</label>
            <input
              onChange={handleChange}
              className="edit-form-text-input float-right"
              type="number"
              max="100"
              name="safetyScore"
              defaultValue={trip.safetyScore}
              required
            ></input>
          </p>
        </section>
        <textarea
          onChange={handleChange}
          defaultValue={trip.review}
          className="form-textarea"
          name="review"
          required
        ></textarea>
        <button
          type="submit"
          className="app-button background-orange float-right"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancelForm}
          className="app-button background-red"
        >
          Cancel
        </button>
      </form>
    </article>
  );
};

export default EditTrip;
/* export default class EditTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      city: '',
      thingsTodoScore: 0,
      foodScore: 0,
      peopleScore: 0,
      transportScore: 0,
      safetyScore: 0,
      review: ''
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleThingsTodoScoreChange = this.handleThingsTodoScoreChange.bind(this);
    this.handleFoodScoreChange = this.handleFoodScoreChange.bind(this);
    this.handlePeopleScoreChange = this.handlePeopleScoreChange.bind(this);
    this.handleTransportScoreChange = this.handleTransportScoreChange.bind(this);
    this.handleSafetyScoreChange = this.handleSafetyScoreChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleCityNameChange = this.handleCityNameChange.bind(this);
    this.handleCancelForm = this.handleCancelForm.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('TravelApp-token');
    fetch(`/api/trips/${this.props.tripId}`, {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(trip => {
        this.setState({ trip });
      })
      .then(update => {
        this.setState({
          city: this.state.trip.city,
          tripId: this.state.trip.tripId,
          mainPhotoUrl: this.state.trip.mainPhotoUrl,
          thingsTodoScore: this.state.trip.thingsTodoScore,
          foodScore: this.state.trip.foodScore,
          peopleScore: this.state.trip.peopleScore,
          transportScore: this.state.trip.transportScore,
          safetyScore: this.state.trip.safetyScore,
          review: this.state.trip.review
        });
      });
  }

  handleSubmitForm(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('TravelApp-token');
    const tripId = Number(this.props.tripId);
    const editedTrip = {
      city: this.state.city,
      tripId: this.props.tripId,
      mainPhotoUrl: this.state.mainPhotoUrl,
      thingsTodoScore: this.state.thingsTodoScore,
      foodScore: this.state.foodScore,
      peopleScore: this.state.peopleScore,
      transportScore: this.state.transportScore,
      safetyScore: this.state.safetyScore,
      review: this.state.review
    };

    fetch(`/api/edit/trip/${tripId}`, {
      method: 'PATCH',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedTrip)
    })
      .then(response => response.json())
      .then(result => {
        result.country = this.state.trip.country;
        result.username = this.state.trip.username;
        this.setState({
          trip: result
        });
        window.location.hash = `#trips?tripId=${this.props.tripId}`;
      });
  }

  handleCityNameChange(event) {
    this.setState({
      city: event.target.value
    });
  }

  handleReviewChange(event) {
    this.setState({
      review: event.target.value
    });
  }

  handleThingsTodoScoreChange(event) {
    this.setState({
      thingsTodoScore: event.target.value
    });
  }

  handleFoodScoreChange(event) {
    this.setState({
      foodScore: event.target.value
    });
  }

  handlePeopleScoreChange(event) {
    this.setState({
      peopleScore: event.target.value
    });
  }

  handleTransportScoreChange(event) {
    this.setState({
      transportScore: event.target.value
    });
  }

  handleSafetyScoreChange(event) {
    this.setState({
      safetyScore: event.target.value
    });
  }

  handleCancelForm() {
    window.location.hash = `#trips?tripId=${this.props.tripId}`;
  }

  render() {
    if (!this.state.trip) return null;
    const {
      city,
      mainPhotoUrl,
      review,
      thingsTodoScore,
      foodScore,
      peopleScore,
      transportScore,
      safetyScore
    } = this.state.trip;
    return (

        <article id='edit-trip' className='row horizontal'>
          <section className='image-container column-width50'>
            <img className='photo' src={mainPhotoUrl} alt={city}></img>
          </section>
          <form onSubmit={this.handleSubmitForm} className='edit-form column-width50'>
          <section className='column-width50'>
            <p className='label-input-container'>
              <label className='edit-score-label'>City</label>
              <input onChange={this.handleCityNameChange} className='edit-form-text-input float-right' type='text' defaultValue={city}></input>
            </p>
            <p className='label-input-container'>
              <label className='edit-score-label'>Things to Do</label>
              <input onChange={this.handleThingsTodoScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={thingsTodoScore} required></input>
            </p>
            <p className='label-input-container'>
              <label className='edit-score-label'>Food</label>
              <input onChange={this.handleFoodScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={foodScore} required></input>
            </p>
            <p className='label-input-container'>
              <label className='edit-score-label'>People</label>
              <input onChange={this.handlePeopleScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={peopleScore} required></input>
            </p>
            <p className='label-input-container'>
              <label className='edit-score-label'>Transport</label>
              <input onChange={this.handleTransportScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={transportScore} required></input>
            </p>
            <p className='label-input-container'>
              <label className='edit-score-label'>Safety</label>
              <input onChange={this.handleSafetyScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={safetyScore} required></input>
            </p>
          </section>
            <textarea onChange={this.handleReviewChange} defaultValue={review} className='form-textarea' required></textarea>
            <button type="submit" className='app-button background-orange float-right'>Submit</button>
            <button type="button" onClick={this.handleCancelForm} className='app-button background-red'>Cancel</button>
          </form>
        </article>

    );
  }
}
 */
