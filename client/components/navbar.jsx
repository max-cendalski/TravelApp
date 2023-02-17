import React from "react";
import SignUpForm from "../components/sign-up-form";
import SignInForm from "../components/sign-in-form";
import { useContext,useState, useEffect } from "react";
import AppContext from "../lib/app-context";



const Navbar = () => {
  const [searchBox, setSearchBox] = useState("");
  const [visible, setVisible] = useState("hidden");
  const [modal, setModal] = useState("hidden");
  const [signUpForm, setSignUpForm] = useState(false);
  const [signInForm, setSignInForm] = useState(false);
  const [searchArray, setSearchArray] = useState([]);

   const logout = useContext(AppDataContext)


  const handleChange = (event) => {
    event.preventDefault();
    const letter = event.target.value;
    setSearchBox(letter);
    const locationsArray = [];
    if (letter === "") {
      setSearchArray([]);
    } else {
      AppContext.locations.forEach((location) => {
        if (
          location.country.includes(letter.toLowerCase()) ||
          location.city.includes(letter.toLowerCase)
        ) {
          locationsArray.push(location);
          const filteredLocations = locationsArray.filter(
            (location, index, array) =>
              index ===
              array.findIndex(
                (item) =>
                  item.country === location.country &&
                  item.city === location.city
              )
          );
          setSearchArray(filteredLocations);
        }
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const country = searchBox.split(",")[0];
    window.location.hash = `#search-results?country=${country}`;
    setSearchBox("");
    setSearchArray("");
  };
  const handleSearchListClick = (event) => {
    setSearchBox(
      `${event.target.getAttribute("data-country")},${event.target.getAttribute(
        "data-city"
      )}`
    );
    setSearchArray([]);
  };

  const handleOnMouseEnter = () => {
    setVisible("drop-down-container");
  };

  const handleOnMouseLeave = () => {
    setVisible("hidden");
  };

  const handleSwitchingModal = () => {
    setModal("hidden");
    setSignUpForm(false);
    setSignInForm(false);
    setVisible("hidden");
  };

  const handleSignUp = () => {
    setModal("modal-visible");
    setSignUpForm(!signUpForm);
  };

  const handleSignInButton = () => {
    setModal("modal-visible");
    setSignInForm(!signInForm);
  };

  // THIS NEEDS TO BE FIXED
  const handleLoginIcon = () => {
    setVisible(!visible);
    //list: 'drop-down-container'
  };

  const handleModalClick = () => {
    setModal("hidden");
  };

  const handleMyReviewsButton = () => {
    window.location.hash = "my-reviews";
  };



  return (
    <article className="navbar-container row" onMouseLeave={handleOnMouseLeave}>
      <section className="navbar-search-box-container">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            value={searchBox}
            onChange={handleChange}
            autoComplete="off"
            name="searchBox"
            placeholder="search for a country"
            required
          />
          <button className="submit-search-button">Submit</button>
        </form>
        <section>
          <ul id="search-result-list">
            {searchArray &&
              searchArray.map((location, index) => {
                return (
                  <li
                    onClick={handleSearchListClick}
                    className="search-result-list-item"
                    data-country={location.country}
                    data-city={location.city}
                    key={index}
                  >
                    {location.country}, {location.city}
                  </li>
                );
              })}
          </ul>
        </section>
      </section>

      <section className="navbar-app-home">
        <h1>
          <a href="#">TravelApp</a>
        </h1>
      </section>
      <section className="navbar-app-mobile">
        <h1>
          <a href="#">
            <p>Travel</p>
            <p>App</p>
          </a>
        </h1>
      </section>

      <section
        className="navbar-login-icon-section"
        onMouseEnter={handleOnMouseEnter}
      >
        {AppContext.user && (
          <p className="navbar-name-paragraph">
            Hello, {AppContext.user.username}
          </p>
        )}
        <i className="fas fa-user icon-class" />
      </section>

      <section className={visible}>
        <ul className="drop-down-list">
          {!AppContext.user && (
            <li className="sign-up-button" onClick={handleSignUp}>
              Sign Up
            </li>
          )}
          {!AppContext.user && (
            <li className="sign-in-button" onClick={handleSignInButton}>
              Sign In
            </li>
          )}
          {AppContext.user && (
            <li className="my-reviews-link" onClick={handleMyReviewsButton}>
              My Reviews
            </li>
          )}
          {AppContext.user && (
            <li className="write-review-button">
              <a className="write-review-link" href="#review-form">
                Write Review
              </a>
            </li>
          )}
          {AppContext.user && (
            <li
              className="logoutButton"
              onClick={AppContext.handleLogoutWindow}
            >
              Logout
            </li>
          )}
        </ul>
      </section>

      <article className={modal}>
        {signUpForm && (
          <section className="row">
            <SignUpForm
              handleSwitchingModal={handleSwitchingModal}
              handleIsAuthorizing={AppContext.handleIsAuthorizing}
            />
          </section>
        )}
        {signInForm && (
          <section className="row">
            <SignInForm
              handleSwitchingModal={handleSwitchingModal}
              handleIsAuthorizing={AppContext.handleIsAuthorizing}
            />
          </section>
        )}
      </article>
      <article className={AppContext.logoutInfo}>
        <h2>Are you sure you want to logout?</h2>
        <button
          onClick={AppContext.handleConfirmLogout}
          className="app-button background-orange float-right"
        >
          Confirm
        </button>
        <button
          onClick={AppContext.handleCancelLogout}
          className="app-button background-red"
        >
          Cancel
        </button>
      </article>
    </article>
  );
};



//Navbar.contextType = AppContext;

export default Navbar;

/* export default class Navbar extends React.Component {
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
???
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

        <section className='navbar-app-home'>
          <h1><a href="#">TravelApp</a></h1>
        </section>
             <section className='navbar-app-mobile'>
          <h1><a href="#"><p>Travel</p><p>App</p></a></h1>
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
          <section className='row'>
            <SignUpForm handleSwitchingModal={this.handleSwitchingModal}
                        handleIsAuthorizing={this.handleIsAuthorizing}/>
          </section>
        }
        {
          this.state.signInForm &&
          <section className='row'>
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
} */
