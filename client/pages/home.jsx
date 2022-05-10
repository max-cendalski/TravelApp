import React from 'react';
import Navbar from '../components/navbar';

export default class Home extends React.Component {

  render() {
    return (
      <article className='container'>
        <Navbar />
          <section className='row'>
            <img className="photo" src='images/Tahiti1.jpg' />
          </section>
        <section className='list-flex'></section>
      </article>
    );
  }
}
