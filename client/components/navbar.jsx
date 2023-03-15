import React, { useContext, useState } from "react";
import SignUpForm from "../components/sign-up-form";
import SignInForm from "../components/sign-in-form";
import { AppDataContext } from "../components/context";

const Navbar = () => {
  const [searchBox, setSearchBox] = useState("");
  const [visible, setVisible] = useState("hidden");
  const [logoutInfo, setLogoutInfo] = useState("hidden");
  const [modal, setModal] = useState("hidden");
  const [signUpForm, setSignUpForm] = useState(false);
  const [signInForm, setSignInForm] = useState(false);
  const [searchArray, setSearchArray] = useState([]);

  //const [searchResultList, setSearchResultList] = useState("search-result-list-item-focus");

  const navbarContextData = useContext(AppDataContext);

  const handleChange = (e) => {
    e.preventDefault();
    console.log('loc',navbarContextData.locations)
    const letter = event.target.value;
    setSearchBox(letter);
    const locationsArray = [];
    if (letter === "") {
      setSearchArray([]);
    } else {
      navbarContextData.locations.forEach((location) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = searchBox.split(",")[0];
    setSearchBox("");
    setSearchArray("");
    window.location.hash = `#search-results?country=${country}`;
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

  const handleSwitchModal = () => {
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

  const handleMyReviewsButton = () => {
    setVisible("hidden");
    window.location.hash = "my-reviews";
  };

  const handleLoginIconClick = () => {
    setVisible("drop-down-container");
  };

  const handleLogoutWindow = () => {
    setVisible("hidden");
    setLogoutInfo("logout-info");
  };

  const handleCancelLogout = () => {
    setLogoutInfo("hidden");
  };
  const handleArrowKeys = (e) => {
    console.log("e.key", e.key);
    //ArrowUp, ArrowDown
    console.log('searc',searchArray)
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
            onKeyDown={handleArrowKeys}
            required
          />
          <button className="submit-search-button">Submit</button>
        </form>
        <section>
          <ul id="search-result-list">
            {searchArray &&
              searchArray.map((location) => {
                return (
                  <li
                    onClick={handleSearchListClick}
                    key={location.tripId}
                    className={`location.country !== 'poland' ? search-result-list-item-focus : 'hidden'`}
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
        onClick={handleLoginIconClick}
      >
        {navbarContextData.user && (
          <p className="navbar-name-paragraph">
            Hello, {navbarContextData.user.username}
          </p>
        )}
        <i className="fas fa-user icon-class" />
      </section>

      <section className={visible}>
        <ul className="drop-down-list">
          {!navbarContextData.user && (
            <li className="sign-up-button" onClick={handleSignUp}>
              Sign Up
            </li>
          )}
          {!navbarContextData.user && (
            <li className="sign-in-button" onClick={handleSignInButton}>
              Sign In
            </li>
          )}
          {navbarContextData.user && (
            <li className="my-reviews-link" onClick={handleMyReviewsButton}>
              My Reviews
            </li>
          )}
          {navbarContextData.user && (
            <li className="write-review-button">
              <a className="write-review-link" href="#review-form">
                Write Review
              </a>
            </li>
          )}
          {navbarContextData.user && (
            <li className="logoutButton" onClick={handleLogoutWindow}>
              Logout
            </li>
          )}
        </ul>
      </section>

      <article className={modal}>
        {signUpForm && (
          <section className="row">
            <SignUpForm
              handleSwitchingModal={handleSwitchModal}
              handleIsAuthorizing={navbarContextData.handleIsAuthorizing}
            />
          </section>
        )}
        {signInForm && (
          <section className="row">
            <SignInForm
              handleSwitchingModal={handleSwitchModal}
              handleIsAuthorizing={navbarContextData.handleIsAuthorizing}
            />
          </section>
        )}
      </article>
      <article className={logoutInfo}>
        <h2>Are you sure you want to logout?</h2>
        <button
          onClick={navbarContextData.handleConfirmLogout}
          className="app-button background-orange float-right"
        >
          Confirm
        </button>
        <button
          onClick={handleCancelLogout}
          className="app-button background-red"
        >
          Cancel
        </button>
      </article>
    </article>
  );
};

export default Navbar;
