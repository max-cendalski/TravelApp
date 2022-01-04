import React from 'react';
import Navbar from '../components/navbar';

export default class Home extends React.Component {

  render() {
    return (
      <div className='container'>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <img className="photo" src='images/Tahiti1.jpg'></img>
          </div>
        </div>
        <div className='list-flex'></div>
      </div>
    );
  }
}
