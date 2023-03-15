import React, { useState, useEffect } from 'react';
import decodeToken from './lib/decode-token.js';
import parseRoute from './lib/parse-route.jsx';
import SearchResults from './pages/search-results.jsx';
import Home from './pages/home';
import SignInForm from './components/sign-in-form';
import SignUpForm from './components/sign-up-form';
import NotFound from './pages/not-found.jsx';
import TripDetails from './pages/trip-details.jsx';
import ReviewForm from './pages/review-form.jsx';
import Reviews from './pages/reviews';
import EditTrip from './pages/edit-trip';
import { AppDataContext } from './components/context';

import { GoogleApiWrapper } from 'google-maps-react';

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [route, setRoute] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('api/locations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response =>
      response.json().then(locations => {
        setLocations(locations);
      })
    );
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      setRoute(newRoute);
    });
    const token = window.localStorage.getItem('TravelApp-token');
    const user = token ? decodeToken(token) : null;
    setUser(user);
    setIsAuthorize(true);
    setRoute(parseRoute(window.location.hash));
  }, [route.path]);

  const handleSignIn = result => {
    const { user, token } = result;
    window.localStorage.setItem('TravelApp-token', token);
    setUser(user);
    window.location.reload();
  };

  const handleConfirmLogout = e => {
    e.preventDefault();
    window.localStorage.removeItem('TravelApp-token');
    setUser(null);
    setIsAuthorize(false);
    window.location.hash = '#';
  };

  const renderPage = () => {
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'search-results') {
      const country = route.params.get('country');
      return <SearchResults country={country} />;
    }
    if (route.path === 'trips') {
      const tripId = Number(route.params.get('tripId'));
      return <TripDetails tripId={tripId} />;
    }
    if (route.path === 'sign-in') {
      return <SignInForm />;
    }
    if (route.path === 'sign-up') {
      return <SignUpForm />;
    }
    if (route.path === 'review-form') {
      return <ReviewForm />;
    }
    if (route.path === 'my-reviews') {
      return <Reviews />;
    }
    if (route.path === 'edit/trip') {
      const tripId = Number(route.params.get('tripId'));
      return <EditTrip tripId={tripId} />;
    }
    return <NotFound />;
  };

  const contextData = {
    locations,
    user,
    route,
    handleSignIn,
    isAuthorize,
    handleConfirmLogout
  };

  return (
    <AppDataContext.Provider value={contextData}>
      {renderPage()}
    </AppDataContext.Provider>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY
})(App);
