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
import Reviews from './pages/reviews';
import EditReview from './components/edit-review.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: false,
      route: parseRoute(window.location.hash),
      logoutInfo: 'hidden'
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleLogoutWindow = this.handleLogoutWindow.bind(this);
    this.handleConfirmLogout = this.handleConfirmLogout.bind(this);
    this.handleCancelLogout = this.handleCancelLogout.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('TravelApp-token');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: true });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('TravelApp-token', token);
    this.setState({ user });
  }

  handleLogoutWindow() {
    this.setState({
      logoutInfo: 'logout-info'
    });
  }

  handleConfirmLogout() {
    window.localStorage.removeItem('TravelApp-token');
    window.location.hash = '';
    this.setState({
      user: null,
      isAuthorizing: false,
      logoutInfo: 'hidden'
    });
  }

  handleCancelLogout() {
    this.setState({
      logoutInfo: 'hidden'
    });
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
    } if (route.path === 'my-reviews') {
      return <Reviews />;
    } if (route.path === 'edit/my-reviews') {
      return <EditReview />;
    }
    return <NotFound />;
  }

  render() {
    const { user, route, isAuthorizing, logoutInfo } = this.state;
    const { handleSignIn, handleLogoutWindow, handleConfirmLogout, handleCancelLogout } = this;
    const contextValue = { user, route, handleLogoutWindow, handleSignIn, isAuthorizing, logoutInfo, handleConfirmLogout, handleCancelLogout };
    return (
      <AppContext.Provider value = {contextValue}>
        {this.renderPage()}
      </AppContext.Provider>
    );
  }
}
