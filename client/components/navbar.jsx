import React, { useContext, useState, useEffect } from "react";
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
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [locNotFoundMsg, setLocNotFoundMsg] = useState("hidden");
  const [searchListContainer, setSearchListContainer] = useState("hidden");
  const navbarContextData = useContext(AppDataContext);

  const handleChange = (e) => {
    e.preventDefault();
    setLocNotFoundMsg("hidden");
    setSearchListContainer("hidden");
    var chars = e.target.value;
    console.log("chars", chars);
    setSearchBox(chars);
    if (chars == "") {
      setSearchListContainer("hidden");
      setSearchedLocations([]);
    } else {
      var searchedCountries = [];
      navbarContextData.locations.forEach((item) => {
        if (item.country.includes(searchBox)) {
          searchedCountries.push(item);
        }
      });
      if (searchedCountries.length) {
        setSearchListContainer("search-result-list");
        setSearchedLocations(searchedCountries);
      } else {
        console.log('searchbox',searchBox)
        console.log('searchcountries',searchedCountries)
        setSearchListContainer("hidden");
        setSearchedLocations(searchedCountries);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = searchBox.split(",")[0];
    if (!searchedLocations.some((location) => location.country === country)) {
      setLocNotFoundMsg("location-not-found-msg");
      setTimeout(() => {
        setLocNotFoundMsg("hidden");
      }, 1500);
    } else {
      setSearchBox("");
      setSearchedLocations("");
      setSearchListContainer("hidden");
      window.location.hash = `#search-results?country=${country.trim()}`;
    }
  };

  const handleSearchListClick = (e) => {
    setSearchBox(
      `${e.target.getAttribute("data-country")},${e.target.getAttribute(
        "data-city"
      )}`
    );
    setSearchedLocations([]);
    window.location.hash = `#search-results?country=${e.target.getAttribute(
      "data-country"
    )}`;
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
          <ul id={searchListContainer}>
            {searchedLocations &&
              searchedLocations.map((location) => {
                return (
                  <li
                    onClick={handleSearchListClick}
                    className="search-result-list-item"
                    data-country={location.country}
                    data-city={location.city}
                    key={location.tripId}
                    name={searchBox}
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
      <article className={locNotFoundMsg}>
        <h1>Nothing Found</h1>
      </article>
    </article>
  );
};

export default Navbar;
