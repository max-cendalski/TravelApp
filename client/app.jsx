import React from 'react';
import decodeToken from './lib/decode-token.js';
import SignUpForm from './components/signUpForm';
import SignInForm from './components/signInForm';

const myToken = React.createContext();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('TravelApp-token');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('TravelApp-token', token);
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { handleSignIn } = this;
    const contextValue = { user, handleSignIn };
    return (
      <myToken.Provider value = {contextValue}>
          <SignUpForm />,
          <SignInForm />
      </myToken.Provider>
    );
  }
}
