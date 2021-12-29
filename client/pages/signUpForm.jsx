import React from 'react';
import AppContext from '../lib/app-context';

export default class SignUpForm extends React.Component {
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
      .then(data => {
        this.setState({
          isLoggedIn: true
        });
      });
  }

  render() {
    return (
      <div className='form-component-container'>
        <div className='row centered'>
          <form className="form-container" onSubmit={this.handleSubmit}>
          <label className="form-label"> Sign up </label>
            <input required className="username-input" type="text" value ={this.state.username} onChange={this.handleUsernameChange} name="username" placeholder="username"/>
            <input required className="password-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} name="password" placeholder="password" />
            <button className='sign-up-button'>Confirm</button>
          </form>
        </div>
      </div>
    );
  }
}

SignUpForm.contextType = AppContext;
