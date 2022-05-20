import React from 'react';
import AppContext from '../lib/app-context';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errroMsg: 'invisible'
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
        if (result.error) {
          this.setState({
            errroMsg: 'row'
          });
        } else {
          this.context.handleSignIn(result);
          window.location.hash = '';
          this.props.handleSwitchingModal();
        }
      })
      .catch(error => {
        console.error('Error', error.message);
      });
  }

  render() {
    return (
          <article>
          <section className={this.state.errroMsg}>
              <h1 className='username-exists-msg'>Incorrect username or password!</h1>
            </section>
            <form className='sign-form' onSubmit={this.handleSubmit} name="signInForm">
            <p>
              <label className="form-label"> Sign In </label>
              <input required className="username-input input-form" type="text" value={this.state.username} onChange={this.handleUsernameChange} name="username" placeholder="username"/>
            </p>
            <p>
              <input required className="password-input input-form" type="password" value={this.state.password} onChange={this.handlePasswordChange} name="password" placeholder="password" />
            </p>
            <button className='app-button background-orange float-right'>Confirm</button>
            <button className='app-button background-red' onClick={this.props.handleSwitchingModal}>Cancel</button>
          </form>
          </article>
    );
  }
}

SignInForm.contextType = AppContext;
