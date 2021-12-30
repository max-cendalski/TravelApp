import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: ''
    };
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
    const country = this.state.searchBox;
    fetch(`/api/countries/${country}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        // console.log('result:', result);
        this.setState({
          searchBox: ''
        });
      });
  }

  render() {
    return (
      <div className='container navbar-container'>
        <div className='row'>
          <form onSubmit={this.handleSubmit}>
            <input className="search-box" type="text" value={this.state.searchBox} onChange={this.handleChange} name="searchBox" placeholder="search for a country"/>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
