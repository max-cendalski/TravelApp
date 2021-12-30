import React from 'react';
import Navbar from '../components/navbar';

export default class Home extends React.Component {
  componentDidMount() {
    console.log('whee');
  }

  render() {
    return (
      <div>
        <Navbar />
        <img src='/images/NZ4.jpg' />
      </div>
    );
  }
}
