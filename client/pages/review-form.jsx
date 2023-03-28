import React, { useState } from 'react';
import Navbar from '../components/navbar';
import PlacesAutocomplete from 'react-places-autocomplete';

const ReviewForm = () => {
  const [form, setForm] = useState({
    country: '',
    address: '',
    city: '',
    title: '',
    review: '',
    thingsTodoScore: 0,
    foodScore: 0,
    peopleScore: 0,
    transportScore: 0,
    safetyScore: 0
  });
  const [selectedImage, setSelectedImage] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    const date = Date.now();
    const formData = new FormData();
    const token = window.localStorage.getItem('TravelApp-token');
    formData.append('country', form.country.toLowerCase());
    formData.append('city', form.city);
    formData.append('image', selectedImage);
    formData.append('title', form.title);
    formData.append('review', form.review);
    formData.append('thingsTodoScore', form.thingsTodoScore);
    formData.append('foodScore', form.foodScore);
    formData.append('peopleScore', form.peopleScore);
    formData.append('transportScore', form.transportScore);
    formData.append('safetyScore', form.safetyScore);
    formData.append('created', date);

    fetch('/api/trips', {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: formData
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
    window.location.hash = 'my-reviews';
  };

  const handleChange = address => {
    const locationString = address;
    const locationArray = locationString.split(',');
    const city = locationArray[0];
    const country = locationArray[locationArray.length - 1].trim();
    setForm({
      country,
      city,
      address
    });
  };

  const handleChangeFormData = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setForm(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCancelTripReview = () => {
    window.location.hash = history.go(-1);
  };

  const changeImage = e => {
    setSelectedImage(e.target.files[0]);
  };
  return (
    <div className="container">
      <Navbar />
      <article id="review-form-container">
        <form onSubmit={handleSubmit} name="reviewForm">
          <section id="places-autocomplete">
            <PlacesAutocomplete value={form.address} onChange={handleChange}>
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <section id="places-autocomplete-section">
                  <label className="review-score-label">Your Location</label>
                  <p>
                    <input
                      type="text"
                      name="location"
                      required
                      {...getInputProps({
                        placeholder: 'type city and country',
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
                      const style = suggestion.active
                        ? {
                            backgroundColor: '#1c861c',
                            cursor: 'pointer',
                            color: '#ffffff'
                          }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                          key={index + 1}
                        >
                          <span className="test-class">
                            {suggestion.description}
                          </span>
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
              <input
                className="review-score-input"
                onChange={handleChangeFormData}
                max="100"
                type="number"
                required
                name="thingsTodoScore"
              ></input>
              <label className="review-score-label">Things To Do</label>
            </p>
            <p>
              <input
                className="review-score-input"
                onChange={handleChangeFormData}
                max="100"
                type="number"
                required
                name="foodScore"
              ></input>
              <label className="review-score-label">Food</label>
            </p>
            <p>
              <input
                className="review-score-input"
                onChange={handleChangeFormData}
                max="100"
                type="number"
                required
                name="peopleScore"
              ></input>
              <label className="review-score-label">People</label>
            </p>
            <p>
              <input
                className="review-score-input"
                onChange={handleChangeFormData}
                max="100"
                type="number"
                required
                name="transportScore"
              ></input>
              <label className="review-score-label">Transport</label>
            </p>

            <p>
              <input
                className="review-score-input"
                onChange={handleChangeFormData}
                max="100"
                type="number"
                required
                name="safetyScore"
              ></input>
              <label className="review-score-label">Safety</label>
            </p>
          </section>
          <section id="review-form-upload-file-section">
            <h3>Upload File</h3>
            <input
              className="form-file-upload"
              onChange={changeImage}
              type="file"
              name="image"
              accept=".png, .jpg, .jpeg, .gif"
            />
          </section>
          <section>
            <h3>Review Title</h3>
            <input
              onChange={handleChangeFormData}
              type="text"
              name="title"
              required
            ></input>
          </section>
          <section id="review-form-textarea-section">
            <h3>Your review</h3>
            <textarea
              className="form-textarea"
              onChange={handleChangeFormData}
              rows="20"
              name="review"
              required
            ></textarea>
            <button className="app-button background-orange float-right">
              Confirm
            </button>
            <button
              className="app-button background-red"
              onClick={handleCancelTripReview}
            >
              Cancel
            </button>
          </section>
        </form>
      </article>
    </div>
  );
};
export default ReviewForm;
