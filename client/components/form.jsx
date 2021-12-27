import React from 'react';

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

  }

  render() {
    return (
      <div className='form-component-container'>
        <div className='row centered'>
          <form className="form-container" onSubmit={this.handleSubmit}>
          <label className="form-label"> Sign Up </label>
            <input required className="username-input" type="text" value ={this.state.password} onChange={this.handlePasswordChange} placeholder="username"/>
            <input required className="password-input" type="password" value={this.state.email} onChange={this.handleUsernameChange} placeholder="password" />
            <button className='sign-up-button'>Confirm</button>
          </form>
        </div>
      </div>
    );
  }
}
