import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      searchBox: '',
      visible: 'hidden'
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLoginIcon = this.handleLoginIcon.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);

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

  handleOnMouseEnter() {
    this.setState({
      visible: 'drop-down-container'
    });
  }

  handleOnMouseLeave() {
    this.setState({
      visible: 'hidden'
    });
  }

  handleSignUp(event) {

  }

  handleLoginIcon() {
    this.setState({
      visible: !this.state.visible,
      list: 'drop-down-container'
    });
  }

  render() {
    return (
      <div className='navbar-container' onMouseLeave={this.handleOnMouseLeave}>
        <div className='search-box-container'>
          <form onSubmit={this.handleSubmit}>
            <input className="search-box" type="text" value={this.state.searchBox} onChange={this.handleChange} name="searchBox" placeholder="search for a country"/>
            <button>Submit</button>
          </form>
        </div>
        <div className='login-icon' onMouseEnter={this.handleOnMouseEnter}>
          <i className="fas fa-user"></i>
            <div className={this.state.visible}>
              <ul className='drop-down-list'>
                <li onClick={this.handleSignUp}>Sign Up</li>
                <li>Sign In</li>
              </ul>
            </div>
          </div>
      </div>
    );
  }
}

/*
        <div className={this.state.list}>
          {!this.state.darker
            ? <i className="fas fa-bars cursor-pointer" onClick={this.handleClick}></i>
            : <ul>
                <h4>Choose your game</h4>
                <li onClick={this.handleClick}>The Legend Of Zelda</li>
                <li onClick={this.handleClick}>A Link to the Past</li>
                <li onClick={this.handleClick}>Ocarina of Time</li>
                <li onClick={this.handleClick}>The Wind Waker</li>
                <li onClick={this.handleClick}>Breath of the Wild</li>
            </ul>
          }
        </div> */
