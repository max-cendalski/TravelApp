import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      searchBox: ''
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchBox: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = `#search-results?country=${this.state.searchBox}`;
    this.setState({
      searchBox: ''
    });
  }

  render() {
    return (
      <div className='navbar-container'>
        <div className='search-box-container'>
          <form onSubmit={this.handleSubmit}>
            <input className="search-box" type="text" value={this.state.searchBox} onChange={this.handleChange} name="searchBox" placeholder="search for a country"/>
            <button>Submit</button>
          </form>
        </div>
        <div className='login-icon'>
          <i className="fas fa-user"></i>
        </div>
        <div className='drop-down-container'>
          <ul className='drop-down-list'>
            <li>Sign Up</li>
            <li>Sign In</li>
          </ul>
        </div>
      </div>
    );
  }
}
