import React from 'react';

export default class Navbar extends React.Component {

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
