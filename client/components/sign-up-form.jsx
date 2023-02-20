import React from "react";
import { useState, useContext } from "react";
import { AppDataContext } from "./context";

const SignUpForm = (props) => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const [userExiststMsg, setUserExistsMsg] = useState("invisible");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: newUser.username.toLowerCase(),
      password: newUser.password
    };
    console.log('userv',user)
     fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          setUserExistsMsg("row");
        } else {
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
      <section className={userExiststMsg}>
        <h1 className="username-exists-msg">
          User with that username already exists!
        </h1>
      </section>
      <form className="sign-form" onSubmit={handleSubmit} name="signUpForm">
        <p>
          <label className="form-label"> Sign up </label>
          <input
            required
            className="username-input input-form"
            type="text"
            value={newUser.username}
            onChange={handleChange}
            name="username"
            placeholder="username"
            minLength="3"
          />
        </p>
        <p className="password-notification">
          username must me be at least 3 characters long
        </p>
        <p>
          <input
            required
            className="password-input input-form"
            type="password"
            value={newUser.password}
            onChange={handleChange}
            name="password"
            placeholder="password"
            minLength="6"
          />
        </p>
        <p className="password-notification">
          password must be at least 6 characters long
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


export default SignUpForm;
/* export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userExiststMsg: "invisible",
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value.toLowerCase(),
      userExiststMsg: "invisible",
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          this.setState({
            userExiststMsg: "row",
          });
        } else {
          window.location.hash = "";
          this.props.handleSwitchingModal();
        }
      })
      .catch((error) => {
        console.error("Error", error.message);
      });
  }

  render() {
    return (
      <article>
        <section className={this.state.userExiststMsg}>
          <h1 className="username-exists-msg">
            User with that username already exists!
          </h1>
        </section>
        <form
          className="sign-form"
          onSubmit={this.handleSubmit}
          name="signUpForm"
        >
          <p>
            <label className="form-label"> Sign up </label>
            <input
              required
              className="username-input input-form"
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              name="username"
              placeholder="username"
              minLength="3"
            />
          </p>
          <p className="password-notification">
            username must me be at least 3 characters long
          </p>
          <p>
            <input
              required
              className="password-input input-form"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              name="password"
              placeholder="password"
              minLength="6"
            />
          </p>
          <p className="password-notification">
            password must be at least 6 characters long
          </p>
          <button className="app-button background-orange float-right">
            Confirm
          </button>
          <button
            className="app-button background-red"
            onClick={this.props.handleSwitchingModal}
          >
            Cancel
          </button>
        </form>
      </article>
    );
  }
}
 */
