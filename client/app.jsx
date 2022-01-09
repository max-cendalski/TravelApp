import React from 'react';
import decodeToken from './lib/decode-token.js';
import parseRoute from './lib/parse-route.jsx';
import SearchResults from './pages/search-results.jsx';
import Home from './pages/home';
import AppContext from './lib/app-context.js';
import SignInForm from './components/sign-in-form';
import SignUpForm from './components/sign-up-form';
import NotFound from './pages/not-found.jsx';
import TripDetails from './pages/trip-details.jsx';
import ReviewForm from './pages/review-form.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('TravelApp-token');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('TravelApp-token', token);
    this.setState({ user });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'search-results') {
      const country = route.params.get('country');
      return <SearchResults country={country}/>;
    }
    if (route.path === 'trips') {
      const tripId = route.params.get('tripId');
      return <TripDetails tripId={tripId} />;
    }
    if (route.path === 'sign-in') {
      return <SignInForm />;
    } if (route.path === 'sign-up') {
      return <SignUpForm />;
    } if (route.path === 'review-form') {
      return <ReviewForm />;
    }
    return <NotFound />;
  }

  render() {
    const { user, route, isAuthorizing } = this.state;
    const { handleSignIn, handleLogout } = this;
    const contextValue = { user, route, handleLogout, handleSignIn, isAuthorizing };
    return (
      <AppContext.Provider value = {contextValue}>
        {this.renderPage()}
      </AppContext.Provider>
    );
  }
}
