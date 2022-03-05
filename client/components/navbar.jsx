import React from 'react';
import SignUpForm from '../components/sign-up-form';
import SignInForm from '../components/sign-in-form';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      searchBox: '',
      visible: 'hidden',
      modal: 'hidden',
      signUpForm: false,
      signInForm: false
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLoginIcon = this.handleLoginIcon.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    this.handleSwitchingModal = this.handleSwitchingModal.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.handleSignInButton = this.handleSignInButton.bind(this);
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

  handleSwitchingModal() {
    this.setState({
      modal: 'hidden',
      signUpForm: false,
      signInForm: false,
      visible: 'hidden'
    });
  }

  handleSignUp() {
    this.setState({
      modal: 'modal-visible',
      signUpForm: !this.state.signUpForm
    });
  }

  handleSignInButton() {
    this.setState({
      modal: 'modal-visible',
      signInForm: !this.state.signInForm
    });
  }

  handleLoginIcon() {
    this.setState({
      visible: !this.state.visible,
      list: 'drop-down-container'
    });
  }

  handleModalClick() {
    this.setState({
      modal: 'hidden'
    });
  }

  render() {
    return (
      <div className='navbar-container row' onMouseLeave={this.handleOnMouseLeave}>
        <div className='search-box-container'>
          <form onSubmit={this.handleSubmit}>
            <input className="search-box" type="search" value={this.state.searchBox} onChange={this.handleChange} name="searchBox" placeholder="search for a country" required/>
            <button className='submit-search-button'>Submit</button>
          </form>
        </div>
        <div className='travel-app-home'>
          <h1><a href="#">TravelApp</a></h1>
        </div>
        <div className='login-icon' onMouseEnter={this.handleOnMouseEnter}>
        {
          this.context.user && <p className='name-paragraph'>Hello, {this.context.user.username}</p>
        }
          <i className="fas fa-user user-icon"></i>
            <div className={this.state.visible}>
              <ul className='drop-down-list'>
              {
                !this.context.user && <li className="sign-up-button" onClick={this.handleSignUp}>Sign Up</li>
              }
              {
                !this.context.user && <li className='sign-in-button' onClick={this.handleSignInButton}>Sign In</li>
              }
              {
                this.context.user && <li>My Reviews</li>
              }
              {
                this.context.user && <li className='write-review-button'><a className="write-review-link" href="#review-form">Write Review</a></li>
              }
              {
                this.context.user && <li className='logoutButton' onClick={this.context.handleLogoutWindow}>Logout</li>
              }
              </ul>
            </div>
          </div>
          <div className={this.state.modal}>
          {
            this.state.signUpForm &&
            <div className='row padding-top20vh'>
              <SignUpForm handleSwitchingModal={this.handleSwitchingModal}
                          handleIsAuthorizing={this.handleIsAuthorizing}/>
            </div>
          }
          {
            this.state.signInForm &&
            <div className='row padding-top20vh'>
              <SignInForm handleSwitchingModal={this.handleSwitchingModal}
                          handleIsAuthorizing={this.handleIsAuthorizing}/>
            </div>
          }
          </div>
          <div className={this.context.logoutInfo}>
            <h2>Are you sure you want to logout?</h2>
            <button onClick={this.context.handleConfirmLogout} className='button-confirm-logout'>Confirm</button>
            <button onClick={this.context.handleCancelLogout} className='button-cancel-logout'>Cancel</button>
          </div>
      </div>
    );
  }
}

Navbar.contextType = AppContext;
