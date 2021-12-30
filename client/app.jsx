import React from 'react';
import decodeToken from './lib/decode-token.js';
import parseRoute from './lib/parse-route.jsx';
import Home from './pages/home';
import AppContext from './lib/app-context.js';
import SignInForm from './pages/signInForm';
import SignUpForm from './pages/signUpForm';
import NotFound from './pages/not-found.jsx';

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
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in') {
      return <SignInForm handleSignIn={this.handleSignIn}/>;
    } if (path === 'sign-up') {
      return <SignUpForm />;
    }
    return <NotFound />;
  }

  render() {
    const { user, route } = this.state;
    const { handleSignIn } = this;
    const contextValue = { user, route, handleSignIn };
    return (
      <AppContext.Provider value = {contextValue}>
        <Home />
        {this.renderPage()}
      </AppContext.Provider>
    );
  }
}
