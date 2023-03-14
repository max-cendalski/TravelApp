import React, { useState } from "react";

const SignUpForm = (props) => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const [userExiststMsg, setUserExistsMsg] = useState("invisible");
  const [incorrectLoginMsg, setIncorrectLoginMsg] = useState("invisible");

  const handleChange = (e) => {
    console.log(newUser.username.length)
    let letters = /^[A-Za-z]+$/;
    function checkLetters(input) {
      if ((input.match(letters)) || (input.length === 0 )) {
        setIncorrectLoginMsg("hidden");
      } else {
        setIncorrectLoginMsg("incorrect-login-msg");
      }
    }
    checkLetters(e.target.value);

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
      username: newUser.username,
      password: newUser.password,
    };
    console.log('user',user)
  /*   fetch("/api/auth/sign-up", {
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
      }); */
  };

  return (
    <article>
      <section className={userExiststMsg}>
        <h1 className="username-exists-msg">
          User with that username already exists!
        </h1>
      </section>
      <section className={incorrectLoginMsg}>
        Username can contains only letters and max two numbers
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
          username must me be at least 4 characters long
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
