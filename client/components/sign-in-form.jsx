import React from "react";
import AppContext from "../lib/app-context";
import { useState, useContext } from "react";
import { AppDataContext } from "./context";

const SignInForm = (props) => {
  const SingInContextData = useContext(AppDataContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [errroMsg, setErrorMsg] = useState("invisible");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log('props:',props)
    const user = { username: userInfo.username, password: userInfo.password };

    fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          setErrorMsg("row");
        } else {
          SingInContextData.handleSignIn(result);
          window.location.hash = "";
          props.handleSwitchingModal();
        }
      })
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  return (
    <article>
      <section className={errroMsg}>
        <h1 className="username-exists-msg">Incorrect username or password!</h1>
      </section>
      <form className="sign-form" onSubmit={handleSubmit} name="signInForm">
        <p>
          <label className="form-label"> Sign In </label>
          <input
            required
            className="username-input input-form"
            type="text"
            value={userInfo.username}
            onChange={handleChange}
            name="username"
            placeholder="username"
          />
        </p>
        <p>
          <input
            required
            className="password-input input-form"
            type="password"
            value={userInfo.password}
            onChange={handleChange}
            name="password"
            placeholder="password"
          />
        </p>
        <button className="app-button background-orange float-right">
          Confirm
        </button>
        <button
          className="app-button background-red"
          onClick={props.handleSwitchingModal}
        >
          Cancel
        </button>
      </form>
    </article>
  );
};

export default SignInForm;
/*
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
 */
