import React from 'react';

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
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };

    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          username: '',
          password: ''
        });
      });
  }

  render() {
    return (
      <div className='form-component-container'>
        <div className='row centered'>
          <form className="form-container" onSubmit={this.handleSubmit}>
          <label className="form-label"> Sign in </label>
            <input required className="username-input" type="text" value ={this.state.username} onChange={this.handleUsernameChange} name="username" placeholder="username"/>
            <input required className="password-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} name="password" placeholder="password" />
            <button className='sign-up-button'>Confirm</button>
          </form>
        </div>
      </div>
    );
  }
}
