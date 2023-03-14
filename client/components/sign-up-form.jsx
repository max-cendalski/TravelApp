import React, { useState } from 'react';

const SignUpForm = props => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });
  const [userExiststMsg, setUserExistsMsg] = useState('hidden');
  const [incorrectLoginMsg, setIncorrectLoginMsg] = useState('hidden');

  const handleChange = e => {
    function checkLetters(input) {
      const letters = /^[A-Za-z]+$/;
      if (input.match(letters) || input === '') {
        setIncorrectLoginMsg('hidden');
        setUserExistsMsg('hidden');
      } else {
        setIncorrectLoginMsg('incorrect-username-msg');
      }
    }

    if (e.target.name === 'username') {
      checkLetters(e.target.value);
    }
    const name = e.target.name;
    const value = e.target.value;

    setNewUser(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const checkUsername = newUser => {
      const letters = /^[A-Za-z]+$/;
      if (!newUser.username.match(letters)) {
        setIncorrectLoginMsg('incorrect-username-msg');
      } else {
        const user = {
          username: newUser.username,
          password: newUser.password
        };
        fetch('/api/auth/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then(response => response.json())
          .then(result => {
            if (result.error) {
              setUserExistsMsg('incorrect-username-msg');
            } else {
              window.location.hash = '';
              props.handleSwitchingModal();
            }
          })
          .catch(error => {
            console.error('Error', error.message);
          });
      }
    };
    checkUsername(newUser);
  };

  return (
    <article>
      <section className={userExiststMsg}>
        User with that username already exists!
      </section>
      <section className={incorrectLoginMsg}>
        Username can contains only letters
      </section>
      <section className="sign-form">
        <form onSubmit={handleSubmit} name="signUpForm">
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
              minLength="4"
              maxLength="15"
            />
          </p>
          <p className="password-notification">
            Username must me be at least 4 characters long
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
              maxLength="20"
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
      </section>
    </article>
  );
};

export default SignUpForm;
