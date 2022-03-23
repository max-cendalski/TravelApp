import React from 'react';

export default function EditReview(props) {
  return (
 <div className='container'>
        <div className='row horizontal padding-top3 detailed-view-container'>
          <div className='image-container column-width50'>
            <img className="photo" src={props.trip.mainPhotoUrl} alt={props.trip.cityName}></img>
          </div>

          <form onChange={props.handleSubmitEditForm}className='edit-form column-width50'>
          <div className='column-width50'>
              <div className='label-input-container'>
              <label className='edit-score-label'>Country</label>
              <input className='edit-form-text-input float-right' defaultValue={props.trip.countryName} type='text'></input>
          </div>

              <div className='label-input-container'>
              <label className='edit-score-label'>City</label>
              <input className='edit-form-text-input float-right' type='text' defaultValue={props.trip.cityName}></input>
              </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>Things to Do</label>
              <input className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.thingsTodoScore}></input>
              </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>Food</label>
              <input className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.foodScore}></input>
              </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>People</label>
              <input className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.peopleScore}></input>
              </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>Transport</label>
              <input className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.transportScore}></input>
              </div>
              <div className='label-input-container'>

              <label className='edit-score-label'>Safety</label>
              <input className='edit-form-text-input float-right' type="number" max="100" defaultValue={props.trip.safetyScore}></input>
              </div>

              </div>
              <textarea defaultValue={props.trip.review} className='edit-form-textarea'></textarea>
            <button className='edit-form-submit-button'>Submit</button>
          </form>

        </div>
        </div>

  );
}
