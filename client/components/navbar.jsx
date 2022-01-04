import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {

  componentDidMount() {
    fetch(`/api/countries/${this.props.country}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          searchBox: '',
          countries: result
        });
      });
  }

  render() {
    return (
      <div className='navbar-container'>
        <div className='search-box-container'>
          <form onSubmit={this.props.handleSubmit}>
            <input className="search-box" type="text" value={this.props.searchBox} onChange={this.props.handleChange} name="searchBox" placeholder="search for a country"/>
            <button>Submit</button>
          </form>
        </div>
        <div className='login-icon'>
          <i className="fas fa-user"></i>
        </div>
      </div>
    );
  }
}

Navbar.contextType = AppContext;
