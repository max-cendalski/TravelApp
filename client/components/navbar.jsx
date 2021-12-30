import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: '',
      countries: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchBox: event.target.value,
      countries: []
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
        this.setState({
          searchBox: '',
          countries: result
        });
        console.log('this.state.countries', this.state.countries);
      });
  }

  render() {
    return (
      <div className='container navbar-container'>
        <div className='row'>
          <form onSubmit={this.handleSubmit}>
            <input className="search-box" type="text" value={this.state.searchBox} onChange={this.handleChange} name="searchBox" placeholder="search for a country"/>
            <button>Submit</button>
            <img src="../../server/public/images/Japan1.jpg"></img>
            <ul>
            {this.state.countries.map(item => <li key={item.tripId}><img src={item.mainPhotoUrl}></img></li>)}
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
