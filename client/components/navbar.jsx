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
      signInForm: false,
      searchResults: '',
      searchArray: []
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
    this.handleMyReviewsButton = this.handleMyReviewsButton.bind(this);
    this.handleSearchListClick = this.handleSearchListClick.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const letter = event.target.value;
    this.setState({
      searchBox: letter
    });
    const locationsArray = [];
    if (letter === '') {
      this.setState({
        searchArray: []
      });
    } else {
      this.context.locations.forEach(location => {
        if (location.country.includes(letter.toLowerCase()) || location.city.includes(letter.toLowerCase)) {
          locationsArray.push(location);
          const filteredLocations = locationsArray.filter((location, index, array) =>
            index === array.findIndex(item => (
              item.country === location.country && item.city === location.city
            ))
          );
          this.setState({
            searchArray: filteredLocations
          });
        }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const country = this.state.searchBox.split(',')[0];
    window.location.hash = `#search-results?country=${country}`;
    this.setState({
      searchBox: '',
      searchArray: ''
    });
  }

  handleSearchListClick(event) {
    this.setState({
      searchBox: `${event.target.getAttribute('data-country')},${event.target.getAttribute('data-city')}`,
      searchArray: []
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

  handleMyReviewsButton() {
    window.location.hash = 'my-reviews';
  }

  render() {
    return (
      <article className='navbar-container row' onMouseLeave={this.handleOnMouseLeave}>
        <section className='navbar-search-box-container'>
          <form onSubmit={this.handleSubmit}>
            <input type="search" value={this.state.searchBox} onChange={this.handleChange} autoComplete="off" name="searchBox" placeholder="search for a country" required/>
            <button className='submit-search-button'>Submit</button>
          </form>
          <section>
            <ul id="search-result-list">
              {
                this.state.searchArray && this.state.searchArray.map((location, index) => {
                  return <li onClick={this.handleSearchListClick} className="search-result-list-item" data-country={location.country} data-city={location.city} key={index}>{location.country}, {location.city}</li>;
                })
              }
            </ul>
          </section>
        </section>

        <section className='navbar-travel-app-home'>
          <h1><a href="#">TravelApp</a></h1>
        </section>
          <section className={this.state.visible}>
          <h1><a href="#">TA</a></h1>
        </section>

        <section className="navbar-login-icon-section" onMouseEnter={this.handleOnMouseEnter}>

          {
                this.context.user && <p className='navbar-name-paragraph'>Hello, {this.context.user.username}</p>
              }

          <i className="fas fa-user icon-class" />

        </section>

            <section className={this.state.visible}>
              <ul className='drop-down-list'>
              {
                !this.context.user && <li className="sign-up-button" onClick={this.handleSignUp}>Sign Up</li>
              }
              {
                !this.context.user && <li className='sign-in-button' onClick={this.handleSignInButton}>Sign In</li>
              }
              {
                this.context.user && <li className='my-reviews-link' onClick={this.handleMyReviewsButton}>My Reviews</li>
              }
              {
                this.context.user && <li className='write-review-button'><a className="write-review-link" href="#review-form">Write Review</a></li>
              }
              {
                this.context.user && <li className='logoutButton' onClick={this.context.handleLogoutWindow}>Logout</li>
              }
              </ul>
            </section>

          <article className={this.state.modal}>
          {
            this.state.signUpForm &&
            <section className='row padding-top20vh'>
              <SignUpForm handleSwitchingModal={this.handleSwitchingModal}
                          handleIsAuthorizing={this.handleIsAuthorizing}/>
            </section>
          }
          {
            this.state.signInForm &&
            <section className='row padding-top20vh'>
              <SignInForm handleSwitchingModal={this.handleSwitchingModal}
                          handleIsAuthorizing={this.handleIsAuthorizing}/>
            </section>
          }
          </article>
          <article className={this.context.logoutInfo}>
            <h2>Are you sure you want to logout?</h2>
            <button onClick={this.context.handleConfirmLogout} className='app-button background-orange float-right'>Confirm</button>
            <button onClick={this.context.handleCancelLogout} className='app-button background-red'>Cancel</button>
          </article>
      </article>
    );
  }
}

Navbar.contextType = AppContext;
