import React from 'react';
import SignUpForm from './components/signUpForm';
import SignInForm from './components/signInForm';

export default class App extends React.Component {
  render() {
    return (
      <div>
      <SignUpForm />
      <SignInForm />
      </div>
    );
  }
}
