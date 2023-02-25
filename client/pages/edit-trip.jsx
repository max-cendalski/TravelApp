import React, { useState, useEffect } from "react";

const EditTrip = (props) => {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("TravelApp-token");
    fetch(`/api/trips/${props.tripId}`, {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((trip) => setTrip(trip))
      .catch((error) => console.error("Error", error));
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("TravelApp-token");
    const tripId = Number(props.tripId);

    fetch(`/api/edit/trip/${props.tripId}`, {
      method: "PATCH",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip),
    })
      .then((response) => response.json())
      .then((result) => {
        result.country = trip.country;
        result.username = trip.username;
        setTrip(result);
        window.location.hash = `#trips?tripId=${props.tripId}`;
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTrip((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
