import React from 'react';
import AppContext from '../lib/app-context';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(result => {
        this.context.handleSignIn(result);
        window.location.hash = '';
        this.props.handleSwitchingModal();
      });
  }

  render() {
    return (
      <div className='relative'>
        <div className='form-component-container'>
          <div className='row centered'>
            <form onSubmit={this.handleSubmit} name="signInForm">
            <label className="form-label">Sign in </label>
              <input required className="username-input input-form" type="text" value={this.state.username} onChange={this.handleUsernameChange} name="username" placeholder="username"/>
              <input required className="password-input input-form" type="password" value={this.state.password} onChange={this.handlePasswordChange} name="password" placeholder="password" />
              <button className='cancel-button' onClick={this.props.handleSwitchingModal}>Cancel</button>
              <button className='confirm-edit-button'>Confirm</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignInForm.contextType = AppContext;
