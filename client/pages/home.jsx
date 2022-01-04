import React from 'react';
import Navbar from '../components/navbar';

export default class Home extends React.Component {

  render() {
    return (
      <div className='container'>
        <Navbar />
        <div className='list-flex'></div>
      </div>
    );
  }
}
