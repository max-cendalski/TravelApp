import React from 'react';

export default function EditReview(props) {
  return (
 <div className='container'>
        <div className='row horizontal padding-top3 detailed-view-container'>
          <div className='image-container column-width50'>
            <img className="photo" src={props.trip.mainPhotoUrl} alt={props.trip.cityName}></img>
          </div>
          <form onSubmit={props.handleSubmitEditedForm} className='edit-form column-width50'>
          <div className='column-width50'>
            <div className='label-input-container'>
              <label className='edit-score-label'>City</label>
              <input onChange={props.handleCityNameChange} className='edit-form-text-input float-right' type='text' defaultValue={props.trip.cityName}></input>
            </div>
            <div className='label-input-container'>
              <label className='edit-score-label'>Things to Do</label>
              <input onChange={props.handleThingsTodoScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.thingsTodoScore} required></input>
            </div>
            <div className='label-input-container'>
              <label className='edit-score-label'>Food</label>
              <input onChange={props.handleFoodScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.foodScore} required></input>
            </div>
            <div className='label-input-container'>
              <label className='edit-score-label'>People</label>
              <input onChange={props.handlePeopleScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.peopleScore} required></input>
            </div>
            <div className='label-input-container'>
              <label className='edit-score-label'>Transport</label>
              <input onChange={props.handleTransportScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.transportScore} required></input>
            </div>
            <div className='label-input-container'>
              <label className='edit-score-label'>Safety</label>
              <input onChange={props.handleSafetyScoreChange} className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.safetyScore} required></input>
            </div>
            </div>
            <textarea onChange={props.handleReviewChange} defaultValue={props.trip.review} className='edit-form-textarea' required></textarea>
            <button type="submit" className='confirm-edit-button'>Submit</button>
            <button type="button" onClick={props.handleCancelForm} className='cancel-button'>Cancel</button>
          </form>
        </div>
      </div>
  );
}
