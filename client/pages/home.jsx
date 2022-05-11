import React from 'react';
import Navbar from '../components/navbar';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    fetch('/api/images', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          images: result
        });
      })
      .catch(error => error(console.error('Error', error)));
  }

  render() {
    if (!this.state.images) return null;
    return (
      <article className='container'>
        <Navbar />
          <section className='row'>
            <img className="photo" src='images/Tahiti1.jpg' />
          </section>
      </article>
    );
  }
}
