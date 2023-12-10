import React, { useState, useContext } from 'react';
import { AppDataContext } from './context';

const SignInForm = props => {
  const SingInContextData = useContext(AppDataContext);
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('hidden');

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setUserInfo(prevData => ({
      ...prevData,
      [name]: value
    }));
    setErrorMsg('hidden');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = { username: userInfo.username, password: userInfo.password };

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
          setErrorMsg('incorrect-username-msg');
        } else {
          SingInContextData.handleSignIn(result);
          props.handleSwitchingModal();
          setUserInfo({ username: '', password: '' });
        }
      })
      .catch(error => {
        console.error('Error', error.message);
      });
  };

  return (
    <article>
      <section className={errorMsg}>
        <p className="username-exists-msg">Incorrect username or password!</p>
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
        <button className="app-button background-green float-right">
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
